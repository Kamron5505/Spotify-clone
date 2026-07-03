import React, { useContext } from "react";
import { PlayerContext } from "../context/PlayerContext";
import { useToast } from "../context/ToastContext";

const PremiumModal = ({ isOpen, onClose }) => {
    const { setIsPremium, isPremium } = useContext(PlayerContext);
    const { showToast } = useToast();

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50" onClick={onClose}>
            <div className="bg-[#121212] text-white p-6 rounded-2xl w-[90%] max-w-md shadow-lg relative animate-fade-in" onClick={e => e.stopPropagation()}>
                <h2 className="text-2xl font-bold mb-4">Explore Premium</h2>
                <p className="text-gray-300 mb-6">
                    Наслаждайтесь музыкой без рекламы, скачивайте треки офлайн и слушайте в
                    высоком качестве. Попробуйте Spotify Premium прямо сейчас!
                </p>
                <div className="flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition"
                    >
                        Закрыть
                    </button>
                    <button
                        onClick={() => {
                            setIsPremium(true);
                            showToast('Premium activated! 3 bonus tracks added.');
                            onClose();
                        }}
                        disabled={isPremium}
                        className={`px-4 py-2 rounded-lg transition ${isPremium ? 'bg-gray-600 cursor-default' : 'bg-green-500 hover:bg-green-400'}`}
                    >
                        {isPremium ? 'Premium Active' : 'Купить Premium'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PremiumModal;
