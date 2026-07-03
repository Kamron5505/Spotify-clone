import React, { useContext, useRef } from "react";
import { PlayerContext } from "../context/PlayerContext";
import { assets } from "../assets/assets";

const Player = () => {
    const {
        seekBar,
        seekBg,
        playStatus,
        play,
        pause,
        track,
        time,
        previous,
        next,
        seekSong,
        volume,
        changeVolume,
        shuffle,
        toggleShuffle,
        repeat,
        toggleRepeat,
    } = useContext(PlayerContext);

    const volumeBgRef = useRef(null);

    const handleVolumeClick = (e) => {
        if (!volumeBgRef.current) return;
        const rect = volumeBgRef.current.getBoundingClientRect();
        const newVolume = (e.clientX - rect.left) / rect.width;
        changeVolume(newVolume);
    };

    return (
        <div className="h-[10%] bg-black flex justify-between items-center text-white px-4">
            <div className="hidden lg:flex items-center gap-4 min-w-[180px]">
                <img className="w-12 h-12 rounded" src={track.image} alt={track.name} />
                <div>
                    <p className="font-semibold text-sm">{track.name}</p>
                    <p className="text-gray-400 text-xs">{track.desc.slice(0, 20)}</p>
                </div>
            </div>

            <div className="flex flex-col items-center gap-1 m-auto">
                <div className="flex gap-4 items-center">
                    <img
                        onClick={toggleShuffle}
                        className={`w-4 cursor-pointer transition ${shuffle ? 'opacity-100 brightness-150' : 'opacity-60 hover:opacity-100'}`}
                        src={assets.shuffle_icon}
                        alt="shuffle"
                    />
                    <img
                        onClick={previous}
                        className="w-4 cursor-pointer opacity-60 hover:opacity-100 transition"
                        src={assets.prev_icon}
                        alt="previous"
                    />
                    <img
                        onClick={playStatus ? pause : play}
                        className="w-6 cursor-pointer opacity-90 hover:opacity-100 transition"
                        src={playStatus ? assets.pause_icon : assets.play_icon}
                        alt="play/pause"
                    />
                    <img
                        onClick={next}
                        className="w-4 cursor-pointer opacity-60 hover:opacity-100 transition"
                        src={assets.next_icon}
                        alt="next"
                    />
                    <img
                        onClick={toggleRepeat}
                        className={`w-4 cursor-pointer transition ${repeat !== 'off' ? 'opacity-100 brightness-150' : 'opacity-60 hover:opacity-100'}`}
                        src={assets.loop_icon}
                        alt="loop"
                    />
                </div>

                <div className="flex items-center gap-3 text-xs text-gray-300 mt-1">
                    <p>
                        {time.currentTime.minute}:{time.currentTime.second.toString().padStart(2, "0")}
                    </p>
                    <div
                        ref={seekBg}
                        onClick={seekSong}
                        className="w-[60vw] max-w-[500px] bg-gray-600 rounded-full cursor-pointer h-1 relative"
                    >
                        <div
                            ref={seekBar}
                            className="absolute top-0 left-0 h-1 bg-green-500 rounded-full w-0"
                        ></div>
                    </div>
                    <p>
                        {time.totalTime.minute}:{time.totalTime.second.toString().padStart(2, "0")}
                    </p>
                </div>
            </div>

            <div className="hidden lg:flex items-center gap-2 min-w-[180px] justify-end">
                <img className="w-4 opacity-60" src={assets.plays_icon} alt="plays" />
                <img className="w-4 opacity-60" src={assets.mic_icon} alt="mic" />
                <img className="w-4 opacity-60" src={assets.queue_icon} alt="queue" />
                <img
                    onClick={() => changeVolume(volume > 0 ? 0 : 1)}
                    className="w-4 cursor-pointer opacity-60 hover:opacity-100 transition"
                    src={volume === 0 ? assets.speaker_icon : assets.volume_icon}
                    alt="volume"
                />
                <div
                    ref={volumeBgRef}
                    onClick={handleVolumeClick}
                    className="w-20 bg-gray-600 h-1 rounded-full cursor-pointer relative"
                >
                    <div
                        className="absolute top-0 left-0 h-1 bg-white rounded-full"
                        style={{ width: `${volume * 100}%` }}
                    ></div>
                </div>
                <img className="w-4 opacity-60" src={assets.mini_player_icon} alt="mini player" />
                <img className="w-4 opacity-60" src={assets.zoom_icon} alt="zoom" />
            </div>
        </div>
    );
};

export default Player;
