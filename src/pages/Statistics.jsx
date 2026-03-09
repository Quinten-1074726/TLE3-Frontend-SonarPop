import { useState } from "react";
import TopModal from "../components/toplist/TopModal";
import PageHeader from "../components/ui/PageHeader.jsx";
import { STATISTICS_MOCK } from "../mocks/statisticsMock.js";

export default function Statistics() {
  const [openType, setOpenType] = useState(null);

  const items = openType ? STATISTICS_MOCK[openType] : [];

  return (
    <>
      <PageHeader title="Statistics" />

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
    </>
  );
}