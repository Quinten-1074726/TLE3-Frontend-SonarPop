import PrimaryButton from "../components/PrimaryButton.jsx";
import {Link} from "react-router";
import {useState} from "react";
import CreatePlaylistComponent from "../components/CreatePlaylistComponent.jsx";
import ProfileCarousel from "../components/ProfileCarousel.jsx";
import SongCarousel from "../components/SongCarousel.jsx";
import PageHeader from "../components/ui/PageHeader.jsx";

const cardsTitle = "Ontdek meer van Sjoerd" // Title die straks als prop kan worden ingeladen
const dummyCards = [
    {name: "Sjoerd", artist: "Sjoerd Sjoerdsma"},
    {name: "Blauwe dag", artist: "Suzan & Freek"},
    {name: "Brabant", artist: "Guus Meeuwis"},
]

const profileTitle = "Profielen" // Title die straks als prop kan worden ingeladen
const dummyProfiles = [
    {name: "Jan"},
    {name: "Piet"},
    {name: "Klaas"},
];

function Library() {
    const [showModal, setShowModal] = useState(false);
    const openModal = () => setShowModal(true)
    const closeModal = () => setShowModal(false)
    return (
        <>
            <PageHeader title="Library"/>

            <PrimaryButton onClick={openModal}>Create Playlist</PrimaryButton>
            <CreatePlaylistComponent isOpen={showModal} onClose={closeModal}>
            </CreatePlaylistComponent>

            <div className="p-4 flex flex-col">
                <Link to="/playlist">
                    <img className="max-h-40 max-w-40" alt="playlist image"
                         src="https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=500&h=500&auto=format&fit=crop"/>
                    <h1 className="text-[#DEF9F6]">Playlist 1</h1>
                </Link>
            </div>

            <SongCarousel title={cardsTitle} cards={dummyCards}/>
            <ProfileCarousel title={profileTitle} profiles={dummyProfiles}/>

        </>
    )
}

export default Library;