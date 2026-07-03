import React, { useContext } from 'react'
import NavBar from './NavBar'
import { useParams } from 'react-router-dom'
import { albumsData, assets, songsData } from '../assets/assets'
import { PlayerContext } from '../context/PlayerContext'

const albumSongMap = {
    0: [1, 2, 3],
    1: [4, 5, 6],
    2: [7, 8, 9],
    3: [10, 11],
    4: [12, 13],
    5: [14],
};

const DisplayAlbum = () => {
    const { id } = useParams()
    const albumData = albumsData[id]
    const { setQueueAndPlay, track } = useContext(PlayerContext)

    const albumSongs = songsData.filter(s => albumSongMap[id]?.includes(s.id));

    if (!albumData) return null;

    return (
        <>
            <NavBar />

            <div className='mt-10 flex gap-8 flex-col md:flex-row md:items-end'>
                <img src={albumData.image} alt={albumData.name} className='w-48 rounded' />
                <div>
                    <h2 className='text-5xl font-bold mb-4 md:text-7xl'>{albumData.name}</h2>
                    <h4>{albumData.desc}</h4>

                    <p className='mt-1 flex items-center gap-2 flex-wrap'>
                        <img className='inline-block w-5' src={assets.spotify_logo} alt='Spotify logo' />
                        <b>Spotify</b>
                        <span className='inline-block w-1.5 h-1.5 bg-white rounded-full'></span>
                        <b>{albumSongs.length} songs</b>
                    </p>
                </div>
            </div>

            <div className='grid grid-cols-3 sm:grid-cols-4 mt-10 mb-4 pl-2 text-[#a7a7a7]'>
                <p><b className='mr-4'>#</b>Title</p>
                <p>Album</p>
                <p className='hidden sm:block'>Artist</p>
                <img className='m-auto w-4' src={assets.clock_icon} alt='' />
            </div>

            <hr />

            {albumSongs.map((item, index) => (
                <div
                    onClick={() => setQueueAndPlay(albumSongs, index)}
                    key={item.id}
                    className={`grid grid-cols-3 sm:grid-cols-4 gap-2 p-2 items-center cursor-pointer rounded transition ${
                        track.id === item.id ? 'bg-[#ffffff1a] text-green-400' : 'text-[#a7a7a7] hover:bg-[#ffffff2b]'
                    }`}
                >
                    <p className={`flex items-center gap-3 ${track.id === item.id ? 'text-green-400' : 'text-white'}`}>
                        <b className={`mr-2 ${track.id === item.id ? 'text-green-400' : 'text-[#a7a7a7]'}`}>{index + 1}</b>
                        <img className='w-10 rounded' src={item.image} alt={item.name} />
                        {item.name}
                    </p>
                    <p className='text-[15px]'>{albumData.name}</p>
                    <p className='text-[15px] hidden sm:block'>{item.artist || 'Unknown'}</p>
                    <p className='text-[15px] text-center'>{item.duration}</p>
                </div>
            ))}
        </>
    )
}

export default DisplayAlbum
