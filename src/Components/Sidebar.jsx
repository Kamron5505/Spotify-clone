import React, { useState, useContext } from 'react'
import { assets } from '../assets/assets'
import { useNavigate, useLocation } from 'react-router-dom'
import { PlayerContext } from '../context/PlayerContext'
import CreatePlaylistModal from './CreatePlaylistModal'

const Sidebar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { playlists, createPlaylist } = useContext(PlayerContext);
    const [collapsed, setCollapsed] = useState(false);
    const [showCreateModal, setShowCreateModal] = useState(false);

    return (
        <div className='w-[25%] h-full p-2 gap-2 flex-col text-white hidden lg:flex'>
            <div className='bg-[#121212] h-[15%] rounded flex flex-col justify-around'>
                <div
                    onClick={() => navigate('/')}
                    className={`flex items-center gap-3 pl-8 cursor-pointer ${location.pathname === '/' ? 'text-white' : 'text-gray-400 hover:text-white'} transition`}
                >
                    <img className='w-6' src={assets.home_icon} alt="Home" />
                    <p className='font-bold'>Home</p>
                </div>
                <div
                    onClick={() => navigate('/search')}
                    className={`flex items-center gap-3 pl-8 cursor-pointer ${location.pathname === '/search' ? 'text-white' : 'text-gray-400 hover:text-white'} transition`}
                >
                    <img className='w-6' src={assets.search_icon} alt="Search" />
                    <p className='font-bold'>Search</p>
                </div>
            </div>

            <div className='bg-[#121212] h-[85%] rounded overflow-auto'>
                <div className='p-4 flex items-center justify-between'>
                    <div
                        onClick={() => navigate('/library')}
                        className={`flex items-center gap-3 cursor-pointer ${location.pathname === '/library' ? 'text-white' : 'text-gray-400 hover:text-white'} transition`}
                    >
                        <img className='w-8' src={assets.stack_icon} alt="Library" />
                        <p className='font-semibold'>Your Library</p>
                    </div>
                    <div className='flex items-center gap-3'>
                        <img
                            onClick={() => setCollapsed(prev => !prev)}
                            className={`w-5 cursor-pointer transition-transform ${collapsed ? 'rotate-180' : ''}`}
                            src={assets.arrow_icon}
                            alt="Toggle"
                        />
                        <img
                            onClick={() => setShowCreateModal(true)}
                            className='w-5 cursor-pointer hover:scale-110 transition'
                            src={assets.plus_icon}
                            alt="Add Playlist"
                        />
                    </div>
                </div>

                {!collapsed && (
                    <>
                        {playlists.length > 0 && (
                            <div className="px-2 mb-2">
                                {playlists.map(pl => (
                                    <div
                                        key={pl.id}
                                        onClick={() => navigate(`/playlist/${pl.id}`)}
                                        className={`flex items-center gap-3 px-3 py-2 rounded cursor-pointer transition ${
                                            location.pathname === `/playlist/${pl.id}` ? 'bg-[#ffffff1a] text-white' : 'hover:bg-[#ffffff0d] text-gray-300'
                                        }`}
                                    >
                                        <div className="w-10 h-10 bg-gradient-to-br from-purple-700 to-blue-400 rounded flex items-center justify-center text-sm font-bold shrink-0">
                                            {pl.name.charAt(0).toUpperCase()}
                                        </div>
                                        <div className="min-w-0">
                                            <p className="text-sm font-medium truncate">{pl.name}</p>
                                            <p className="text-xs text-gray-400">{pl.songs.length} songs</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {playlists.length === 0 && (
                            <div className='p-4 bg-[#242424] m-2 rounded font-semibold flex flex-col items-start justify-start'>
                                <h1>Create first playlist</h1>
                                <p className='font-light'>It's easy we will help you</p>
                                <button
                                    onClick={() => setShowCreateModal(true)}
                                    className='px-4 py-1.5 bg-white text-[15px] text-black rounded-full mt-4 hover:scale-105 transition'
                                >
                                    Create Playlist
                                </button>
                            </div>
                        )}

                        <div className='p-4 bg-[#242424] m-2 rounded font-semibold flex flex-col items-start justify-start'>
                            <h1>Let's find some podcast to follow</h1>
                            <p className='font-light'>We will keep you updated on new episodes</p>
                            <button
                                onClick={() => navigate('/search')}
                                className='px-4 py-1.5 bg-white text-[15px] text-black rounded-full mt-4 hover:scale-105 transition'
                            >
                                Browse podcasts
                            </button>
                        </div>
                    </>
                )}
            </div>

            {showCreateModal && (
                <CreatePlaylistModal
                    onClose={() => setShowCreateModal(false)}
                    onCreate={(name) => createPlaylist(name)}
                />
            )}
        </div>
    )
}

export default Sidebar
