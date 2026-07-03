import React, { useContext } from 'react';
import { PlayerContext } from '../context/PlayerContext';

const QueuePanel = ({ onClose }) => {
    const { queue, queueIndex, track, playFromQueue, songsData } = useContext(PlayerContext);

    const activeList = queue.length > 0 ? queue : songsData;
    const currentIdx = queue.length > 0
        ? queueIndex
        : activeList.findIndex(s => s.id === track.id);

    const upcoming = activeList.slice(currentIdx + 1);

    return (
        <div className="fixed bottom-[10%] right-2 w-[340px] max-h-[60vh] bg-[#1a1a1a] border border-gray-800 rounded-lg z-40 overflow-hidden flex flex-col shadow-2xl animate-fade-in">
            <div className="flex items-center justify-between p-4 border-b border-gray-800">
                <h3 className="font-bold text-base">Queue</h3>
                <button onClick={onClose} className="text-gray-400 hover:text-white text-lg transition">&times;</button>
            </div>

            <div className="overflow-auto flex-1 p-3">
                <p className="text-xs text-gray-400 uppercase tracking-wide mb-2">Now Playing</p>
                <div className="flex items-center gap-3 p-2 rounded bg-[#ffffff0d] mb-4">
                    <img className="w-10 h-10 rounded" src={track.image} alt="" />
                    <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate text-green-400">{track.name}</p>
                        <p className="text-xs text-gray-400 truncate">{track.artist || track.desc}</p>
                    </div>
                </div>

                {upcoming.length > 0 && (
                    <>
                        <p className="text-xs text-gray-400 uppercase tracking-wide mb-2">Next Up</p>
                        {upcoming.map((song, i) => (
                            <div
                                key={song.id + '-' + i}
                                onClick={() => playFromQueue(currentIdx + 1 + i)}
                                className="flex items-center gap-3 p-2 rounded hover:bg-[#ffffff1a] cursor-pointer transition"
                            >
                                <span className="text-xs text-gray-500 w-5 text-right">{i + 1}</span>
                                <img className="w-9 h-9 rounded" src={song.image} alt="" />
                                <div className="flex-1 min-w-0">
                                    <p className="font-medium text-sm truncate">{song.name}</p>
                                    <p className="text-xs text-gray-400 truncate">{song.artist || song.desc}</p>
                                </div>
                                <span className="text-xs text-gray-500">{song.duration}</span>
                            </div>
                        ))}
                    </>
                )}

                {upcoming.length === 0 && (
                    <p className="text-gray-500 text-sm text-center mt-4">No upcoming songs</p>
                )}
            </div>
        </div>
    );
};

export default QueuePanel;
