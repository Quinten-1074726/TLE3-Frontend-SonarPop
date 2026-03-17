import notFound from "../../assets/Image-not-found.png";
import {Play} from "lucide-react"
import {useContext} from "react";
import {MusicContext} from "../MusicProvider.jsx";


function SongCard({card, playlist = []}) {
    const {playTrack, currentTrack, isPlaying} = useContext(MusicContext)
    const image = card?.imageUrl || notFound;
    const songName = card?.name || card?.title || "Unknown song";
    const artistName = card?.artist || card?.artistName || "Unknown artist";
    const previewUrl = card?.previewUrl || card?.preview_url || card?.src

    const isCurrent = currentTrack?.id === card?.id

    const handlePlay = () => {
        if (!previewUrl || previewUrl === "No preview available") {
            console.warn("Geen preview url beschikbaar voor dit nummer")
            return
        }

        const trackToPlay = {
            id: card.id || Math.random(),
            title: songName,
            author: artistName,
            cover: image,
            src: previewUrl,
            album: card.album || {title: "album"}
        }

        playTrack(trackToPlay, playlist.length > 0 ? playlist : [trackToPlay])
    }


    return (
        <div className="group w-36 flex flex-col cursor-pointer transition-transform active:scale-95"
             onClick={handlePlay}>
            <div className="relative w-36 h-36 mb-2 overflow-hidden rounded-xl shadow-lg  flex flex-col">
                <img
                    src={image}
                    alt={songName}
                    className="w-36 h-36 object-cover rounded-xl mb-2"
                />

                <div
                    className={`absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity duration-300 ${
                        isCurrent && isPlaying ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                    }`}>
                    <div className="bg-white rounded-full p-2.5 text-black shadow-xl">
                        <Play size={20} fill="currentColor"/>
                    </div>
                </div>

                {isCurrent && isPlaying && (
                    <div className="absolute bottom-2 right-2 flex gap-0.5 items-end h-3">
                        <div className="w-1 bg-white animate-[bounce_0.6s_ease-in-out_infinite]"/>
                        <div className="w-1 bg-white animate-[bounce_0.8s_ease-in-out_infinite]"/>
                        <div className="w-1 bg-white animate-[bounce_0.5s_ease-in-out_infinite]"/>
                    </div>
                )}
            </div>

            <p className="text-sm font-bold text-text-primary leading-tight truncate">
                {songName}
            </p>

            <p className="text-xs text-text-primary/70 leading-tight mt-0.5 truncate">
                {artistName}
            </p>
        </div>

    );
}

export default SongCard;