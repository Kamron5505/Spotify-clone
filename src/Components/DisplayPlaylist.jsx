import React, { useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import NavBar from './NavBar';
import { PlayerContext } from '../context/PlayerContext';
import { assets, songsData as allSongs } from '../assets/assets';

const DisplayPlaylist = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { playlists, playWithId, deletePlaylist, removeFromPlaylist, setQueueAndPlay, track } = useContext(PlayerContext);

    const playlist = playlists.find(p => p.id === id);

    if (!playlist) {
        return (
            <>
                <NavBar />
                <div className="mt-10 text-center">
                    <p className="text-gray-400 text-lg">Playlist not found</p>
                    <button onClick={() => navigate('/library')} className="mt-4 text-green-400 hover:underline text-sm">
                        Go to Library
                    </button>
                </div>
            </>
        );
    }

    const songs = playlist.songs
        .map(songId => allSongs.find(s => s.id === songId))
        .filter(Boolean);

    const handlePlayAll = () => {
        if (songs.length > 0) {
            setQueueAndPlay(songs, 0);
        }
    };

    return (
        <>
            <NavBar />
            <div className="mt-4 flex flex-col sm:flex-row gap-6 mb-6">
                <div className="w-36 h-36 bg-gradient-to-br from-purple-700 to-blue-400 rounded-lg flex items-center justify-center text-5xl font-bold shrink-0 shadow-lg">
                    {playlist.name.charAt(0).toUpperCase()}
                </div>
                <div className="flex flex-col justify-end">
                    <p className="text-xs uppercase tracking-wider text-gray-400">Playlist</p>
                    <h1 className="text-3xl sm:text-5xl font-bold mt-1">{playlist.name}</h1>
                    <p className="text-gray-400 text-sm mt-2">{songs.length} songs</p>
                    <div className="flex gap-3 mt-3">
                        {songs.length > 0 && (
                            <button
                                onClick={handlePlayAll}
                                className="px-5 py-2 bg-green-500 text-black font-semibold rounded-full text-sm hover:bg-green-400 transition"
                            >
                                Play All
                            </button>
                        )}
                        <button
                            onClick={() => { deletePlaylist(playlist.id); navigate('/library'); }}
                            className="px-5 py-2 border border-gray-500 text-gray-300 rounded-full text-sm hover:border-white hover:text-white transition"
                        >
                            Delete Playlist
                        </button>
                    </div>
                </div>
            </div>

            {songs.length > 0 ? (
                <div>
                    <div className="grid grid-cols-[16px_1fr_80px] sm:grid-cols-[16px_1fr_1fr_80px] gap-2 px-2 py-2 text-gray-400 text-sm border-b border-gray-800 mb-2">
                        <span>#</span>
                        <span>Title</span>
                        <span className="hidden sm:block">Artist</span>
                        <span className="text-right">
                            <img className="w-4 inline" src={assets.clock_icon} alt="" />
                        </span>
                    </div>
                    {songs.map((song, i) => (
                        <div
                            key={song.id}
                            className={`grid grid-cols-[16px_1fr_80px] sm:grid-cols-[16px_1fr_1fr_80px] gap-2 px-2 py-2 rounded cursor-pointer group transition ${
                                track.id === song.id ? 'bg-[#ffffff1a] text-green-400' : 'hover:bg-[#ffffff0d]'
                            }`}
                        >
                            <span
                                onClick={() => { setQueueAndPlay(songs, i); }}
                                className="text-gray-400 text-sm flex items-center"
                            >
                                {i + 1}
                            </span>
                            <div
                                onClick={() => { setQueueAndPlay(songs, i); }}
                                className="flex items-center gap-3 min-w-0"
                            >
                                <img className="w-9 h-9 rounded" src={song.image} alt="" />
                                <p className={`text-sm truncate ${track.id === song.id ? 'text-green-400' : ''}`}>{song.name}</p>
                            </div>
                            <span
                                onClick={() => { setQueueAndPlay(songs, i); }}
                                className="hidden sm:flex items-center text-gray-400 text-sm truncate"
                            >
                                {song.artist || song.desc}
                            </span>
                            <div className="flex items-center justify-end gap-2">
                                <span className="text-gray-400 text-sm">{song.duration}</span>
                                <button
                                    onClick={(e) => { e.stopPropagation(); removeFromPlaylist(playlist.id, song.id); }}
                                    className="text-gray-500 hover:text-red-400 text-xs opacity-0 group-hover:opacity-100 transition"
                                    title="Remove"
                                >
                                    &times;
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center mt-10">
                    <p className="text-gray-400">This playlist is empty</p>
                    <button onClick={() => navigate('/search')} className="mt-3 text-green-400 hover:underline text-sm">
                        Find songs to add
                    </button>
                </div>
            )}
        </>
    );
};

export default DisplayPlaylist;
