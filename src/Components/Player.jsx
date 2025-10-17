import React, { useContext } from "react";
import { PlayerContext } from "../context/PlayerContext";
import { assets } from "../assets/assets";

const Player = () => {
    const { track, playStatus, play, pause, next, previous } = useContext(PlayerContext);

    return (
        <div className="h-[10%] bg-black flex justify-between items-center text-white px-4">
            <div className="hidden lg:flex items-center gap-4">
                <img className="w-12" src={track?.image} alt={track?.name} />
                <div>
                    <p>{track?.name}</p>
                    <p>{track?.desc?.slice(0, 12)}...</p>
                </div>
            </div>

            <div className="flex flex-col items-center gap-1 m-auto">
                <div className="flex gap-4">
                    <img className="w-4 cursor-pointer" src={assets.shuffle_icon} alt="shuffle" />
                    <img onClick={previous} className="w-4 cursor-pointer" src={assets.prev_icon} alt="prev" />
                    <img
                        onClick={playStatus ? pause : play}
                        className="w-4 cursor-pointer"
                        src={playStatus ? assets.pause_icon : assets.play_icon}
                        alt="play/pause"
                    />
                    <img onClick={next} className="w-4 cursor-pointer" src={assets.next_icon} alt="next" />
                    <img className="w-4 cursor-pointer" src={assets.loop_icon} alt="loop" />
                </div>
            </div>

            <div className="hidden lg:flex items-center gap-2 opacity-75">
                <img className="w-4" src={assets.plays_icon} alt="plays" />
                <img className="w-4" src={assets.mic_icon} alt="mic" />
                <img className="w-4" src={assets.queue_icon} alt="queue" />
                <img className="w-4" src={assets.speaker_icon} alt="speaker" />
                <img className="w-4" src={assets.volume_icon} alt="volume" />
                <div className="w-20 bg-slate-50 h-1 rounded"></div>
                <img className="w-4" src={assets.mini_player_icon} alt="mini" />
                <img className="w-4" src={assets.zoom_icon} alt="zoom" />
            </div>
        </div>
    );
};

export default Player;
