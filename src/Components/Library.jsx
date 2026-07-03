import React, { useContext } from 'react'
import NavBar from './NavBar'
import { songsData, albumsData } from '../assets/assets'
import { PlayerContext } from '../context/PlayerContext'
import { useNavigate } from 'react-router-dom'

const Library = () => {
    const { playWithId, track, playlists, likedSongs } = useContext(PlayerContext);
    const navigate = useNavigate();

    const likedSongsList = songsData.filter(s => likedSongs.includes(s.id));

    return (
        <>
            <NavBar />

            {playlists.length > 0 && (
                <div className="mb-6 mt-4">
                    <h2 className="text-xl font-bold mb-3">Your Playlists</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                        {playlists.map(pl => (
                            <div
                                key={pl.id}
                                onClick={() => navigate(`/playlist/${pl.id}`)}
                                className="bg-[#181818] p-3 rounded-lg cursor-pointer hover:bg-[#282828] transition group"
                            >
                                <div className="w-full aspect-square bg-gradient-to-br from-purple-700 to-blue-400 rounded mb-2 flex items-center justify-center text-4xl font-bold">
                                    {pl.name.charAt(0).toUpperCase()}
                                </div>
                                <p className="font-semibold text-sm truncate">{pl.name}</p>
                                <p className="text-xs text-gray-400 truncate mt-1">{pl.songs.length} songs</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <div className="mb-6 mt-4">
                <h2 className="text-xl font-bold mb-3">Albums</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                    {albumsData.map(album => (
                        <div
                            key={album.id}
                            onClick={() => navigate(`/album/${album.id}`)}
                            className="bg-[#181818] p-3 rounded-lg cursor-pointer hover:bg-[#282828] transition group"
                        >
                            <img
                                className="w-full aspect-square object-cover rounded mb-2"
                                src={album.image}
                                alt={album.name}
                            />
                            <p className="font-semibold text-sm truncate">{album.name}</p>
                            <p className="text-xs text-gray-400 truncate mt-1">Playlist</p>
                        </div>
                    ))}
                </div>
            </div>

            {likedSongsList.length > 0 && (
                <div className="mb-6">
                    <h2 className="text-xl font-bold mb-3">Liked Songs</h2>
                    {likedSongsList.map(song => (
                        <div
                            key={song.id}
                            onClick={() => playWithId(song.id)}
                            className={`flex items-center gap-3 p-2 rounded cursor-pointer transition ${
                                track.id === song.id
                                    ? 'bg-[#ffffff1a] text-green-400'
                                    : 'hover:bg-[#ffffff1a]'
                            }`}
                        >
                            <img className="w-10 h-10 rounded" src={song.image} alt="" />
                            <div className="flex-1 min-w-0">
                                <p className={`font-medium text-sm truncate ${track.id === song.id ? 'text-green-400' : ''}`}>
                                    {song.name}
                                </p>
                                <p className="text-xs text-gray-400 truncate">
                                    {song.artist || song.desc}
                                </p>
                            </div>
                            <span className="text-xs text-gray-400">{song.duration}</span>
                        </div>
                    ))}
                </div>
            )}

            <div>
                <h2 className="text-xl font-bold mb-3">All Songs</h2>
                {songsData.map(song => (
                    <div
                        key={song.id}
                        onClick={() => playWithId(song.id)}
                        className={`flex items-center gap-3 p-2 rounded cursor-pointer transition ${
                            track.id === song.id
                                ? 'bg-[#ffffff1a] text-green-400'
                                : 'hover:bg-[#ffffff1a]'
                        }`}
                    >
                        <img className="w-10 h-10 rounded" src={song.image} alt="" />
                        <div className="flex-1 min-w-0">
                            <p className={`font-medium text-sm truncate ${track.id === song.id ? 'text-green-400' : ''}`}>
                                {song.name}
                            </p>
                            <p className="text-xs text-gray-400 truncate">
                                {song.artist || song.desc}
                            </p>
                        </div>
                        <span className="text-xs text-gray-400">{song.duration}</span>
                    </div>
                ))}
            </div>
        </>
    )
}

export default Library