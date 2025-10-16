import React, { useContext } from 'react'
import NavBar from './NavBar'
import { useParams } from 'react-router-dom'
import { albumsData, assets, songsData } from '../assets/assets'
import { PlayerContext } from '../context/PlayerContext'

const DisplayAlbum = () => {
    const { id } = useParams()
    const albumData = albumsData[id]
    const { playWithId } = useContext(PlayerContext)

    return (
        <>
            <NavBar />

            <div className='mt-10 flex gap-8 flex-col md:flex-row md:items-end'>
                <img src={albumData.image} alt={albumData.name} className='w-48 rounded' />
                <div>
                    <h2 className='text-5xl font-bold mb-4 md:text-7xl'>{albumData.name}</h2>
                    <h4>{albumData.desc}</h4>

                    <p className='mt-1 flex items-center gap-2'>
                        <img className='inline-block w-5' src={assets.spotify_logo} alt='Spotify logo' />
                        <b>Spotify</b>
                        <span className='inline-block w-1.5 h-1.5 bg-white rounded-full'></span>
                        <span>1,323,154 likes</span>
                        <span className='inline-block w-1.5 h-1.5 bg-white rounded-full'></span>
                        <b>50 songs</b>
                        <span>about 2 hr 30 mins</span>
                    </p>
                </div>
            </div>

            <div className='grid grid-cols-3 sm:grid-cols-4 mt-10 mb-4 pl-2 text-[#a7a7a7]'>
                <p><b className='mr-4'>#</b>Title</p>
                <p>Album</p>
                <p className='hidden sm:block'>Date Added</p>
                <img className='m-auto w-4' src={assets.clock_icon} alt='' />
            </div>

            <hr />

            {songsData.map((item, index) => (
                <div
                    onClick={() => playWithId(item.id)}
                    key={index}
                    className='grid grid-cols-3 sm:grid-cols-4 gap-2 p-2 items-center text-[#a7a7a7] hover:bg-[#ffffff2b]'
                >
                    <p className='text-white flex items-center gap-3'>
                        <b className='mr-2 text-[#a7a7a7]'>{index + 1}</b>
                        <img className='w-10 rounded' src={item.image} alt={item.name} />
                        {item.name}
                    </p>
                    <p className='text-[15px]'>{albumData.name}</p>
                    <p className='text-[15px] hidden sm:block'>5 days ago</p>
                    <p className='text-[15px] text-center'>{item.duration}</p>
                </div>
            ))}
        </>
    )
}

export default DisplayAlbum
