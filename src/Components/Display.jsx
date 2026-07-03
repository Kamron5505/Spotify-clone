import React, { useEffect, useRef } from 'react'
import { Routes, Route, useLocation, matchPath } from 'react-router-dom'
import DisplayHome from './DisplayHome'
import Search from './Search'
import Library from './Library'
import DisplayAlbum from './DisplayAlbum'
import DisplayPlaylist from './DisplayPlaylist'
import { albumsData } from '../assets/assets'

const Display = () => {

    const displayRef = useRef();
    const location = useLocation();

    const albumMatch = matchPath('/album/:id', location.pathname);
    const albumId = albumMatch?.params?.id;
    const isAlbum = albumId != null;
    const bgcolor = isAlbum ? albumsData[Number(albumId)]?.bgColor : null;

    useEffect(() => {
        if (!displayRef.current) return;
        if (isAlbum && bgcolor) {
            displayRef.current.style.background = `linear-gradient(${bgcolor}, #121212)`
        } else {
            displayRef.current.style.background = `#121212`
        }
    }, [isAlbum, bgcolor])

    return (
        <div ref={displayRef} className='w-[100%] m-2 px-6 pt-4 rounded bg-[#121212] text-white overflow-auto lg:w-[75%] lg:ml-0'>
            <Routes>
                <Route path="/" element={<DisplayHome />} />
                <Route path="/album/:id" element={<DisplayAlbum />} />
                <Route path="/search" element={<Search />} />
                <Route path="/library" element={<Library />} />
                <Route path="/playlist/:id" element={<DisplayPlaylist />} />
            </Routes>
        </div>
    )
}

export default Display
