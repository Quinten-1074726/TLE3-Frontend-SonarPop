import React, { useState, useRef, useEffect } from "react";
import {
    Play,
    Pause,
    SkipBack,
    SkipForward,
    Heart,
    Menu,
    Info,
    ChevronDown
} from "lucide-react";

function MusicPlayer() {
    const tracks = [
        {
            title: "Goud",
            author: "Susanne & Freek",
            album: "Dromen in kleur",
            src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
            cover:
                "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=500&h=500&auto=format&fit=crop",
        },
        {
            title: "Lichtje Branden",
            author: "Susanne & Freek",
            album: "Dromen in kleur",
            src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
            cover:
                "https://images.unsplash.com/photo-1493225255756-d9584f8606e9?q=80&w=500&h=500&auto=format&fit=crop",
        },
    ];

    const [isExpanded, setIsExpanded] = useState(false);
    const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);

    const audioRef = useRef(new Audio(tracks[0].src));
    const currentTrack = tracks[currentTrackIndex];

    const forward = (e) => {
        e?.stopPropagation();
        setCurrentTrackIndex((prev) => (prev + 1) % tracks.length);
    };

    const backward = (e) => {
        e?.stopPropagation();
        setCurrentTrackIndex((prev) => (prev - 1 + tracks.length) % tracks.length);
    };

    const togglePlay = (e) => {
        e?.stopPropagation();
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play().catch((err) => console.log("Play failed", err));
        }
        setIsPlaying(!isPlaying);
    };

    useEffect(() => {
        const audio = audioRef.current;
        audio.src = tracks[currentTrackIndex].src;

        if (isPlaying) {
            audio.play().catch((err) => console.log("Play failed", err));
        }

        const updateProgress = () => {
            if (audio.duration) {
                setProgress((audio.currentTime / audio.duration) * 100);
            }
        };

        audio.addEventListener("timeupdate", updateProgress);
        audio.addEventListener("ended", forward);

        return () => {
            audio.removeEventListener("timeupdate", updateProgress);
            audio.removeEventListener("ended", forward);
        };
    }, [currentTrackIndex, isPlaying]);

    return (
        <div
            className={`fixed inset-0 pointer-events-none flex items-end justify-center px-4 ${
                isExpanded ? "pb-4 z-[1200]" : "pb-20 z-[900]"
            }`}
        >
            <div
                className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-700 pointer-events-auto ${
                    isExpanded ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
                onClick={() => setIsExpanded(false)}
            />

            <div
                onClick={() => !isExpanded && setIsExpanded(true)}
                className={`
                    relative w-full max-w-[430px] bg-[#181919] shadow-2xl overflow-hidden pointer-events-auto
                    transition-all duration-700 ease-[cubic-bezier(0.19,1,0.22,1)]
                    ${
                        isExpanded
                            ? "h-[90vh] rounded-[40px]"
                            : "h-20 rounded-2xl border border-white/10"
                    }
                `}
            >
                <div
                    className={`
                        absolute top-0 left-0 w-full h-20 flex items-center justify-between px-4 z-20 transition-opacity duration-300
                        ${isExpanded ? "opacity-0 pointer-events-none" : "opacity-100"}
                    `}
                >
                    <div className="flex items-center gap-3 overflow-hidden min-w-0">
                        <img
                            src={currentTrack.cover}
                            alt=""
                            className="w-12 h-12 rounded-lg shadow-lg object-cover shrink-0"
                        />
                        <div className="truncate">
                            <div className="text-white text-sm font-bold truncate">
                                {currentTrack.title}
                            </div>
                            <div className="text-gray-400 text-xs truncate">
                                {currentTrack.author}
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={togglePlay}
                        className="bg-white rounded-full p-2.5 text-black shrink-0"
                    >
                        {isPlaying ? (
                            <Pause size={20} fill="currentColor" />
                        ) : (
                            <Play size={20} fill="currentColor" />
                        )}
                    </button>

                    <div className="absolute bottom-0 left-0 h-[2px] bg-white/10 w-full">
                        <div
                            className="h-full bg-white transition-all duration-300"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>

                <div
                    className={`
                        flex flex-col h-full transition-all duration-700
                        ${
                            isExpanded
                                ? "opacity-100 translate-y-0 scale-100"
                                : "opacity-0 translate-y-12 scale-95 pointer-events-none"
                        }
                    `}
                >
                    <div className="flex justify-between items-center p-6 w-full">
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                setIsExpanded(false);
                            }}
                            className="text-white"
                        >
                            <ChevronDown size={28} />
                        </button>

                        <span className="text-white/40 text-[10px] uppercase tracking-[0.2em] font-bold">
                            Nu aan het spelen
                        </span>

                        <button className="text-white">
                            <Menu size={24} />
                        </button>
                    </div>

                    <div className="px-8 flex-1 flex flex-col justify-center">
                        <div className="relative aspect-square w-full shadow-2xl rounded-2xl overflow-hidden mb-8">
                            <img
                                src={currentTrack.cover}
                                alt="Albumhoes"
                                className={`w-full h-full object-cover transition-transform duration-1000 ${
                                    isExpanded ? "scale-100" : "scale-110"
                                }`}
                            />
                        </div>

                        <div className="flex justify-between items-end mb-8">
                            <div className="flex-1">
                                <div className="text-[0.75rem] font-bold text-teal-400 mb-2 uppercase tracking-widest">
                                    {currentTrack.album}
                                </div>
                                <h2 className="text-2xl font-bold text-white mb-1">
                                    {currentTrack.title}
                                </h2>
                                <p className="text-lg text-gray-400">
                                    {currentTrack.author}
                                </p>
                            </div>

                            <div className="flex gap-4 mb-2">
                                <Heart className="text-white opacity-40 hover:opacity-100 transition-opacity" />
                                <Info className="text-white opacity-40 hover:opacity-100 transition-opacity" />
                            </div>
                        </div>

                        <div className="w-full space-y-3 mb-10">
                            <div className="relative h-1.5 bg-white/10 rounded-full w-full group cursor-pointer">
                                <div
                                    className="absolute h-full bg-white rounded-full transition-all duration-300"
                                    style={{ width: `${progress}%` }}
                                />
                                <div
                                    className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-xl opacity-0 group-hover:opacity-100 transition-opacity"
                                    style={{ left: `calc(${progress}% - 8px)` }}
                                />
                            </div>

                            <div className="flex justify-between text-[11px] font-bold text-gray-500">
                                <span>1:42</span>
                                <span>3:12</span>
                            </div>
                        </div>

                        <div className="flex items-center justify-center gap-10 pb-12">
                            <button
                                onClick={backward}
                                className="text-white/60 hover:text-white transition-colors"
                            >
                                <SkipBack size={32} fill="currentColor" />
                            </button>

                            <button
                                onClick={togglePlay}
                                className="w-20 h-20 flex items-center justify-center rounded-full bg-white shadow-[0_0_30px_rgba(255,255,255,0.2)] text-black hover:scale-105 active:scale-95 transition-transform"
                            >
                                {isPlaying ? (
                                    <Pause size={36} fill="currentColor" />
                                ) : (
                                    <Play size={36} fill="currentColor" className="ml-1" />
                                )}
                            </button>

                            <button
                                onClick={forward}
                                className="text-white/60 hover:text-white transition-colors"
                            >
                                <SkipForward size={32} fill="currentColor" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MusicPlayer;