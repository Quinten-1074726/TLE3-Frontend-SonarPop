import CardsCarousel from "../components/CardsCarousel.jsx";
import PrimaryButton from "../components/PrimaryButton.jsx";
import {Link} from "react-router";
import {useState} from "react";
import CreatePlaylistComponent from "../components/CreatePlaylistComponent.jsx";

const cards = [1,2,3,4,5]; //Hoveelheid kaarten straks berekent
function Library() {
    const [showModal, setShowModal] = useState(false);
    const openModal = () => setShowModal(true)
    const closeModal = () => setShowModal(false)
    return(
        <>
            <CardsCarousel cards={cards}/>

            <PrimaryButton onClick={openModal}>Create Playlist</PrimaryButton>
            <CreatePlaylistComponent isOpen={showModal} onClose={closeModal}>

        </CreatePlaylistComponent>
        </>
    )
}

export default Library;