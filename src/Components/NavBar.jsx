import React, { useState, useContext, useEffect, useRef } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { PlayerContext } from "../context/PlayerContext";
import { useToast } from "../context/ToastContext";
import usePWAInstall from "../hooks/usePWAInstall";
import PremiumModal from "./PremiumModal";

const NavBar = () => {
    const navigate = useNavigate();
    const { isPremium } = useContext(PlayerContext);
    const { showToast } = useToast();
    const { installApp, isInstalled } = usePWAInstall();
    const [showDropdown, setShowDropdown] = useState(false);
    const [showPremiumModal, setShowPremiumModal] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        if (!showDropdown) return;
        const handleClick = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setShowDropdown(false);
            }
        };
        document.addEventListener('mousedown', handleClick);
        return () => document.removeEventListener('mousedown', handleClick);
    }, [showDropdown]);

    return (
        <>
            <div className="w-full flex justify-between items-center font-semibold">
                <div className="flex items-center gap-2">
                    <img
                        onClick={() => navigate(-1)}
                        className="w-8 bg-black p-2 rounded-2xl cursor-pointer hover:bg-[#1f1f1f] transition"
                        src={assets.arrow_left}
                        alt="Back"
                    />
                    <img
                        onClick={() => navigate(1)}
                        className="w-8 bg-black p-2 rounded-2xl cursor-pointer hover:bg-[#1f1f1f] transition"
                        src={assets.arrow_right}
                        alt="Forward"
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

                    <div className="relative" ref={dropdownRef}>
                        <p
                            onClick={() => setShowDropdown(prev => !prev)}
                            className="bg-purple-500 text-black w-7 h-7 rounded-full flex items-center justify-center font-bold cursor-pointer hover:scale-110 transition"
                        >
                            G
                        </p>
                        {showDropdown && (
                            <div className="absolute right-0 top-10 bg-[#282828] rounded-lg shadow-xl py-1 w-48 z-50 animate-fade-in">
                                <button
                                    onClick={() => { showToast('Profile — coming soon!'); setShowDropdown(false); }}
                                    className="w-full text-left px-4 py-2.5 text-sm hover:bg-[#3e3e3e] transition"
                                >
                                    Profile
                                </button>
                                <button
                                    onClick={() => { showToast('Settings — coming soon!'); setShowDropdown(false); }}
                                    className="w-full text-left px-4 py-2.5 text-sm hover:bg-[#3e3e3e] transition"
                                >
                                    Settings
                                </button>
                                <button
                                    onClick={() => { setShowPremiumModal(true); setShowDropdown(false); }}
                                    className="w-full text-left px-4 py-2.5 text-sm hover:bg-[#3e3e3e] transition"
                                >
                                    {isPremium ? 'Premium Active' : 'Get Premium'}
                                </button>
                                <hr className="border-gray-600 my-1" />
                                <button
                                    onClick={() => { showToast('Logged out (placeholder)'); setShowDropdown(false); }}
                                    className="w-full text-left px-4 py-2.5 text-sm hover:bg-[#3e3e3e] transition"
                                >
                                    Log out
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <PremiumModal
                isOpen={showPremiumModal}
                onClose={() => setShowPremiumModal(false)}
            />
        </>
    );
};

export default NavBar;
