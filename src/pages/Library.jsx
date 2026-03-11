import PrimaryButton from "../components/PrimaryButton.jsx";
import {useState} from "react";
import CreatePlaylistComponent from "../components/CreatePlaylistComponent.jsx";
import ProfileCarousel from "../components/Cards & Carousels/ProfileCarousel.jsx";
import SongCarousel from "../components/Cards & Carousels/SongCarousel.jsx";
import PageHeader from "../components/ui/PageHeader.jsx";
import ArtistCarousel from "../components/Cards & Carousels/ArtistCarousel.jsx";
import AlbumCarousel from "../components/Cards & Carousels/AlbumCarousel.jsx";

const cardsTitle = "Omdat je Sjoerd leuk vindt" // Title die straks als prop kan worden ingeladen
const dummyCards = [
    {name: "Sjoerd", artist: "Sjoerd Sjoerdsma"},
    {name: "Blauwe dag", artist: "Suzan & Freek"},
    {name: "Brabant", artist: "Guus Meeuwis"},
]

const profileTitle = "Bekijk je vrienden" // Title die straks als prop kan worden ingeladen
const dummyProfiles = [
    {name: "Jan"},
    {name: "Piet"},
    {name: "Klaas"},
];

const artistTitle = "Ontdek meer artiesten" // Title die straks als prop kan worden ingeladen
const dummyArtists = [
    { name: "Sabrina Carpenter" },
    { name: "Suzan & Freek" },
    { name: "Ronnie Flex" },
];

const albumTitle = "Zie meer albums" // Title die straks als prop kan worden ingeladen
const dummyAlbums = [
    { name: "Geluk", artist: "Guus Meeuwis" },
    { name: "De nacht is van ons", artist: "Antoon" },
    { name: "Gedeeld door ons", artist: "Suzan $ Freek" },
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