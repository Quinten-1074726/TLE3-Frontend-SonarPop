import Search from "../components/search.jsx";
import { useNav } from "../components/ui/NavContext.jsx";

export default function Home() {
  const { isSearchOpen } = useNav();

  return (
    <div className="p-6 space-y-6">
      <h1 className="h2">Home</h1>

      {isSearchOpen ? (
        <Search onSearch={(q) => console.log("search:", q)} />
      ) : (
        <div className="bg-secondary rounded-xl px-5 py-4 text-text-primary">
          Liked songs (placeholder)
        </div>
        // <LikedSongsCard />
      )}
    </div>
  );
}