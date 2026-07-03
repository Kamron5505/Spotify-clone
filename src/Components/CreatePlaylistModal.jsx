import React, { useState } from 'react';

const CreatePlaylistModal = ({ onClose, onCreate }) => {
    const [name, setName] = useState('');

    const handleCreate = () => {
        const trimmed = name.trim();
        if (!trimmed) return;
        onCreate(trimmed);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50" onClick={onClose}>
            <div className="bg-[#282828] rounded-lg p-6 w-[90%] max-w-[400px] shadow-2xl animate-fade-in" onClick={e => e.stopPropagation()}>
                <h2 className="text-lg font-bold text-white mb-4">Create Playlist</h2>
                <input
                    type="text"
                    placeholder="Playlist name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleCreate()}
                    autoFocus
                    className="w-full px-4 py-2.5 rounded bg-[#3e3e3e] text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-green-500 text-sm mb-4"
                />
                <div className="flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-sm text-gray-300 hover:text-white transition"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleCreate}
                        className="px-5 py-2 text-sm bg-green-500 text-black font-semibold rounded-full hover:bg-green-400 transition"
                    >
                        Create
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreatePlaylistModal;
