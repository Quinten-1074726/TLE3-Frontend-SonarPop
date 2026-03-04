import Search from "../components/search";
import PrimaryButton from "../components/PrimaryButton.jsx";
import {useState} from "react";
import Slider from "../components/Slider.jsx";
import {MdClose, MdEdit} from "react-icons/md";

export default function Home() {
    const [showConfig, setShowConfig] = useState(false);
    const [sliderValue, setSliderValue] = useState(0);

    const toggleConfig = () => setShowConfig(prev => !prev);

    return (
        <>
            <div className="space-y-6">
                <Search onSearch={(q) => console.log("search:", q)} />
            </div>

            {!showConfig && (
                <div
                    className="fixed bottom-18 right-4 transition-all duration-300 ease-in-out transform"
                >
                    <PrimaryButton onClick={toggleConfig}>
                        <MdEdit className="text-text-primary text-2xl" />
                    </PrimaryButton>
                </div>
            )}

            {showConfig && (
                <div
                    className={`fixed bottom-16 left-1/2 -translate-x-1/2 w-11/12 max-w-107.5 p-6 z-50 
                              transition-all duration-300 ease-in-out 
                              ${showConfig ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5 pointer-events-none"}`}>
                    <button
                        onClick={toggleConfig}
                        className="absolute top-8 right-8 text-2xl text-text-primary transition-transform duration-200 hover:scale-110"
                    >
                        <MdClose />
                    </button>

                    <Slider value={sliderValue} onChange={setSliderValue} />
                </div>
            )}
        </>
    );
}