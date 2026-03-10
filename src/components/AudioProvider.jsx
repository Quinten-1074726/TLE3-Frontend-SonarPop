import React, { createContext, useContext, useState, useRef, useEffect, useCallback } from "react";

const AudioContext = createContext();

export const AudioProvider = ({ children, tracks = [] }) => {
    const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);

    // Initialiseer de audio instantie zonder bron.
    // Dit voorkomt dat we 'tracks[0]' aanraken voordat we weten of de array bestaat.
    const audioRef = useRef(new Audio());

    const currentTrack = tracks[currentTrackIndex];

    // 1. Definieer eerst de navigatie functies met useCallback
    const next = useCallback(() => {
        if (tracks.length === 0) return;
        setCurrentTrackIndex((prev) => (prev + 1) % tracks.length);
    }, [tracks.length]);

    const prev = useCallback(() => {
        if (tracks.length === 0) return;
        setCurrentTrackIndex((prev) => (prev - 1 + tracks.length) % tracks.length);
    }, [tracks.length]);

    // 2. Definieer de play/pauze logica
    const togglePlay = useCallback(() => {
        if (!audioRef.current.src && currentTrack) {
            audioRef.current.src = currentTrack.src;
        }

        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play().catch(err => console.warn("Playback blocked or failed:", err));
        }
        setIsPlaying(!isPlaying);
    }, [isPlaying, currentTrack]);

    // 3. Effect voor het laden van nieuwe tracks (reageert op index verandering)
    useEffect(() => {
        if (!currentTrack) return;

        const audio = audioRef.current;

        // Update bron alleen als deze echt anders is
        if (audio.src !== currentTrack.src) {
            audio.src = currentTrack.src;
            audio.load();

            // Als we al aan het spelen waren, speel de nieuwe track direct af
            if (isPlaying) {
                audio.play().catch(() => {});
            }
        }

        const updateProgress = () => {
            if (audio.duration) {
                setProgress((audio.currentTime / audio.duration) * 100);
            }
        };

        audio.addEventListener('timeupdate', updateProgress);
        audio.addEventListener('ended', next);

        return () => {
            audio.removeEventListener('timeupdate', updateProgress);
            audio.removeEventListener('ended', next);
        };
    }, [currentTrackIndex, next, tracks, isPlaying, currentTrack]); // isPlaying toegevoegd om autoplay bij skip te fixen

    const value = {
        currentTrack,
        isPlaying,
        progress,
        togglePlay,
        next,
        prev,
        setCurrentTrackIndex
    };

    return (
        <AudioContext.Provider value={value}>
            {children}
        </AudioContext.Provider>
    );
};

export const useAudio = () => {
    const context = useContext(AudioContext);
    if (!context) {
        throw new Error("useAudio must be used within an AudioProvider");
    }
    return context;
};