import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdClose, MdEdit } from "react-icons/md";

import Search from "../components/Search";
import PrimaryButton from "../components/PrimaryButton.jsx";
import Slider from "../components/Slider.jsx";
import { useNav } from "../components/ui/NavContext.jsx";
import PageHeader from "../components/ui/PageHeader.jsx";
import MusicPlayer from "../components/MusicPlayer.jsx";
import SongCarousel from "../components/Cards & Carousels/SongCarousel.jsx";
import GenreCarousel from "../components/Cards & Carousels/GenreCarousel.jsx";
import RandomSongCard from "../components/RandomSongCard.jsx";

export default function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  const { isSearchOpen } = useNav();
  const [showConfig, setShowConfig] = useState(false);
  const [sliderValue, setSliderValue] = useState(0);

  const toggleConfig = () => setShowConfig((prev) => !prev);

  const dummyCards = [
    {
      id: "home-song-1",
      name: "Dromen in Kleur",
      artist: "Suzan & Freek",
      image: "https://placehold.co/300x300?text=Dromen+in+Kleur",
    },
    {
      id: "home-song-2",
      name: "Blauwe Dag",
      artist: "Suzan & Freek",
      image: "https://placehold.co/300x300?text=Blauwe+Dag",
    },
    {
      id: "home-song-3",
      name: "Brabant",
      artist: "Guus Meeuwis",
      image: "https://placehold.co/300x300?text=Brabant",
    },
  ];

  const dummyGenres = [
    {
      id: "genre-1",
      name: "Nederpop",
      image: "https://placehold.co/300x300?text=Nederpop",
    },
    {
      id: "genre-2",
      name: "Rock",
      image: "https://placehold.co/300x300?text=Rock",
    },
    {
      id: "genre-3",
      name: "Hip Hop",
      image: "https://placehold.co/300x300?text=Hip+Hop",
    },
  ];

  return (
    <div className="space-y-6 min-h-screen bg-background text-text-primary pb-28">
      <PageHeader title={isSearchOpen ? "Search" : "Home"} />

      <div className="px-6 space-y-6">
        {isSearchOpen ? (
          <Search onSearch={(q) => console.log("search:", q)} />
        ) : (
          <RandomSongCard
            title="Random Song"
            onShuffle={() => console.log("shuffle random song")}
            onPlay={() => console.log("play random song")}
          />
        )}

        {!showConfig && (
          <div className="fixed bottom-44 left-1/2 -translate-x-1/2 w-full max-w-107.5 pointer-events-none">
            <div className="absolute right-4 pointer-events-auto transition-all duration-300 ease-in-out">
              <PrimaryButton onClick={toggleConfig}>
                <MdEdit className="text-text-primary text-3xl" />
              </PrimaryButton>
            </div>
          </div>
        )}

        <div
          className={`fixed bottom-30 left-1/2 -translate-x-1/2 w-120 max-w-[100vw] p-6 z-50 transform transition-all duration-300 ease-out ${
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

          <Slider value={sliderValue} onChange={setSliderValue} />
        </div>
      </div>

      <SongCarousel title="Recently Played" cards={dummyCards} />
      <GenreCarousel title="Genres you might like" genres={dummyGenres} />

      <div className="fixed bottom-11 left-1/2 -translate-x-1/2 w-115 max-w-[100vw] z-50 transform transition-all duration-300 ease-out">
        <MusicPlayer />
      </div>
    </div>
  );
}