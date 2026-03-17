import React, { createContext, useState, useRef, useEffect, useCallback } from "react";

import {
    Play,
    Pause,
    SkipBack,
    SkipForward,
    Heart,
    Menu,
    Info,
    ChevronDown,
    Music,
    Home as HomeIcon,
    Search
} from "lucide-react";

export const MusicContext = createContext();

function MusicProvider ({ children })  {
    const [isExpanded, setIsExpanded] = useState(false);
    const [queue, setQueue] = useState([]);
    const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);

    // We gebruiken een ref om de audio-instantie consistent te houden
    const audioRef = useRef(new Audio());

    const currentTrack = queue[currentTrackIndex] || null;

    const playTrack = (track, newQueue = []) => {
        if (newQueue.length > 0) {
            setQueue(newQueue);
            const index = newQueue.findIndex(t => t.src === track.src);
            setCurrentTrackIndex(index !== -1 ? index : 0);
        } else {
            setQueue([track]);
            setCurrentTrackIndex(0);
        }
        setIsPlaying(true);
    };

    const togglePlay = (e) => {
        if (e && e.stopPropagation) e.stopPropagation();
        if (!currentTrack) return;
        setIsPlaying(!isPlaying);
    };

    const forward = useCallback((e) => {
        if (e && e.stopPropagation) e.stopPropagation();
        if (queue.length === 0) return;
        setCurrentTrackIndex((prev) => (prev + 1) % queue.length);
        setIsPlaying(true);
    }, [queue.length]);

    const backward = (e) => {
        if (e && e.stopPropagation) e.stopPropagation();
        if (queue.length === 0) return;
        setCurrentTrackIndex((prev) => (prev - 1 + queue.length) % queue.length);
        setIsPlaying(true);
    };

    // Robuustere Audio Effect Loop
    useEffect(() => {
        const audio = audioRef.current;
        if (!currentTrack || !currentTrack.src) return;

        // Update de bron als deze verschilt
        if (audio.src !== currentTrack.src) {
            audio.src = currentTrack.src;
            audio.load();
        }

        // Afspelen of pauzeren op basis van state
        if (isPlaying) {
            const playPromise = audio.play();
            if (playPromise !== undefined) {
                playPromise.catch(error => {
                    console.error("Playback interrupted or failed:", error);
                    setIsPlaying(false);
                });
            }
        } else {
            audio.pause();
        }

        // Event Listeners
        const handleTimeUpdate = () => {
            if (audio.duration) {
                setCurrentTime(audio.currentTime);
                setDuration(audio.duration);
                setProgress((audio.currentTime / audio.duration) * 100);
            }
        };

        const handleLoadedMetadata = () => {
            setDuration(audio.duration);
        };

        audio.addEventListener("timeupdate", handleTimeUpdate);
        audio.addEventListener("loadedmetadata", handleLoadedMetadata);
        audio.addEventListener("ended", forward);

        return () => {
            audio.removeEventListener("timeupdate", handleTimeUpdate);
            audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
            audio.removeEventListener("ended", forward);
        };
    }, [currentTrack, isPlaying, forward]);

    const formatTime = (time) => {
        if (isNaN(time) || time === null) return "0:00";
        const mins = Math.floor(time / 60);
        const secs = Math.floor(time % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <MusicContext.Provider value={{ currentTrack, isPlaying, progress, currentTime, duration, playTrack, togglePlay, forward, backward, formatTime }}>
            <div className="min-h-screen bg-black text-white relative font-sans">
                {children}

                {/* PLAYER UI INTEGRATIE */}
                {currentTrack && (
                    <div className={`fixed inset-x-0 bottom-0 flex flex-col items-center px-4 transition-all duration-500 ease-out ${
                        isExpanded ? "h-screen z-[1200]" : "h-24 pb-4 z-[900] pointer-events-none"
                    }`}>
                        {/* Backdrop */}
                        <div
                            className={`absolute inset-0 bg-black/95 backdrop-blur-3xl transition-opacity duration-700 pointer-events-auto ${
                                isExpanded ? "opacity-100" : "opacity-0 pointer-events-none"
                            }`}
                            onClick={() => setIsExpanded(false)}
                        />

                        {/* Player Container */}
                        <div
                            onClick={() => !isExpanded && setIsExpanded(true)}
                            className={`
                                relative w-full max-w-[430px] bg-zinc-900/90 shadow-2xl overflow-hidden pointer-events-auto border border-white/10
                                transition-all duration-700 cubic-bezier(0.22, 1, 0.36, 1)
                                ${isExpanded ? "h-[88vh] rounded-[40px] mt-8" : "h-20 rounded-2xl"}
                            `}
                        >
                            {/* Mini Player */}
                            <div className={`
                                absolute top-0 left-0 w-full h-20 flex items-center justify-between px-4 z-20 transition-opacity duration-300
                                ${isExpanded ? "opacity-0 pointer-events-none" : "opacity-100"}
                            `}>
                                <div className="flex items-center gap-3 overflow-hidden min-w-0">
                                    <img src={currentTrack.cover} className="w-12 h-12 rounded-lg object-cover flex-shrink-0" alt="" />
                                    <div className="truncate">
                                        <div className="text-white text-sm font-bold truncate">{currentTrack.title}</div>
                                        <div className="text-gray-400 text-xs truncate">{currentTrack.author}</div>
                                    </div>
                                </div>
                                <button onClick={togglePlay} className="bg-white rounded-full p-2.5 text-black shrink-0 shadow-lg active:scale-95 transition-transform">
                                    {isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" />}
                                </button>
                                <div className="absolute bottom-0 left-0 h-[2px] bg-white/5 w-full">
                                    <div className="h-full bg-white shadow-[0_0_10px_white]" style={{ width: `${progress}%` }} />
                                </div>
                            </div>

                            {/* Full Player */}
                            <div className={`
                                flex flex-col h-full transition-all duration-700
                                ${isExpanded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20 pointer-events-none"}
                            `}>
                                <div className="flex justify-between items-center p-6 w-full">
                                    <button onClick={(e) => { e.stopPropagation(); setIsExpanded(false); }} className="text-white/60 hover:text-white p-2">
                                        <ChevronDown size={28} />
                                    </button>
                                    <span className="text-white/40 text-[10px] uppercase tracking-[0.3em] font-black">Playing Now</span>
                                    <button className="text-white/60 hover:text-white p-2"><Menu size={24} /></button>
                                </div>

                                <div className="px-8 flex-1 flex flex-col justify-center">
                                    <div className="relative aspect-square w-full shadow-[0_20px_50px_rgba(0,0,0,0.5)] rounded-3xl overflow-hidden mb-10 bg-zinc-800">
                                        <img src={currentTrack.cover} alt="Cover" className="w-full h-full object-cover" />
                                    </div>

                                    <div className="flex justify-between items-center mb-10">
                                        <div className="flex-1 min-w-0">
                                            <h2 className="text-2xl font-black text-white mb-1 truncate tracking-tight">{currentTrack.title}</h2>
                                            <p className="text-lg text-white/50 truncate">{currentTrack.author}</p>
                                        </div>
                                        <div className="flex gap-2">
                                            <button className="p-2 text-white/40 hover:text-red-500 transition-colors"><Heart size={24} /></button>
                                        </div>
                                    </div>

                                    <div className="w-full mb-8">
                                        <div className="h-1.5 bg-white/10 rounded-full w-full mb-3 overflow-hidden">
                                            <div className="h-full bg-white rounded-full" style={{ width: `${progress}%` }} />
                                        </div>
                                        <div className="flex justify-between text-[11px] font-bold text-white/30 tracking-wider">
                                            <span>{formatTime(currentTime)}</span>
                                            <span>{formatTime(duration)}</span>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between px-4 pb-10">
                                        <button onClick={backward} className="text-white/60 hover:text-white transition-colors"><SkipBack size={36} fill="currentColor" /></button>
                                        <button onClick={togglePlay} className="w-24 h-24 flex items-center justify-center rounded-full bg-white text-black shadow-2xl active:scale-90 transition-all">
                                            {isPlaying ? <Pause size={42} fill="currentColor" /> : <Play size={42} fill="currentColor" className="ml-1" />}
                                        </button>
                                        <button onClick={forward} className="text-white/60 hover:text-white transition-colors"><SkipForward size={36} fill="currentColor" /></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </MusicContext.Provider>
    );
};

export default MusicProvider