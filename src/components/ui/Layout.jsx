import { Link, Outlet } from "react-router-dom";
import { AiOutlineHome, AiOutlineSearch } from "react-icons/ai";
import { MdTune, MdLibraryMusic } from "react-icons/md";
import { FaChartBar } from "react-icons/fa";
import { useNav } from "./NavContext.jsx";


function Layout() {
  const { isSearchOpen, toggleSearch, closeSearch } = useNav();

  return (
    <>
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
            onClick={toggleSearch}
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
    </>
  );
}

export default Layout;