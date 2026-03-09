import { useState } from "react";
import Search from "../components/Search";
import PrimaryButton from "../components/PrimaryButton.jsx";
import Slider from "../components/Slider.jsx";
import { MdClose, MdEdit } from "react-icons/md";
import { useNav } from "../components/ui/NavContext.jsx";

export default function Home() {
  const { isSearchOpen } = useNav();
  const [showConfig, setShowConfig] = useState(false);
  const [sliderValue, setSliderValue] = useState(0);

  const toggleConfig = () => setShowConfig((prev) => !prev);

  return (
    <div className="p-6 space-y-6">
      <h1 className="h2">Home</h1>

      {isSearchOpen ? (
        <Search onSearch={(q) => console.log("search:", q)} />
      ) : (
        <div className="bg-secondary rounded-xl px-5 py-4 text-text-primary">
          Liked songs (placeholder)
        </div>
      )}

        {!showConfig && (
            <div className="fixed bottom-30 left-1/2 -translate-x-1/2 w-full max-w-107.5 pointer-events-none">
                <div className="absolute right-4 pointer-events-auto transition-all duration-300 ease-in-out">
                    <PrimaryButton onClick={toggleConfig}>
                        <MdEdit className="text-text-primary text-3xl" />
                    </PrimaryButton>
                </div>
            </div>
        )}

      <div
        className={`fixed bottom-16 left-1/2 -translate-x-1/2 w-11/12 max-w-107.5 p-6 z-50 transform transition-all duration-300 ease-out ${
          showConfig
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 translate-y-10 scale-95 pointer-events-none"
        }`}
      >
        <button
          onClick={toggleConfig}
          className="absolute top-8 right-8 text-2xl text-text-primary transition-transform duration-200 hover:rotate-90"
        >
          <MdClose />
        </button>

        <Slider value={sliderValue} onChange={setSliderValue} />
      </div>
    </div>
  );
}