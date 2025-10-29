import React, { createContext, useRef, useState, useEffect } from "react";
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
            name: "Blinding Lights",
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
    const [time, setTime] = useState({
        currentTime: { minute: 0, second: 0 },
        totalTime: { minute: 0, second: 0 },
    });

    const play = () => {
        try {
            audioRef.current.play();
            setPlayStatus(true);
        } catch (err) { }
    };

    const next = () => {
        const currentIndex = songsData.findIndex(s => s.id === track.id);
        const nextIndex = (currentIndex + 1) % songsData.length;
        const song = songsData[nextIndex];
        if (!audioRef.current) return;
        audioRef.current.pause();
        audioRef.current.src = song.file;
        audioRef.current.play();
        setTrack(song);
        setPlayStatus(true);
    };

    const previous = () => {
        const currentIndex = songsData.findIndex(s => s.id === track.id);
        const prevIndex = (currentIndex - 1 + songsData.length) % songsData.length;
        const song = songsData[prevIndex];
        if (!audioRef.current) return;
        audioRef.current.pause();
        audioRef.current.src = song.file;
        audioRef.current.play();
        setTrack(song);
        setPlayStatus(true);
    };

    const pause = () => {
        if (audioRef.current) {
            audioRef.current.pause();
            setPlayStatus(false);
        }
    };

    const seekSong = (e) => {
        if (!audioRef.current || !seekBg.current) return;
        const width = seekBg.current.offsetWidth;
        const clickX = e.nativeEvent.offsetX;
        const duration = audioRef.current.duration;
        if (!duration) return;
        audioRef.current.currentTime = (clickX / width) * duration;
        if (seekBar.current) {
            seekBar.current.style.width = `${(clickX / width) * 100}%`;
        }
    };

    const playWithId = (id) => {
        const song = songsData.find((s) => s.id === id);
        if (!song) return;
        if (audioRef.current) audioRef.current.pause();
        audioRef.current = new Audio(song.file);
        try {
            audioRef.current.play();
            setTrack(song);
            setPlayStatus(true);
        } catch (err) { }
    };

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
        audio.addEventListener("timeupdate", updateTime);
        return () => audio.removeEventListener("timeupdate", updateTime);
    }, [track]);

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
    };

    return (
        <PlayerContext.Provider value={contextValue}>
            {props.children}
            <audio ref={audioRef} src={track.file}></audio>
        </PlayerContext.Provider>
    );
};

export default PlayerContextProvider;
