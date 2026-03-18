import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import { AiOutlineHome, AiOutlineSearch } from "react-icons/ai";
import { MdTune, MdLibraryMusic } from "react-icons/md";
import { FaChartBar } from "react-icons/fa";
import { useNav } from "./NavContext.jsx";
import { AudioProvider } from "../AudioProvider.jsx";

function Layout() {
  const { isSearchOpen, openSearch, toggleSearch, closeSearch } = useNav();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearchClick = () => {
    if (location.pathname !== "/") {
      openSearch();
      navigate("/");
    } else {
      toggleSearch();
    }
  };
  const dummyTracks = [
    {
      id: 1,
      title: "Goud",
      author: "Susanne & Freek",
      album: "Dromen in kleur",
      src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
      cover:
        "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=500&h=500&auto=format&fit=crop",
    },
    {
      id: 2,
      title: "Lichtje Branden",
      author: "Susanne & Freek",
      album: "Dromen in kleur",
      src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
      cover:
        "https://images.unsplash.com/photo-1493225255756-d9584f8606e9?q=80&w=500&h=500&auto=format&fit=crop",
    },
  ];

  return (
    <AudioProvider tracks={dummyTracks}>
      <main className="pb-24">
        <Outlet />
      </main>

      <nav className="bg-secondary fixed bottom-0 w-full max-w-[430px] mx-auto left-1/2 -translate-x-1/2">
        <div className="flex justify-around items-center text-4xl sm:text-5xl gap-6 sm:gap-10 p-2 sm:p-4 text-text-primary">
          <Link to="/" onClick={closeSearch}>
            <AiOutlineHome />
          </Link>

          <button
            type="button"
            onClick={handleSearchClick}
            aria-label="Toggle search"
            className={`cursor-pointer ${isSearchOpen ? "text-white" : ""}`}
          >
            <AiOutlineSearch />
          </button>

          <Link to="/preferences">
            <MdTune />
          </Link>

          <Link to="/statistics">
            <FaChartBar />
          </Link>

          <Link to="/library">
            <MdLibraryMusic />
          </Link>
        </div>
      </nav>
    </AudioProvider>
  );
}

export default Layout;
