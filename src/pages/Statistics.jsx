import { useState } from "react";
import TopModal from "../components/toplist/TopModal";

const MOCK = {
  artist: [
    { id: "a1", type: "artist", name: "Suzanne & Freek", subtitle: "Artist", value: "1843 min", imageUrl: "" },
    { id: "a2", type: "artist", name: "Bløf", subtitle: "Artist", value: "1632 min", imageUrl: "" },
    { id: "a3", type: "artist", name: "Roxy Dekker", subtitle: "Artist", value: "1409 min", imageUrl: "" },
  ],
  album: [
    { id: "al1", type: "album", name: "Midnight Waves", subtitle: "Ava Storm", value: "520 min", imageUrl: "" },
    { id: "al2", type: "album", name: "Neon Streets", subtitle: "Noah Beats", value: "441 min", imageUrl: "" },
  ],
  song: [
    { id: "s1", type: "song", name: "Ocean Lights", subtitle: "Midnight Waves", value: "120 plays", imageUrl: "" },
    { id: "s2", type: "song", name: "City Pulse", subtitle: "Neon Streets", value: "98 plays", imageUrl: "" },
  ],
  genre: [
    { id: "g1", type: "genre", name: "Synthwave", subtitle: "Genre", value: "32 tracks", imageUrl: "" },
    { id: "g2", type: "genre", name: "Lo-fi Hip Hop", subtitle: "Genre", value: "21 tracks", imageUrl: "" },
  ],
};

export default function Statistics() {
  const [openType, setOpenType] = useState(null);

  const items = openType ? MOCK[openType] : [];

  return (
    <div className="p-6 space-y-4">
      <h1 className="h2">Statistics</h1>

      <div className="flex flex-wrap gap-3">
        <button className="btn-primary" onClick={() => setOpenType("artist")}>
          Top Artists
        </button>
        <button className="btn-secondary" onClick={() => setOpenType("album")}>
          Top Albums
        </button>
        <button className="btn-tertiary" onClick={() => setOpenType("song")}>
          Top Songs
        </button>
        <button className="btn-secondary" onClick={() => setOpenType("genre")}>
          Top Genres
        </button>
      </div>

      {openType && (
        <TopModal
          type={openType}
          items={items}
          onClose={() => setOpenType(null)}
          onSelectItem={(item) => console.log("Clicked item:", item)}
        />
      )}
    </div>
  );
}