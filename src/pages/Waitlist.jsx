import PrimaryButton from "../components/PrimaryButton.jsx";
import {Link} from "react-router";
import {MdClose, MdEdit, MdDelete, MdKeyboardArrowLeft} from "react-icons/md";
import React from "react";

//throwaway data
const dummySongs = [
    {name: "Sjoerd", artist: "Sjoerd Sjoerdsma"},
    {name: "Blauwe dag", artist: "Suzan & Freek"},
    {name: "Brabant", artist: "Guus Meeuwis"},
]

function Waitlist() {

    return (
        <>
            <div className=" pointer-events-none flex items-end justify-center p-4 ">
                {/* Achtergrond overlay voor focus */}

                <button className="text-white">
                    <Link to="/">
                        <MdKeyboardArrowLeft size={24} />
                    </Link>
                </button>
                <div className=" min-h-screen">
                    <div className="max-w-md mx-auto ">
                        {dummySongs.map((song, idx) => (
                            <div
                                key={idx}
                                className="flex flex-row items-center p-3 border-solid border-t-2 border-b-2 border-[#185686] hover:bg-[#113552] transition-colors"
                            >

                                <div className="flex flex-row items-center gap-4 flex-1 overflow-hidden">

                                    <div className="size-10  rounded flex items-center justify-center shrink-0">
                                        {/* Song image */}
                                        <img alt="song image"
                                             src="https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=500&h=500&auto=format&fit=crop"/>
                                    </div>

                                    <div className="flex flex-col overflow-hidden">
                                        <h1 className="text-[#DEF9F6] font-bold truncate text-sm">
                                            {song.name}
                                        </h1>
                                        <p className="text-[#DEF9F6]/60 text-xs truncate">
                                            {song.artist}
                                        </p>
                                    </div>
                                </div>

                                <div className="pl-4">
                                    <p className="text-[#DEF9F6] font-medium text-xs whitespace-nowrap opacity-80">
                                        03:23
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Waitlist;