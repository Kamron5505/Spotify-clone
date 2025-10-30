import React, { useState, useContext } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { PlayerContext } from "../context/PlayerContext";
import usePWAInstall from "../hooks/usePWAInstall";

const NavBar = () => {
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const { setIsPremium } = useContext(PlayerContext);
    const { installApp, isInstalled } = usePWAInstall();

    return (
        <>
            <div className="w-full flex justify-between items-center font-semibold">
                <div className="flex items-center gap-2">
                    <img
                        onClick={() => navigate(-1)}
                        className="w-8 bg-black p-2 rounded-2xl cursor-pointer hover:bg-[#1f1f1f] transition"
                        src={assets.arrow_left}
                        alt="Назад"
                    />
                    <img
                        onClick={() => navigate(1)}
                        className="w-8 bg-black p-2 rounded-2xl cursor-pointer hover:bg-[#1f1f1f] transition"
                        src={assets.arrow_right}
                        alt="Вперёд"
                    />
                </div>

                <div className="flex items-center gap-4">
                    {!isInstalled && (
                        <p
                            onClick={installApp}
                            className="bg-black border border-gray-600 py-1 px-3 rounded-2xl text-[15px] cursor-pointer hover:bg-[#1f1f1f] transition"
                        >
                            Install App
                        </p>
                    )}

                    <p className="bg-purple-500 text-black w-7 h-7 rounded-full flex items-center justify-center font-bold">
                        G
                    </p>
                </div>
            </div>
        </>
    );
};

export default NavBar;
