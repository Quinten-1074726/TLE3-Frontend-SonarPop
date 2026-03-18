import { useState } from "react";
import TopModal from "../components/toplist/TopModal";
import PageHeader from "../components/ui/PageHeader.jsx";
import useStatistics from "../components/hooks/useStatistics.js";
import PrimaryButton from "../components/PrimaryButton.jsx";

const HERO = {
  key: "liked",
  label: "Top Songs",
  gradient: "from-tertiary to-primary",
};

const SMALL_CARDS = [
  {
    key: "artist",
    label: "Top Artists",
    gradient: "from-primary to-secondary",
  },
  { key: "genre", label: "Top Genres", gradient: "from-secondary to-tertiary" },
];

export default function Statistics() {
  const [openType, setOpenType] = useState(null);
  const { artists, genres, liked, loading } = useStatistics();

  const statsMap = { artist: artists, genre: genres, liked };
  const items = openType ? statsMap[openType] : [];
  const heroItem = statsMap[HERO.key]?.[0];

  return (
    <>
      <PageHeader title="Your Statistics" />

      <div className="mx-6 flex flex-col gap-6">
        {/* Hero card — Top Songs */}
        <div className="flex flex-col gap-4">
          <div
            className={`bg-gradient-to-br ${HERO.gradient} rounded-xl py-10 flex flex-col items-center justify-center px-6`}
          >
            <span className="text-white/60 text-xs uppercase tracking-wider">
              #1
            </span>
            <p className="text-text-primary text-2xl font-bold text-center leading-tight mt-1 break-words">
              {loading ? "..." : heroItem?.name || "—"}
            </p>
            {heroItem?.subtitle && (
              <p className="text-white/50 text-sm mt-1">{heroItem.subtitle}</p>
            )}
          </div>
          <PrimaryButton onClick={() => setOpenType(HERO.key)}>
            View all songs
          </PrimaryButton>
        </div>

        {/* Two smaller cards */}
        <div className="grid grid-cols-2 gap-6">
          {SMALL_CARDS.map(({ key, label, gradient }) => {
            const topItem = statsMap[key]?.[0];

            return (
              <div key={key} className="flex flex-col gap-4">
                <div
                  className={`bg-gradient-to-br ${gradient} rounded-xl aspect-square flex flex-col items-center justify-center p-4`}
                >
                  <span className="text-white/60 text-xs uppercase tracking-wider">
                    #1
                  </span>
                  <p className="text-text-primary text-lg font-bold text-center leading-tight mt-1 break-words">
                    {loading ? "..." : topItem?.name || "—"}
                  </p>
                </div>
                <PrimaryButton onClick={() => setOpenType(key)}>
                  View all
                </PrimaryButton>
              </div>
            );
          })}
        </div>
      </div>

      {openType && (
        <TopModal
          type={openType}
          items={items}
          isLoading={loading}
          onClose={() => setOpenType(null)}
          onSelectItem={(item) => console.log("Clicked item:", item)}
        />
      )}
    </>
  );
}
