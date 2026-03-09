
import React, { useState, useRef, useEffect } from "react";
import { Play, Pause, SkipBack, SkipForward, Heart, Menu, Search, Info, ArrowLeft } from "lucide-react";

import {Link} from "react-router";
import PageHeader from "../components/ui/PageHeader.jsx";


export default function MusicPlayer() {
    //dummy tracks
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

    const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);

    const audioRef = useRef(new Audio(tracks[0].src));
    const currentTrack = tracks[currentTrackIndex];

    // Update audio wanneer de track verandert
    useEffect(() => {
        audioRef.current.pause();
        audioRef.current = new Audio(tracks[currentTrackIndex].src);

        if (isPlaying) {
            audioRef.current.play().catch(e => console.log("Play failed", e));
        }

        const updateProgress = () => {
            const duration = audioRef.current.duration;
            const currentTime = audioRef.current.currentTime;
            if (duration) {
                setProgress((currentTime / duration) * 100);
            }
        };

        const handleEnded = () => {
            forward();
        };

        audioRef.current.addEventListener('timeupdate', updateProgress);
        audioRef.current.addEventListener('ended', handleEnded);

        return () => {
            audioRef.current.removeEventListener('timeupdate', updateProgress);
            audioRef.current.removeEventListener('ended', handleEnded);
            audioRef.current.pause();
        };
    }, [currentTrackIndex]);

    const togglePlay = () => {
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play().catch(e => console.log("Play failed", e));
        }
        setIsPlaying(!isPlaying);
    };

    const forward = () => {
        setCurrentTrackIndex((prev) => (prev + 1) % tracks.length);
    };

    const backward = () => {
        setCurrentTrackIndex((prev) => (prev - 1 + tracks.length) % tracks.length);
    };


    return (
        
        <div className="min-h-screen bg-[#181919] flex items-center justify-center font-sans p-4">

            {/* Navigatie Iconen */}
            <div className="absolute top-4 w-full flex justify-between px-4 z-10">

                <Link to="/" className="text-black drop-shadow-md opacity-90 hover:opacity-100">
                    <ArrowLeft color="white" size={24}/>
                </Link>

                <button className="text-white drop-shadow-md opacity-90 hover:opacity-100">
                    <Menu color="white" size={24} />
                </button>
            </div>
            <div className="w-full max-w-[430px] bg-[#181919] rounded-xl shadow-[0_3px_12px_rgba(33,33,33,0.15)] overflow-hidden">
                <div className="relative">
                    <div className="relative">


                        {/* Album Cover */}
                        <img
                            src={currentTrack.cover}
                            alt="Albumhoes"
                            className="w-full aspect-square object-cover block"
                        />


                    </div>

                    {/* Informatie Sectie */}
                    <div className="flex justify-between items-center flex-row p-10 gap-8">
                        <div>
                            <Info color="white" />
                        </div>
                    <div className=" text-center">

                        <div className="text-[0.75rem] font-light text-[#666] mb-1 uppercase tracking-widest">{currentTrack.album}</div>
                        <div className="text-[1.25rem] font-medium text-white mb-1">{currentTrack.title}</div>
                        <div className="text-[0.85rem] font-light text-[#666]">{currentTrack.author}</div>
                    </div>
                        <div>
                            <Heart color="white"  />
                        </div>
                    </div>

                    {/* Voortgangsbalk */}
                    <div className=" m-4 p-1 right-0 mx-auto w-[80%] h-[2px] bg-white/95 rounded-full cursor-pointer group">
                        <div
                            className="h-full bg-black rounded-full"
                            style={{ width: `${progress}%` }}
                        ></div>
                        <div
                            className="top-1/2 -translate-y-1/2 -translate-x-1/2 w-3.5 h-3.5 bg-white rounded-full shadow-md group-hover:bg-red-500 transition-colors"
                            style={{ left: `${progress}%` }}
                        ></div>
                    </div>
                    {/* Bedieningselementen */}
                    <div className="pb-2 px-4">
                        <div className="flex items-center justify-center gap-8">
                            <button
                                onClick={backward}
                                className="text-gray-400 hover:text-white transition-colors"
                            >
                                <SkipBack size={28} fill="currentColor" />
                            </button>

                            <button
                                onClick={togglePlay}
                                className="w-16 h-16 flex items-center justify-center rounded-full bg-white shadow-lg text-black hover:scale-105 transition-transform"
                            >
                                {isPlaying ? <Pause size={32} fill="currentColor" /> : <Play size={32} fill="currentColor" className="ml-1" />}
                            </button>

                            <button
                                onClick={forward}
                                className="text-gray-400 hover:text-white transition-colors"
                            >
                                <SkipForward size={28} fill="currentColor" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}