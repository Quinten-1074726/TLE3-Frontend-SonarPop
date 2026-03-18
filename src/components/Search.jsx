import { useMemo, useState } from "react";
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";

const MOCK_RESULTS = [
  { id: "u1", type: "user", title: "Suzan en Freek", meta: "@suzanenfreek" },
  { id: "u2", type: "user", title: "Guus Meeuwis", meta: "@guusmeeuwis" },

  { id: "a1", type: "album", title: "Blauwe Dag", meta: "Suzan en Freek" },
  { id: "a2", type: "album", title: "Brabant", meta: "Guus Meeuwis" },

  { id: "g1", type: "genre", title: "Nederpop", meta: "Genre" },
  { id: "g2", type: "genre", title: "Hip Hop", meta: "Genre" },

  { id: "t1", type: "track", title: "Ocean Lights", meta: "Midnight Waves" },
  { id: "t2", type: "track", title: "City Pulse", meta: "Neon Streets" },
];

const TYPE_LABEL = {
  user: "Artist",
  album: "Album",
  genre: "Genre",
  track: "Nummer",
};

function Search({ onSearch, placeholder = "Search..." }) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];

    return MOCK_RESULTS.filter((item) => {
      const haystack = `${item.title} ${item.meta}`.toLowerCase();
      return haystack.includes(q);
    }).slice(0, 8);
  }, [query]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch?.(query);
    setIsOpen(true);
  };

  const handlePick = (item) => {
    setQuery(item.title);
    setIsOpen(false);
    onSearch?.(item.title);
  };

  return (
    <div className="w-full max-w-md relative">
      <form
        onSubmit={handleSubmit}
        className="
          flex items-center w-full
          rounded-xl px-5 py-4
          border border-white/15
          bg-white/5 backdrop-blur-sm
          transition
          focus-within:border-white/30
          focus-within:ring-2 focus-within:ring-primary/40
          focus-within:shadow-[0_0_18px_rgba(74,135,222,0.35)]
        "
      >
        <HiOutlineMagnifyingGlass
          size={22}
          className="text-text-primary mr-4"
        />

        <input
          type="search"
          inputMode="search"
          autoFocus
          value={query}
          placeholder={placeholder}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          onBlur={() => setTimeout(() => setIsOpen(false), 120)}
          className="
            flex-1 bg-transparent outline-none
            text-text-primary placeholder:text-white/45
          "
        />
      </form>

      {/* Dropdown */}
      {isOpen && query.trim().length > 0 && (
        <div
          className="
            absolute w-full z-10
            mt-2 overflow-hidden rounded-lg
            border border-white/10
            bg-[#0D2132]/95 backdrop-blur-sm
          "
        >
          {results.length === 0 ? (
            <div className="px-4 py-3 text-sm text-white/60">
              Geen resultaten voor “{query}”
            </div>
          ) : (
            <ul>
              {results.map((item) => (
                <li key={item.id}>
                  <button
                    type="button"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => handlePick(item)}
                    className="
                      w-full text-left px-4 py-3
                      hover:bg-white/10 transition
                      flex items-center justify-between gap-3
                    "
                  >
                    <div className="min-w-0">
                      <div className="text-text-primary truncate">
                        {item.title}
                      </div>
                      <div className="text-xs text-white/50 truncate">
                        {item.meta}
                      </div>
                    </div>

                    <span className="text-xs text-white/60 shrink-0">
                      {TYPE_LABEL[item.type]}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

export default Search;
