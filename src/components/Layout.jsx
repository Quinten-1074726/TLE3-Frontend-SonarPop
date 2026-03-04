import {Link, Outlet} from "react-router";
import { AiOutlineHome, AiOutlineSearch } from "react-icons/ai";
import { MdTune, MdLibraryMusic } from "react-icons/md";
import { FaChartBar } from "react-icons/fa";

function Layout() {
  return (
      <>
          <nav className="bg-secondary fixed bottom-0 w-full max-w-107.5 mx-auto">
              <div className="flex justify-around items-center text-4xl sm:text-5xl gap-6 sm:gap-10 p-2 sm:p-4 text-text-primary">
                  <Link to="/"><AiOutlineHome /></Link>
                  <button className="cursor-pointer"><AiOutlineSearch /></button>
                  <button className="cursor-pointer"><MdTune /></button>
                  <Link to="/statistics"><FaChartBar /></Link>
                  <Link to="/library"><MdLibraryMusic /></Link>
              </div>
          </nav>
          <main>
              <Outlet />
          </main>
      </>
  );
}

export default Layout;