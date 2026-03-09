import PrimaryButton from "../components/PrimaryButton.jsx";
import {Link} from "react-router";
import {useState} from "react";
import CreatePlaylistComponent from "../components/CreatePlaylistComponent.jsx";
import ProfileCarousel from "../components/ProfileCarousel.jsx";
import SongCarousel from "../components/SongCarousel.jsx";
import PageHeader from "../components/ui/PageHeader.jsx";

const cardsTitle = "Ontdek meer van Sjoerd" // Title die straks als prop kan worden ingeladen
const dummyCards = [
    { name: "Sjoerd", artist: "Sjoerd Sjoerdsma" },
    { name: "Blauwe dag", artist: "Suzan & Freek" },
    { name: "Brabant", artist: "Guus Meeuwis" },
]

const profileTitle = "Profielen" // Title die straks als prop kan worden ingeladen
const dummyProfiles = [
    { name: "Jan" },
    { name: "Piet" },
    { name: "Klaas" },
];

function Library() {
    const [showModal, setShowModal] = useState(false);
    const openModal = () => setShowModal(true)
    const closeModal = () => setShowModal(false)
    return(
        <>
            <PageHeader title="Library" />

            <PrimaryButton onClick={openModal}>Create Playlist</PrimaryButton>
            <CreatePlaylistComponent isOpen={showModal} onClose={closeModal}>

        </CreatePlaylistComponent>
            <SongCarousel title={cardsTitle} cards={dummyCards}/>
            <ProfileCarousel title ={profileTitle} profiles={dummyProfiles}/>
            
        </>
    )
}

export default Library;