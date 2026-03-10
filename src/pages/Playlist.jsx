import PrimaryButton from "../components/PrimaryButton.jsx";
import {Link} from "react-router";
import {useState} from "react";
import CreatePlaylistComponent from "../components/CreatePlaylistComponent.jsx";
import PageHeader from "../components/ui/PageHeader.jsx";
import ProfileCard from "../components/ProfileCard.jsx";
import EditPlaylistComponent from "../components/EditPlaylistComponent.jsx";


//throwaway data
const playlistTitle = "Playlist1"
const dummySongs = [
    { name: "Sjoerd", artist: "Sjoerd Sjoerdsma" },
    { name: "Blauwe dag", artist: "Suzan & Freek" },
    { name: "Brabant", artist: "Guus Meeuwis" },
]

function Playlist() {
    const [showModal, setShowModal] = useState(false);
    const openModal = () => setShowModal(true)
    const closeModal = () => setShowModal(false)
    return(
        <>
            {/*button to go back to the library */}
            <PrimaryButton >
                <Link to="/library"/>
        </PrimaryButton>


            <div className="flex flex-row items-center">
            <div>
                {/*Playlist image */}
                <h1 className="size-6 text-[#DEF9F6] fill-[#DEF9F6]/20">X</h1>
                <img alt="" src=""/>

            </div>
            <div className="flex flex-col">
                <p className="p-4 text-[#DEF9F6] font-bold text-xl">{playlistTitle}</p>
                <div className="flex flex-row">
                    {/*icons for buttons */}
                <PrimaryButton onClick={openModal}>Edit</PrimaryButton>
                <PrimaryButton onClick={openModal}>Delete</PrimaryButton>
                <PrimaryButton onClick={openModal}>inv collaborators</PrimaryButton>
                <EditPlaylistComponent isOpen={showModal} onClose={closeModal}>

                </EditPlaylistComponent>
                </div>
            </div>
        </div>

            <div className=" bg-[#181919] min-h-screen">
                <div className="max-w-md mx-auto ">
                    {dummySongs.map((song, idx) => (
                        <div
                            key={idx}
                            className="flex flex-row items-center p-3 border-solid border-t-2 border-b-2 border-[#185686] hover:bg-[#113552] transition-colors"
                        >

                            <div className="flex flex-row items-center gap-4 flex-1 overflow-hidden">

                                <div className="size-10  rounded flex items-center justify-center shrink-0">
                                    {/* Song image */}
                                    <h1 className="size-6 text-[#DEF9F6] fill-[#DEF9F6]/20">X</h1>
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

        </>
    )
}

export default Playlist;