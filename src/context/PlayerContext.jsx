import React, { createContext, useRef, useState, useEffect, useCallback } from "react";
import { songsData as baseSongsData } from "../assets/assets";

export const PlayerContext = createContext();

const PlayerContextProvider = (props) => {
    const audioRef = useRef();
    const seekBg = useRef();
    const seekBar = useRef();

    const [songsData, setSongsData] = useState(baseSongsData);
    const [isPremium, setIsPremium] = useState(false);

    const premiumSongs = [
        {
            id: 100,
            name: "Blinding Lights (Premium)",
            image: baseSongsData[0].image,
            file: baseSongsData[0].file,
            desc: "Experience the magic of Premium sound",
            duration: "3:20",
        },
        {
            id: 101,
            name: "Save Your Tears",
            image: baseSongsData[1].image,
            file: baseSongsData[1].file,
            desc: "Premium exclusive: feel the vibe",
            duration: "3:40",
        },
        {
            id: 102,
            name: "Peaches",
            image: baseSongsData[2].image,
            file: baseSongsData[2].file,
            desc: "Enjoy more hits with Premium",
            duration: "3:10",
        },
    ];

    useEffect(() => {
        if (isPremium) {
            setSongsData((prev) => {
                const alreadyAdded = prev.some((s) => s.id === 100);
                return alreadyAdded ? prev : [...prev, ...premiumSongs];
            });
        }
    }, [isPremium]);

    const [track, setTrack] = useState(songsData[0]);
    const [playStatus, setPlayStatus] = useState(false);
    const [volume, setVolume] = useState(1);
    const [shuffle, setShuffle] = useState(false);
    const [repeat, setRepeat] = useState('off');
    const [queue, setQueue] = useState([]);
    const [queueIndex, setQueueIndex] = useState(-1);
    const [likedSongs, setLikedSongs] = useState(() => {
        try { return JSON.parse(localStorage.getItem('likedSongs')) || []; } catch { return []; }
    });
    const [playlists, setPlaylists] = useState(() => {
        try { return JSON.parse(localStorage.getItem('playlists')) || []; } catch { return []; }
    });
    const [time, setTime] = useState({
        currentTime: { minute: 0, second: 0 },
        totalTime: { minute: 0, second: 0 },
    });

    const play = useCallback(() => {
        if (!audioRef.current) return;
        audioRef.current.play().catch(() => {
            setPlayStatus(false);
        });
        setPlayStatus(true);
    }, []);

    const pause = useCallback(() => {
        if (audioRef.current) {
            audioRef.current.pause();
            setPlayStatus(false);
        }
    }, []);

    const next = useCallback(() => {
        if (repeat === 'one') {
            if (audioRef.current) {
                audioRef.current.currentTime = 0;
                audioRef.current.play().catch(() => {});
            }
            return;
        }

        const activeList = queue.length > 0 ? queue : songsData;
        const currentIdx = queue.length > 0 ? queueIndex : activeList.findIndex(s => s.id === track.id);
        let nextIdx;

        if (shuffle) {
            let rand;
            do {
                rand = Math.floor(Math.random() * activeList.length);
            } while (rand === currentIdx && activeList.length > 1);
            nextIdx = rand;
        } else {
            nextIdx = (currentIdx + 1) % activeList.length;
        }

        if (!shuffle && repeat === 'off' && nextIdx === 0 && currentIdx === activeList.length - 1) {
            setPlayStatus(false);
            return;
        }

        const song = activeList[nextIdx];
        if (!audioRef.current || !song) return;
        audioRef.current.pause();
        audioRef.current.src = song.file;
        audioRef.current.play().catch(() => { setPlayStatus(false); });
        setTrack(song);
        if (queue.length > 0) setQueueIndex(nextIdx);
        setPlayStatus(true);
    }, [track, songsData, queue, queueIndex, shuffle, repeat]);

    const previous = useCallback(() => {
        if (audioRef.current && audioRef.current.currentTime > 3) {
            audioRef.current.currentTime = 0;
            return;
        }

        const activeList = queue.length > 0 ? queue : songsData;
        const currentIdx = queue.length > 0 ? queueIndex : activeList.findIndex(s => s.id === track.id);
        const prevIdx = (currentIdx - 1 + activeList.length) % activeList.length;
        const song = activeList[prevIdx];
        if (!audioRef.current || !song) return;
        audioRef.current.pause();
        audioRef.current.src = song.file;
        audioRef.current.play().catch(() => { setPlayStatus(false); });
        setTrack(song);
        if (queue.length > 0) setQueueIndex(prevIdx);
        setPlayStatus(true);
    }, [track, songsData, queue, queueIndex]);

    const seekSong = useCallback((e) => {
        if (!audioRef.current || !seekBg.current) return;
        const width = seekBg.current.offsetWidth;
        const clickX = e.nativeEvent.offsetX;
        const duration = audioRef.current.duration;
        if (!duration) return;
        audioRef.current.currentTime = (clickX / width) * duration;
        if (seekBar.current) {
            seekBar.current.style.width = `${(clickX / width) * 100}%`;
        }
    }, []);

    const playWithId = useCallback((id) => {
        const song = songsData.find((s) => s.id === id);
        if (!song || !audioRef.current) return;
        audioRef.current.pause();
        audioRef.current.src = song.file;
        audioRef.current.play().catch(() => { setPlayStatus(false); });
        setTrack(song);
        setPlayStatus(true);
    }, [songsData]);

    const changeVolume = useCallback((newVolume) => {
        const clamped = Math.max(0, Math.min(1, newVolume));
        setVolume(clamped);
        if (audioRef.current) {
            audioRef.current.volume = clamped;
        }
    }, []);

    const playTrack = useCallback((trackObj) => {
        if (!audioRef.current) return;
        audioRef.current.pause();
        audioRef.current.src = trackObj.file;
        audioRef.current.play().catch(() => { setPlayStatus(false); });
        setTrack(trackObj);
        setPlayStatus(true);
    }, []);

    const setQueueAndPlay = useCallback((songs, startIndex) => {
        setQueue(songs);
        setQueueIndex(startIndex);
        const song = songs[startIndex];
        if (!song || !audioRef.current) return;
        audioRef.current.pause();
        audioRef.current.src = song.file;
        audioRef.current.play().catch(() => { setPlayStatus(false); });
        setTrack(song);
        setPlayStatus(true);
    }, []);

    const addToQueue = useCallback((trackObj) => {
        setQueue(prev => [...prev, trackObj]);
    }, []);

    const playFromQueue = useCallback((index) => {
        if (index < 0 || index >= queue.length) return;
        setQueueIndex(index);
        const song = queue[index];
        if (!audioRef.current) return;
        audioRef.current.pause();
        audioRef.current.src = song.file;
        audioRef.current.play().catch(() => { setPlayStatus(false); });
        setTrack(song);
        setPlayStatus(true);
    }, [queue]);

    const toggleLike = useCallback((songId) => {
        setLikedSongs(prev => {
            const next = prev.includes(songId) ? prev.filter(id => id !== songId) : [...prev, songId];
            localStorage.setItem('likedSongs', JSON.stringify(next));
            return next;
        });
    }, []);

    const createPlaylist = useCallback((name) => {
        const newPlaylist = { id: Date.now().toString(), name, songs: [] };
        setPlaylists(prev => {
            const next = [...prev, newPlaylist];
            localStorage.setItem('playlists', JSON.stringify(next));
            return next;
        });
        return newPlaylist;
    }, []);

    const addToPlaylist = useCallback((playlistId, songId) => {
        setPlaylists(prev => {
            const next = prev.map(p =>
                p.id === playlistId && !p.songs.includes(songId)
                    ? { ...p, songs: [...p.songs, songId] }
                    : p
            );
            localStorage.setItem('playlists', JSON.stringify(next));
            return next;
        });
    }, []);

    const removeFromPlaylist = useCallback((playlistId, songId) => {
        setPlaylists(prev => {
            const next = prev.map(p =>
                p.id === playlistId ? { ...p, songs: p.songs.filter(id => id !== songId) } : p
            );
            localStorage.setItem('playlists', JSON.stringify(next));
            return next;
        });
    }, []);

    const deletePlaylist = useCallback((playlistId) => {
        setPlaylists(prev => {
            const next = prev.filter(p => p.id !== playlistId);
            localStorage.setItem('playlists', JSON.stringify(next));
            return next;
        });
    }, []);

    const toggleShuffle = useCallback(() => setShuffle(prev => !prev), []);

    const toggleRepeat = useCallback(() => {
        setRepeat(prev => {
            if (prev === 'off') return 'all';
            if (prev === 'all') return 'one';
            return 'off';
        });
    }, []);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;
        const updateTime = () => {
            const cur = audio.currentTime;
            const dur = audio.duration || 0;
            setTime({
                currentTime: {
                    minute: Math.floor(cur / 60),
                    second: Math.floor(cur % 60),
                },
                totalTime: {
                    minute: Math.floor(dur / 60),
                    second: Math.floor(dur % 60),
                },
            });
            if (seekBar.current && seekBg.current && dur > 0) {
                seekBar.current.style.width = `${(cur / dur) * 100}%`;
            }
        };
        const handleEnded = () => { next(); };

        audio.addEventListener("timeupdate", updateTime);
        audio.addEventListener("ended", handleEnded);
        return () => {
            audio.removeEventListener("timeupdate", updateTime);
            audio.removeEventListener("ended", handleEnded);
        };
    }, [track, next]);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

            switch (e.code) {
                case 'Space':
                    e.preventDefault();
                    if (playStatus) { pause(); } else { play(); }
                    break;
                case 'ArrowRight':
                    if (e.shiftKey) {
                        e.preventDefault();
                        next();
                    }
                    break;
                case 'ArrowLeft':
                    if (e.shiftKey) {
                        e.preventDefault();
                        previous();
                    }
                    break;
                case 'ArrowUp':
                    e.preventDefault();
                    changeVolume(volume + 0.1);
                    break;
                case 'ArrowDown':
                    e.preventDefault();
                    changeVolume(volume - 0.1);
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [playStatus, volume, play, pause, next, previous, changeVolume]);

    const contextValue = {
        audioRef,
        seekBg,
        seekBar,
        track,
        setTrack,
        playStatus,
        setPlayStatus,
        time,
        setTime,
        play,
        pause,
        seekSong,
        playWithId,
        next,
        previous,
        isPremium,
        setIsPremium,
        songsData,
        volume,
        changeVolume,
        shuffle,
        toggleShuffle,
        repeat,
        toggleRepeat,
        playTrack,
        queue,
        queueIndex,
        setQueueAndPlay,
        addToQueue,
        playFromQueue,
        likedSongs,
        toggleLike,
        playlists,
        createPlaylist,
        addToPlaylist,
        removeFromPlaylist,
        deletePlaylist,
    };

    return (
        <PlayerContext.Provider value={contextValue}>
            {props.children}
            <audio ref={audioRef} src={track.file} preload="auto"></audio>
        </PlayerContext.Provider>
    );
};

export default PlayerContextProvider;
