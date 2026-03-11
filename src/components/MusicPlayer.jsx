
import React, { useState, useRef, useEffect } from "react";
import { Play, Pause, SkipBack, SkipForward, Heart, Menu, Info, ArrowLeft, ChevronDown } from "lucide-react";
import {Link} from "react-router";
import { FaHeart } from "react-icons/fa";

function MusicPlayer() {
    const tracks = [
        {
            title: 'Goud',
            author: 'Susanne & Freek',
            album: 'Dromen in kleur',
            src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
            cover: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=500&h=500&auto=format&fit=crop'
        },
        {
            title: 'Lichtje Branden',
            author: 'Susanne & Freek',
            album: 'Dromen in kleur',
            src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
            cover: 'https://images.unsplash.com/photo-1493225255756-d9584f8606e9?q=80&w=500&h=500&auto=format&fit=crop'
        }
    ];

    const [isExpanded, setIsExpanded] = useState(false);
    const [showQueue, setShowQueue] = useState(false);
    const [showHeart, setShowHeart] = useState(false);
    const [showInfo, setShowInfo] = useState(false)

    const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);


    const audioRef = useRef(new Audio(tracks[0].src));
    const currentTrack = tracks[currentTrackIndex];

    const togglePlay = (e) => {
        e?.stopPropagation();
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play().catch(e => console.log("Play failed", e));
        }
        setIsPlaying(!isPlaying);
    };

    const forward = (e) => {
        e?.stopPropagation();
        setCurrentTrackIndex((prev) => (prev + 1) % tracks.length);
    };

    const backward = (e) => {
        e?.stopPropagation();
        setCurrentTrackIndex((prev) => (prev - 1 + tracks.length) % tracks.length);
    };

    const toggleQueue = (e) => {
        e?.stopPropagation();
        setShowQueue(!showQueue);
    };

    const toggleHeart = (e) => {
        e?.stopPropagation();
        setShowHeart(!showHeart);
    };

    useEffect(() => {
        const audio = audioRef.current;
        audio.src = tracks[currentTrackIndex].src;
        if (isPlaying) audio.play().catch(() => {});

        const updateProgress = () => {
            if (audio.duration) setProgress((audio.currentTime / audio.duration) * 100);
        };

        audio.addEventListener('timeupdate', updateProgress);
        return () => audio.removeEventListener('timeupdate', updateProgress);
    }, [currentTrackIndex, tracks]);

    return (
        <div className="fixed inset-0 pointer-events-none flex items-end justify-center p-4 z-[999]">


            <div
                onClick={() => !isExpanded && setIsExpanded(true)}
                className={`
                    relative w-full max-w-[420px] bg-[#1a1a1a] shadow-2xl overflow-hidden pointer-events-auto
                    transition-all duration-700 ease-[cubic-bezier(0.2,1,0.2,1)]
                    ${isExpanded ? 'h-[85vh] rounded-[48px] mb-8' : 'h-20 rounded-2xl mb-8 border border-white/5'}
                `}
            >
                {/* Mini player */}
                <div className={`absolute top-0 left-0 w-full h-20 flex items-center justify-between px-4 z-20 transition-opacity duration-300 ${isExpanded ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
                    <div className="flex items-center gap-3">
                        <img src={currentTrack.cover} className="w-12 h-12 rounded-lg object-cover"  alt="Song cover"/>
                        <div className="text-white text-sm font-bold">{currentTrack.title}</div>
                    </div>
                    <button onClick={togglePlay} className="bg-white p-2.5 rounded-full text-black">
                        {isPlaying ? <Pause size={18} fill="black" /> : <Play size={18} fill="black" />}
                    </button>
                </div>

                {/* Full player*/}
                <div className={`flex flex-col h-full transition-all duration-700 ${isExpanded ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>

                    <div className="flex justify-between items-center p-8 z-30">
                        <button onClick={(e) => { e.stopPropagation(); setIsExpanded(false); setShowQueue(false); }} className="text-white/60 hover:text-white">
                            <ChevronDown size={28} />
                        </button>
                        <span className="text-white/80 text-[10px] uppercase tracking-widest font-bold">
                            {showQueue ? 'Queue' : 'Now playing'}
                        </span>
                        <button onClick={toggleQueue} className={`transition-colors ${showQueue ? 'text-[#3767B0]' : 'text-white/60'}`}>
                            <Menu size={24} />
                        </button>
                    </div>

                    {/* Content switcher view and queue*/}
                    <div className="flex-1 px-8 relative overflow-hidden">

                        {/* Song view */}
                        <div className={`absolute inset-0 px-8 transition-all duration-700 ease-in-out ${showQueue ? 'opacity-0 scale-90 -translate-x-full pointer-events-none' : 'opacity-100 scale-100 translate-x-0'}`}>
                            <div className="aspect-square w-full rounded-3xl overflow-hidden shadow-2xl mb-8">
                                <img alt="Song cover" src={currentTrack.cover} className="w-full h-full object-cover" />
                            </div>
                            <div className="mb-8">
                                <h2 className="text-2xl font-bold text-white mb-1">{currentTrack.title}</h2>
                                <p className="text-lg text-white/50">{currentTrack.author}</p>
                            </div>
                        </div>

                        {/* Queue if state is true*/}
                        <div className={`absolute inset-0 px-8 transition-all duration-700 ease-in-out ${showQueue ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full pointer-events-none'}`}>
                            <div className="space-y-4 pt-2 h-[60%] overflow-y-auto custom-scrollbar">
                                {tracks.map((track, idx) => (
                                    <div
                                        key={idx}
                                        onClick={() => setCurrentTrackIndex(idx)}
                                        className={`flex items-center gap-4 p-3 rounded-2xl transition-colors ${currentTrackIndex === idx ? 'bg-[#3767B0]/30' : 'hover:bg-white/5'}`}
                                    >
                                        <div className="relative size-12 shrink-0">
                                            <img src={track.cover} className="rounded-lg object-cover size-full"  alt="song cover"/>
                                            {currentTrackIndex === idx && isPlaying && (
                                                <div className="absolute inset-0 bg-black/40 flex items-center justify-center rounded-lg">
                                                    <div className="w-1 h-3 bg-[#DEF9F6] animate-pulse mx-0.5" />
                                                    <div className="w-1 h-5 bg-[#DEF9F6] animate-pulse mx-0.5" />
                                                    <div className="w-1 h-3 bg-[#DEF9F6] animate-pulse mx-0.5" />
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex-1 overflow-hidden">
                                            <div className={`text-sm font-bold truncate ${currentTrackIndex === idx ? 'text-[#84BAE9]' : 'text-white'}`}>{track.title}</div>
                                            <div className="text-xs text-[#DEF9F6]/70 truncate">{track.author}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="p-8 pt-0 z-30">
                        <div className="mb-8">
                            <div className="h-1 w-full bg-white/10 rounded-full mb-2">
                                <div className="h-full bg-white rounded-full relative" style={{ width: `${progress}%` }}>
                                    <div className="absolute right-0 top-1/2 -translate-y-1/2 size-3 bg-white rounded-full shadow-lg" />
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center justify-between">
                            <button onClick={toggleHeart} className={`cursor-pointer transition-colors delay-50 duration-400 ease-in-out hover:-translate-y-0.4 hover:scale-110  ${showHeart ? 'text-[#3767B0]' : 'text-white/40'}`}>
                                <FaHeart size={24} />
                            </button>
                            <div className="flex items-center gap-8">
                                <button onClick={backward} className="text-white"><SkipBack size={28} fill="currentColor" /></button>
                                <button onClick={togglePlay} className="size-16 bg-white rounded-full flex items-center justify-center text-black">
                                    {isPlaying ? <Pause size={30} fill="black" /> : <Play size={30} fill="black" className="ml-1" />}
                                </button>
                                <button onClick={forward} className="text-white"><SkipForward size={28} fill="currentColor" /></button>
                            </div>
                            <button className="text-white/40"><Info size={24} /></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MusicPlayer