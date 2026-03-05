import { HiOutlineXMark } from "react-icons/hi2";
import TopList from "./TopList";

const TITLE_BY_TYPE = {
  artist: "Top Artists",
  album: "Top Albums",
  song: "Top Songs",
  genre: "Top Genres",
};

function TopModal({ type, title, items = [], isLoading = false, onClose, onSelectItem }) {
  const heading = title || TITLE_BY_TYPE[type] || "Top 10";

  return (
    <div className="absolute inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div
        className="
          w-[92%] max-w-md
          rounded-2xl
          bg-disabled
          border border-white/10
          shadow-[0_0_40px_rgba(0,0,0,0.45)]
          overflow-hidden
        "
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
          <h2 className="text-text-primary text-lg font-semibold">
            {heading}
          </h2>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="
              p-2 rounded-lg
              hover:bg-white/10 transition
              text-text-primary
            "
          >
            <HiOutlineXMark size={22} />
          </button>
        </div>

        {/* Content */}
        <div className="px-3 py-3 max-h-[60vh] overflow-y-auto">

          {isLoading && (
            <div className="py-8 text-center text-white/60">
              Loading...
            </div>
          )}

          {!isLoading && items.length === 0 && (
            <div className="py-8 text-center text-white/60">
              No data available
            </div>
          )}

          {!isLoading && items.length > 0 && (
            <TopList items={items} onSelect={onSelectItem} />
          )}

        </div>
      </div>
    </div>
  );
}

export default TopModal;