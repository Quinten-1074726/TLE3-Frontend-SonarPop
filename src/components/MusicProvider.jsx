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
} from "lucide-react";

export const MusicContext = createContext();

export default function MusicProvider({ children }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [queue, setQueue] = useState([]);
    const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);

    const audioRef = useRef(new Audio());
    const expandedContainerRef = useRef(null);
    const lastFocusedElement = useRef(null);
    const currentTrack = queue[currentTrackIndex] || null;

    const formatTimeAria = (time) => {
        const mins = Math.floor(time / 60);
        const secs = Math.floor(time % 60);
        return `${mins} minutes, ${secs} seconds`;
    };

    const formatTime = (time) => {
        if (isNaN(time) || time === null) return "0:00";
        const mins = Math.floor(time / 60);
        const secs = Math.floor(time % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
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

    useEffect(() => {
        const audio = audioRef.current;
        if (!currentTrack?.src) return;

        if (audio.src !== currentTrack.src) {
            audio.src = currentTrack.src;
            audio.load();
        }

        if (isPlaying) {
            audio.play().catch(() => setIsPlaying(false));
        } else {
            audio.pause();
        }

        const handleTimeUpdate = () => {
            if (audio.duration) {
                setCurrentTime(audio.currentTime);
                setDuration(audio.duration);
                setProgress((audio.currentTime / audio.duration) * 100);
            }
        };

        audio.addEventListener("timeupdate", handleTimeUpdate);
        audio.addEventListener("ended", forward);
        return () => {
            audio.removeEventListener("timeupdate", handleTimeUpdate);
            audio.removeEventListener("ended", forward);
        };
    }, [currentTrack, isPlaying, forward]);

    useEffect(() => {
        if (isExpanded) {
            lastFocusedElement.current = document.activeElement;
            const focusable = expandedContainerRef.current?.querySelectorAll('button, [tabindex="0"]');
            if (focusable && focusable.length > 0) focusable[0].focus();

            const handleKeyDown = (e) => {
                if (e.key === "Escape") setIsExpanded(false);
                if (e.key === "Tab") {
                    const focusableElements = expandedContainerRef.current.querySelectorAll('button, [tabindex="0"]');
                    const firstElement = focusableElements[0];
                    const lastElement = focusableElements[focusableElements.length - 1];

                    if (e.shiftKey && document.activeElement === firstElement) {
                        e.preventDefault();
                        lastElement.focus();
                    } else if (!e.shiftKey && document.activeElement === lastElement) {
                        e.preventDefault();
                        firstElement.focus();
                    }
                }
            };

            window.addEventListener("keydown", handleKeyDown);
            return () => window.removeEventListener("keydown", handleKeyDown);
        } else if (lastFocusedElement.current) {
            lastFocusedElement.current.focus();
        }
    }, [isExpanded]);

    return (
        <MusicContext.Provider value={{
            currentTrack, isPlaying, progress, currentTime, duration,
            playTrack: (track, newQueue = []) => {
                const q = newQueue.length > 0 ? newQueue : [track];
                setQueue(q);
                setCurrentTrackIndex(q.indexOf(track));
                setIsPlaying(true);
            },
            togglePlay, forward, backward, formatTime
        }}>
            <div className="min-h-screen bg-black text-white relative">
                <main aria-hidden={isExpanded}>{children}</main>

                {currentTrack && (
                    <div
                        role="region"
                        aria-label="Audio Player"
                        className={`fixed inset-x-0 flex flex-col items-center transition-all duration-500 ease-out ${
                            isExpanded ? "bottom-5.5 h-screen z-[1200]" : "bottom-16 h-24 px-4 z-[900]"
                        }`}>

                        {isExpanded && (
                            <div
                                className="absolute w-fit inset-0 bg-black/80 backdrop-blur-xl transition-opacity duration-500"
                                onClick={() => setIsExpanded(false)}
                                aria-hidden="true"
                            />
                        )}

                        <div
                            ref={expandedContainerRef}
                            className={`
                                relative w-full max-w-[430px] bg-zinc-900 shadow-2xl overflow-hidden border border-white/10
                                transition-all duration-700 cubic-bezier(0.2, 1, 0.3, 1)
                                ${isExpanded ? " h-[92vh] rounded-[40px] mt-4" : "h-20 rounded-2xl cursor-pointer"}
                            `}
                        >
                            {/* mini player */}
                            <div
                                onClick={() => !isExpanded && setIsExpanded(true)}
                                onKeyDown={(e) => !isExpanded && (e.key === 'Enter' || e.key === ' ') && setIsExpanded(true)}
                                role={!isExpanded ? "button" : "none"}
                                tabIndex={!isExpanded ? 0 : -1}
                                aria-label={!isExpanded ? `Open player: ${currentTrack.title}` : undefined}
                                className={`
                                    absolute top-0 left-0 w-full h-20 flex items-center justify-between px-4 z-50 transition-opacity duration-300
                                    ${isExpanded ? "opacity-0 pointer-events-none" : "opacity-100"}
                                    focus-visible:ring-4 focus-visible:ring-white/20 outline-none
                                `}
                            >
                                <div className="flex items-center gap-3 overflow-hidden min-w-0">
                                    <img src={currentTrack.cover} className="w-12 h-12 rounded-lg object-cover" alt=""/>
                                    <div className="truncate">
                                        <div className="text-white text-sm font-bold truncate">{currentTrack.title}</div>
                                        <div className="text-white/70 text-xs truncate">{currentTrack.author}</div>
                                    </div>
                                </div>
                                <button
                                    onClick={togglePlay}
                                    aria-label={isPlaying ? "Pause" : "Play"}
                                    className="bg-white rounded-full p-2.5 text-black hover:scale-105 active:scale-95 transition-transform focus-visible:ring-4 focus-visible:ring-white/30 outline-none"
                                >
                                    {isPlaying ? <Pause size={20} fill="currentColor"/> : <Play size={20} fill="currentColor"/>}
                                </button>
                                <div className="absolute bottom-0 left-0 h-[3px] bg-white/10 w-full">
                                    <div className="h-full bg-white transition-all duration-300" style={{width: `${progress}%`}}/>
                                </div>
                            </div>

                            {/* big player */}
                            <div
                                aria-hidden={!isExpanded}
                                className={`flex flex-col h-full transition-all duration-700 ${isExpanded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"}`}
                            >
                                <div className="flex justify-between items-center p-6">
                                    <button
                                        onClick={() => setIsExpanded(false)}
                                        aria-label="Close player"
                                        className="text-white/70 hover:text-white p-2 focus-visible:ring-2 focus-visible:ring-white rounded-full outline-none"
                                    >
                                        <ChevronDown size={28}/>
                                    </button>
                                    <span aria-live="polite" className="text-white/50 text-[10px] uppercase tracking-widest font-bold">
                                        {isPlaying ? "Now Playing" : "Paused"}
                                    </span>
                                    <button aria-label="Playlist" className="text-white/70 hover:text-white p-2 focus-visible:ring-2 focus-visible:ring-white rounded-full outline-none">
                                        <Menu size={24}/>
                                    </button>
                                </div>

                                <div className="px-8 flex-1 flex flex-col justify-center">
                                    <div className="relative aspect-square w-full shadow-2xl rounded-3xl overflow-hidden mb-10 bg-zinc-800 border border-white/5">
                                        <img src={currentTrack.cover} alt={`Album art for ${currentTrack.title}`} className="w-full h-full object-cover"/>
                                    </div>

                                    {/* HEART AND INFO */}
                                    <div className="flex items-center justify-between gap-4 mb-8">
                                        <button
                                            aria-label="Track info"
                                            className="flex-shrink-0 p-2 text-white/60 hover:text-white focus-visible:ring-2 focus-visible:ring-white rounded-full outline-none"
                                        >
                                            <Info size={24}/>
                                        </button>

                                        <div className="min-w-0 text-center flex-1">
                                            <h2 className="text-2xl font-black text-white mb-1 truncate">{currentTrack.title}</h2>
                                            <p className="text-lg text-white/70 truncate">{currentTrack.author}</p>
                                        </div>

                                        <button
                                            aria-label="Add to favorites"
                                            className="flex-shrink-0 p-2 text-white/60 hover:text-red-500 focus-visible:ring-2 focus-visible:ring-white rounded-full outline-none"
                                        >
                                            <Heart size={24}/>
                                        </button>
                                    </div>

                                    <div className="w-full mb-10">
                                        <div
                                            className="h-1.5 bg-white/10 rounded-full w-full mb-4 overflow-hidden"
                                            role="progressbar"
                                            aria-label="Track progress"
                                            aria-valuenow={Math.round(progress)}
                                            aria-valuemin="0"
                                            aria-valuemax="100"
                                            aria-valuetext={`${formatTimeAria(currentTime)} of ${formatTimeAria(duration)}`}
                                        >
                                            <div className="h-full bg-white rounded-full" style={{width: `${progress}%`}}/>
                                        </div>
                                        <div className="flex justify-between text-xs font-bold text-white/50 tabular-nums">
                                            <span>{formatTime(currentTime)}</span>
                                            <span>{formatTime(duration)}</span>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between px-2 pb-12">
                                        <button onClick={backward} aria-label="Previous track" className="text-white/70 hover:text-white transition-colors focus-visible:ring-2 focus-visible:ring-white rounded-full outline-none p-3">
                                            <SkipBack size={36} fill="currentColor"/>
                                        </button>
                                        <button
                                            onClick={togglePlay}
                                            aria-label={isPlaying ? "Pause" : "Play"}
                                            className="w-20 h-20 flex items-center justify-center rounded-full bg-white text-black shadow-xl active:scale-95 transition-all outline-none focus-visible:ring-4 focus-visible:ring-white/30"
                                        >
                                            {isPlaying ? <Pause size={38} fill="currentColor"/> : <Play size={38} fill="currentColor" className="ml-1"/>}
                                        </button>
                                        <button onClick={forward} aria-label="Next track" className="text-white/70 hover:text-white transition-colors focus-visible:ring-2 focus-visible:ring-white rounded-full outline-none p-3">
                                            <SkipForward size={36} fill="currentColor"/>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </MusicContext.Provider>
    );
}