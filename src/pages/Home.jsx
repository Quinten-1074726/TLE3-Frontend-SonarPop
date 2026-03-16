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
import RandomSongCard from "../components/RandomSongCard.jsx";

export default function Home() {
  // Check if user is logged in
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const API_KEY = import.meta.env.VITE_API_KEY;
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    async function loadRecommendations() {
      try {
        const token = localStorage.getItem("token");

        const headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "X-API-Key": API_KEY,
        };

        // Calculating profile vector
        const profileRes = await fetch(`${BASE_URL}/profile/compute`, {
          method: "POST",
          headers,
          body: JSON.stringify({}),
        });

        const { vector } = await profileRes.json();

        // Fetching recommendations based on profile vector
        const recRes = await fetch(`${BASE_URL}/recommendations`, {
          method: "POST",
          headers,
          body: JSON.stringify({
            profileVector: vector,
            limit: 10,
            dial: 3,
          }),
        });

        if (!recRes.ok) {
          const text = await recRes.text();
          console.error("Recommendation error:", text);
          throw new Error("Recommendation request failed");
        }

        const data = await recRes.json();

        // Map to SongCard component
        const mapped = data.tracks.map(({ track }) => ({
          id: track._id,
          title: track.title,
          artist: track.artist,
          image: track.imageUrl,
        }));

        setRecommendations(mapped);
      } catch (err) {
        console.error("Failed to load recommendations", err);
      }
    }

    loadRecommendations();
  }, []);

  const { isSearchOpen } = useNav();
  const [showConfig, setShowConfig] = useState(false);
  const [sliderValue, setSliderValue] = useState(0);

  const toggleConfig = () => setShowConfig((prev) => !prev);

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
          <div className="fixed bottom-44 left-1/2 -translate-x-1/2 w-full max-w-107.5 pointer-events-none z-[1100]">
            <div className="absolute right-4 pointer-events-auto transition-all duration-300 ease-in-out">
              <PrimaryButton onClick={toggleConfig}>
                <MdEdit className="text-text-primary text-3xl" />
              </PrimaryButton>
            </div>
          </div>
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

          <Slider value={sliderValue} onChange={setSliderValue} />
        </div>
      </div>

      <SongCarousel
          title="You might like"
          cards={recommendations}
      />
      <MusicPlayer />
    </div>
  );
}