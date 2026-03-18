import PreferenceSlider from "../components/PreferenceSlider.jsx";
import { useEffect, useState } from "react";
import PageHeader from "../components/ui/PageHeader.jsx";
import PrimaryButton from "../components/PrimaryButton.jsx";

function Preferences() {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const API_KEY = import.meta.env.VITE_API_KEY;

  const [sliders, setSliders] = useState({});
  const [lists, setLists] = useState({ genres: [], artists: [], songs: [] });
  const [activeTab, setActiveTab] = useState("genres");
  const [viewAll, setViewAll] = useState(false); // toggle voor top 5 / all
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [dragging, setDragging] = useState(null); // { genre, value }
  const [genres, setGenres] = useState([]);

  const saveSliders = async (updatedSliders) => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`${BASE_URL}/sliders`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "X-API-Key": API_KEY,
        },
        body: JSON.stringify({ sliders: updatedSliders }),
      });
      if (!res.ok) throw new Error("Failed to save sliders");
      const data = await res.json();
      setSliders(data.sliders);
    } catch (err) {
      console.error(err);
    }
  };

  const tabs = [
    { key: "genres", label: "Genres" },
    { key: "artists", label: "Artists" },
    { key: "songs", label: "Songs" },
  ];

  // --- Fetch sliders ---
  const fetchSliders = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`${BASE_URL}/sliders`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "X-API-Key": API_KEY,
        },
      });
      if (!res.ok) throw new Error("Failed to fetch sliders");
      const data = await res.json();

      const defaultGenres = ["rock", "pop", "jazz", "electronic", "hip-hop"];
      const slidersData = Object.keys(data.sliders).length
        ? data.sliders
        : Object.fromEntries(defaultGenres.map((g) => [g, 1.0]));

      setSliders(slidersData);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchGenres = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`${BASE_URL}/genres`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "X-API-Key": API_KEY,
        },
      });
      if (!res.ok) throw new Error("Failed to fetch genres");
      const data = await res.json();
      setGenres(data.items.map((g) => g.name));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchSliders();
    fetchGenres();
  }, []);

  // --- Fetch blacklist ---
  const fetchLists = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`${BASE_URL}/blacklist`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "X-API-Key": API_KEY,
        },
      });
      if (!response.ok) throw new Error("Failed to fetch blacklist");
      const data = await response.json();

      const formatted = { genres: [], artists: [], songs: [] };
      data.entries.forEach((entry) => {
        if (entry.type === "genre") formatted.genres.push(entry);
        if (entry.type === "artist") formatted.artists.push(entry);
        if (entry.type === "track") formatted.songs.push(entry);
      });

      setLists(formatted);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchLists();
  }, []);

  const removeItem = async (entryId) => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`${BASE_URL}/blacklist/${entryId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "X-API-Key": API_KEY,
        },
      });
      const data = await response.json();
      if (!response.ok) throw new Error("Failed to delete");

      setLists({
        genres: data.entries.filter((e) => e.type === "genre"),
        artists: data.entries.filter((e) => e.type === "artist"),
        songs: data.entries.filter((e) => e.type === "track"),
      });
    } catch (err) {
      console.error(err);
    }
  };

  // --- Sort sliders op waarde voor top genres ---
  const sortedSliders = Object.entries(sliders).sort((a, b) => b[1] - a[1]); // hoge waarde eerst
  const displayedSliders = viewAll ? sortedSliders : sortedSliders.slice(0, 5);

  const searchItems = async (value) => {
    setQuery(value);

    if (value.length < 2) {
      setResults([]);
      return;
    }

    const token = localStorage.getItem("token");
    const q = encodeURIComponent(value);

    try {
      let formatted = [];

      if (activeTab === "genres") {
        formatted = genres
          .filter((g) => g.toLowerCase().includes(value.toLowerCase()))
          .map((g) => ({ type: "genre", value: g, label: g }));
      } else if (activeTab === "artists") {
        const res = await fetch(`${BASE_URL}/artists/search?q=${q}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "X-API-Key": API_KEY,
          },
        });
        const data = res.ok ? await res.json() : { results: [] };
        formatted = data.results.map((a) => ({
          type: "artist",
          value: a.name,
          label: a.name,
        }));
      } else if (activeTab === "songs") {
        const res = await fetch(`${BASE_URL}/tracks/search?q=${q}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "X-API-Key": API_KEY,
          },
        });
        const data = res.ok ? await res.json() : { results: [] };
        formatted = data.results.map((t) => ({
          type: "track",
          value: t._id || `${t.title} - ${t.artist}`,
          label: `${t.title} - ${t.artist}`,
        }));
      }

      setResults(formatted.slice(0, 8));
    } catch (err) {
      console.error(err);
    }
  };

  const addBlacklistItem = async (item) => {
    if (!item.value || !item.type) {
      console.error("Missing value or type");
      return;
    }

    const token = localStorage.getItem("token");

    try {
      const response = await fetch(`${BASE_URL}/blacklist`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "X-API-Key": API_KEY,
        },
        body: JSON.stringify({
          type: item.type,
          value: item.value,
        }),
      });

      const data = await response.json();
      console.log("Blacklist POST response:", data.entries);

      if (!response.ok) throw new Error("Failed to add");

      setLists({
        genres: data.entries.filter((e) => e.type === "genre"),
        artists: data.entries.filter((e) => e.type === "artist"),
        songs: data.entries.filter((e) => e.type === "track"),
      });

      setResults([]);
      setQuery("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <PageHeader title="Preferences" />
      <p className="text-text-primary mx-6">
        Fine-tune your music taste for smarter suggestions.
      </p>

      {/* --- Genre sliders --- */}
      <section className="mb-12">
        {displayedSliders.map(([genre, value]) => (
          <PreferenceSlider
            key={genre}
            label={genre}
            value={dragging?.genre === genre ? dragging.value : value}
            onChange={(newValue) => {
              setDragging({ genre, value: newValue });
            }}
            onCommit={() => {
              if (dragging?.genre === genre) {
                const updated = { ...sliders, [genre]: dragging.value };
                setSliders(updated);
                setDragging(null);
                saveSliders(updated);
              }
            }}
          />
        ))}

        <div className="flex justify-center items-center gap-8 mx-8">
          {/* Toggle view all / top 5 */}
          {Object.keys(sliders).length > 5 && (
            <PrimaryButton
              onClick={() => setViewAll((prev) => !prev)}
              className="mb-4"
            >
              {viewAll ? "Show Less" : "View All"}
            </PrimaryButton>
          )}
        </div>
      </section>

      <section className="m-4">
        <div className="flex w-full items-center gap-4">
          <div className="w-full">
            <p className="text-2xl text-text-primary font-bold mb-2">
              Blacklist
            </p>
            <p className="font-semibold text-text-primary text-sm">
              Excluded from recommendations
            </p>
          </div>
        </div>

        <div className="mx-6 my-4 relative">
          <input
            type="text"
            value={query}
            onChange={(e) => searchItems(e.target.value)}
            placeholder="Search..."
            className="w-full p-2 rounded bg-secondary text-text-primary"
          />

          {results.length > 0 && (
            <ul className="absolute w-full bg-tertiary rounded shadow mt-1 z-10">
              {results.map((item, i) => (
                <li
                  key={i}
                  onClick={() => addBlacklistItem(item)}
                  className="p-2 hover:bg-secondary cursor-pointer text-text-primary flex justify-between items-center"
                >
                  <span>{item.label}</span>
                  <span className="text-xs text-white/50">{item.type}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="flex gap-2 mb-4 justify-center my-6">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => {
                setActiveTab(tab.key);
                setResults([]);
                setQuery("");
              }}
              className={`px-4 py-2 rounded-lg transition text-text-primary ${
                activeTab === tab.key ? "bg-primary border-2" : "bg-secondary"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-300"
            style={{
              transform: `translateX(-${tabs.findIndex((t) => t.key === activeTab) * 100}%)`,
            }}
          >
            {tabs.map((tab) => (
              <ul
                key={tab.key}
                className="relative min-w-full space-y-2 p-6 bg-tertiary rounded-xl pb-16 min-h-48"
              >
                {lists[tab.key]?.slice(0, 5).map((item) => (
                  <li
                    key={item._id}
                    className="p-2 bg-text-primary rounded shadow flex justify-between items-center"
                  >
                    <span>{item.value}</span>

                    <button
                      onClick={() => removeItem(item._id)}
                      className="text-red-500 font-bold"
                    >
                      ✕
                    </button>
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default Preferences;
