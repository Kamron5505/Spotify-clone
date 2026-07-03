import React, { useState, useContext, useEffect } from 'react'
import NavBar from './NavBar'
import { albumsData, songsData, assets } from '../assets/assets'
import { PlayerContext } from '../context/PlayerContext'
import { useNavigate } from 'react-router-dom'

const formatMs = (ms) => {
    if (!ms) return '0:00';
    const mins = Math.floor(ms / 60000);
    const secs = Math.floor((ms % 60000) / 1000);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
};

const Search = () => {
    const [query, setQuery] = useState('');
    const [apiResults, setApiResults] = useState([]);
    const [apiLoading, setApiLoading] = useState(false);
    const { playWithId, playTrack } = useContext(PlayerContext);
    const navigate = useNavigate();

    const normalizedQuery = query.toLowerCase().trim();

    const filteredSongs = normalizedQuery
        ? songsData.filter(s =>
            s.name.toLowerCase().includes(normalizedQuery) ||
            s.desc.toLowerCase().includes(normalizedQuery) ||
            (s.artist && s.artist.toLowerCase().includes(normalizedQuery))
        )
        : [];

    const filteredAlbums = normalizedQuery
        ? albumsData.filter(a =>
            a.name.toLowerCase().includes(normalizedQuery) ||
            a.desc.toLowerCase().includes(normalizedQuery)
        )
        : [];

    useEffect(() => {
        if (!normalizedQuery || normalizedQuery.length < 2) {
            setApiResults([]);
            return;
        }
        const timer = setTimeout(() => {
            setApiLoading(true);
            fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(normalizedQuery)}&media=music&limit=20`)
                .then(res => res.json())
                .then(data => {
                    setApiResults(
                        (data.results || [])
                            .filter(r => r.previewUrl)
                            .map(r => ({
                                id: `itunes-${r.trackId}`,
                                name: r.trackName,
                                artist: r.artistName,
                                image: r.artworkUrl100,
                                file: r.previewUrl,
                                desc: r.artistName,
                                duration: formatMs(r.trackTimeMillis),
                                isExternal: true,
                                album: r.collectionName,
                            }))
                    );
                })
                .catch(() => setApiResults([]))
                .finally(() => setApiLoading(false));
        }, 500);
        return () => clearTimeout(timer);
    }, [normalizedQuery]);

    const hasLocalResults = filteredSongs.length > 0 || filteredAlbums.length > 0;
    const hasResults = hasLocalResults || apiResults.length > 0;

    return (
        <>
            <NavBar />

            <div className="mt-4 mb-6">
                <div className="relative">
                    <img
                        className="absolute left-3 top-1/2 -translate-y-1/2 w-5 opacity-60"
                        src={assets.search_icon}
                        alt=""
                    />
                    <input
                        type="text"
                        placeholder="What do you want to listen to?"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        autoFocus
                        className="w-full max-w-[500px] pl-10 pr-4 py-3 rounded-full bg-[#242424] text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-white/20 text-sm"
                    />
                </div>
            </div>

            {normalizedQuery ? (
                <>
                    {filteredAlbums.length > 0 && (
                        <div className="mb-6">
                            <h2 className="text-xl font-bold mb-3">Albums</h2>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                                {filteredAlbums.map(album => (
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
                                        <p className="text-xs text-gray-400 truncate mt-1">{album.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                    {filteredSongs.length > 0 && (
                        <div className="mb-6">
                            <h2 className="text-xl font-bold mb-3">Songs</h2>
                            {filteredSongs.map(song => (
                                <div
                                    key={song.id}
                                    onClick={() => playWithId(song.id)}
                                    className="flex items-center gap-3 p-2 rounded hover:bg-[#ffffff1a] cursor-pointer transition"
                                >
                                    <img className="w-10 h-10 rounded" src={song.image} alt="" />
                                    <div className="flex-1 min-w-0">
                                        <p className="font-medium text-sm truncate">{song.name}</p>
                                        <p className="text-xs text-gray-400 truncate">
                                            {song.artist || song.desc}
                                        </p>
                                    </div>
                                    <span className="text-xs text-gray-400">{song.duration}</span>
                                </div>
                            ))}
                        </div>
                    )}
                    {apiLoading && (
                        <p className="text-gray-400 text-center mt-4">Searching online...</p>
                    )}
                    {apiResults.length > 0 && (
                        <div className="mt-2">
                            <h2 className="text-xl font-bold mb-1">Online Results</h2>
                            <p className="text-xs text-gray-500 mb-3">30-second previews via iTunes</p>
                            {apiResults.map(song => (
                                <div
                                    key={song.id}
                                    onClick={() => playTrack(song)}
                                    className="flex items-center gap-3 p-2 rounded hover:bg-[#ffffff1a] cursor-pointer transition"
                                >
                                    <img className="w-10 h-10 rounded" src={song.image} alt="" />
                                    <div className="flex-1 min-w-0">
                                        <p className="font-medium text-sm truncate">{song.name}</p>
                                        <p className="text-xs text-gray-400 truncate">{song.artist}</p>
                                    </div>
                                    <span className="text-xs text-gray-400">{song.duration}</span>
                                </div>
                            ))}
                        </div>
                    )}
                    {!hasResults && !apiLoading && (
                        <p className="text-gray-400 text-center mt-10">
                            No results found for &quot;{query}&quot;
                        </p>
                    )}
                </>
            ) : (
                <div>
                    <h2 className="text-xl font-bold mb-4">Browse All</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                        {albumsData.map(album => (
                            <div
                                key={album.id}
                                onClick={() => navigate(`/album/${album.id}`)}
                                className="relative h-28 sm:h-32 rounded-lg overflow-hidden cursor-pointer hover:scale-[1.02] transition-transform"
                                style={{ backgroundColor: album.bgColor }}
                            >
                                <p className="p-3 font-bold text-base sm:text-lg">{album.name}</p>
                                <img
                                    className="absolute bottom-0 right-0 w-16 h-16 sm:w-20 sm:h-20 object-cover rotate-[25deg] translate-x-4 translate-y-2 rounded shadow-lg"
                                    src={album.image}
                                    alt=""
                                />
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </>
    )
}

export default Search
