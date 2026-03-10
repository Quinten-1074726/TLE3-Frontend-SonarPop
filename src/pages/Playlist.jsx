import PrimaryButton from "../components/PrimaryButton.jsx";
import {Link} from "react-router";
import {useState} from "react";
import {MdClose, MdEdit, MdDelete, MdKeyboardArrowLeft} from "react-icons/md";
import {FaPeopleGroup} from "react-icons/fa6";
import EditPlaylistComponent from "../components/EditPlaylistComponent.jsx";
import EditCollaboratorComponent from "../components/EditCollaboratorComponent.jsx";


//throwaway data
const playlistTitle = "Playlist1"
const dummySongs = [
    {name: "Sjoerd", artist: "Sjoerd Sjoerdsma"},
    {name: "Blauwe dag", artist: "Suzan & Freek"},
    {name: "Brabant", artist: "Guus Meeuwis"},
]

const user = "Suzanne"

function Playlist() {
    const [showModal, setShowModal] = useState(false);
    const [showCModal, setShowCModal] = useState(false);
    const openModal = () => setShowModal(true)
    const closeModal = () => setShowModal(false)
    const openCModal = () => setShowCModal(true)
    const closeCModal = () => setShowCModal(false)

    return (
        <>
            {/*button to go back to the library */}
            <div className="p-2">
            <div className="flex justify-start items-center max-w-1/7 ">
            <PrimaryButton>
                <Link to="/library"><MdKeyboardArrowLeft /></Link>
            </PrimaryButton>
        </div>
        </div>
            <div className="flex flex-row items-center p-2 gap-5">
                <div className="">
                    {/*Playlist image */}
                    <img className="max-h-40 max-w-40" alt="playlist image"
                         src="https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=500&h=500&auto=format&fit=crop"/>

                </div>
                <div className="pl-4flex flex-col">
                    <p className="text-[#DEF9F6] font-bold text-xl">{playlistTitle}</p>
                    <p className="text-[#DEF9F6] font-light text-md">{user}</p>
                    <div className="flex pt-2 flex-row gap-2">
                        {/*icons for buttons */}
                        <PrimaryButton onClick={openModal}><MdEdit/></PrimaryButton>
                        <PrimaryButton ><MdDelete/></PrimaryButton>
                        <PrimaryButton onClick={openCModal}><FaPeopleGroup/></PrimaryButton>
                        <EditPlaylistComponent isOpen={showModal} onClose={closeModal}>
                        </EditPlaylistComponent>
                        <EditCollaboratorComponent isCOpen={showCModal} onClose={closeCModal}></EditCollaboratorComponent>
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

        </>
    )
}

export default Playlist;