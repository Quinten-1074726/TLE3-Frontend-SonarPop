import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdClose, MdEdit } from "react-icons/md";

import Search from "../components/Search";
import Slider from "../components/Slider.jsx";
import { useNav } from "../components/ui/NavContext.jsx";
import PageHeader from "../components/ui/PageHeader.jsx";

import SongCarousel from "../components/Cards & Carousels/SongCarousel.jsx";
import RandomSongCard from "../components/RandomSongCard.jsx";
import useRecommendations from "../components/hooks/useRecommendations.js";
import ArtistCarousel from "../components/Cards & Carousels/ArtistCarousel.jsx";
import { MusicContext } from "../components/MusicProvider.jsx";
import notFound from "../assets/Image-not-found.png";

export default function Home() {
  const navigate = useNavigate();
  const { playTrack, currentTrack } = useContext(MusicContext);
  const { isSearchOpen } = useNav();
  const [showConfig, setShowConfig] = useState(false);
  const [sliderValue, setSliderValue] = useState(() => {
    const saved = localStorage.getItem("slider_value");
    return saved !== null ? Number(saved) : 3;
  });
  const handleChangeInput = (value) => {
    setSliderValue(value);
    //slaat de stand op waar die op zat
    localStorage.setItem("slider_value", value.toString());
  };
  const { tracks, artists, loading } = useRecommendations(sliderValue);

  const toggleConfig = () => setShowConfig((prev) => !prev);

  const handlePlayRandom = () => {
    if (!tracks || tracks.length === 0) return;
    const card = tracks[Math.floor(Math.random() * tracks.length)];
    const previewUrl = card.previewUrl || card.preview_url || card.src;
    if (!previewUrl || previewUrl === "No preview available") return;
    const trackToPlay = {
      id: card.id || Math.random(),
      title: card.name || card.title || "Unknown song",
      author: card.artist || card.artistName || "Unknown artist",
      cover: card.imageUrl || notFound,
      src: previewUrl,
      album: card.album || { title: "album" },
    };
    playTrack(trackToPlay, [trackToPlay]);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className="space-y-6 min-h-screen bg-background text-text-primary pb-28">
      <PageHeader title={isSearchOpen ? "Search" : "Home"} />

      <div className="px-6 space-y-6">
        {isSearchOpen ? (
          <Search onSearch={(q) => console.log("search:", q)} />
        ) : (
          <RandomSongCard title="Random Song" onPlay={handlePlayRandom} />
        )}

        {!showConfig && (
          <button
            onClick={toggleConfig}
            className={`fixed ${currentTrack ? "bottom-36" : "bottom-20"} right-4 z-[1100] flex h-14 w-14 items-center justify-center rounded-full bg-primary shadow-lg shadow-primary/40 transition-all duration-300 hover:bg-primary-hover hover:shadow-xl hover:shadow-primary/50 active:scale-95 cursor-pointer`}
          >
            <MdEdit className="text-text-primary text-2xl" />
          </button>
        )}

        <div
          className={`fixed bottom-30 left-1/2 -translate-x-1/2 w-120 max-w-[100vw] p-6 z-[1100] transform transition-all duration-300 ease-out ${
            showConfig
              ? "opacity-100 translate-y-0 scale-100"
              : "opacity-0 translate-y-10 scale-95 pointer-events-none"
          }`}
        >
          <button
            onClick={toggleConfig}
            className="absolute top-8 right-8 text-2xl text-text-primary transition-transform duration-200 hover:rotate-90"
          >
            <MdClose />
          </button>

          <Slider value={sliderValue} onChange={handleChangeInput} />
        </div>
      </div>

      {loading ? (
        <p className="px-4 text-text-primary/70">Loading recommendations...</p>
      ) : (
        <>
          <SongCarousel title="Songs you might like" cards={tracks} />
          <ArtistCarousel title="Artists you might like" artists={artists} />
        </>
      )}
    </div>
  );
}
