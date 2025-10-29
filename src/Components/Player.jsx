import React, { useContext } from "react";
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
    } = useContext(PlayerContext);

    return (
        <div className="h-[10%] bg-black flex justify-between items-center text-white px-4">
            {/* Левая часть — информация о треке */}
            <div className="hidden lg:flex items-center gap-4">
                <img className="w-12 h-12 rounded" src={track.image} alt={track.name} />
                <div>
                    <p className="font-semibold">{track.name}</p>
                    <p className="text-gray-400 text-sm">{track.desc.slice(0, 12)}...</p>
                </div>
            </div>

            {/* Центральная часть — управление */}
            <div className="flex flex-col items-center gap-1 m-auto">
                <div className="flex gap-4 items-center">
                    <img
                        className="w-4 cursor-pointer opacity-80 hover:opacity-100 transition"
                        src={assets.shuffle_icon}
                        alt="shuffle"
                    />
                    <img
                        onClick={previous}
                        className="w-4 cursor-pointer opacity-80 hover:opacity-100 transition"
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
                        className="w-4 cursor-pointer opacity-80 hover:opacity-100 transition"
                        src={assets.next_icon}
                        alt="next"
                    />
                    <img
                        className="w-4 cursor-pointer opacity-80 hover:opacity-100 transition"
                        src={assets.loop_icon}
                        alt="loop"
                    />
                </div>

                {/* Прогресс трека */}
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

            {/* Правая часть — иконки */}
            <div className="hidden lg:flex items-center gap-2 opacity-80">
                <img className="w-4" src={assets.plays_icon} alt="plays" />
                <img className="w-4" src={assets.mic_icon} alt="mic" />
                <img className="w-4" src={assets.queue_icon} alt="queue" />
                <img className="w-4" src={assets.speaker_icon} alt="speaker" />
                <img className="w-4" src={assets.volume_icon} alt="volume" />
                <div className="w-20 bg-slate-50 h-1 rounded"></div>
                <img className="w-4" src={assets.mini_player_icon} alt="mini player" />
                <img className="w-4" src={assets.zoom_icon} alt="zoom" />
            </div>
        </div>
    );
};

export default Player;
