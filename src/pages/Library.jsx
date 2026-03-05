import CardsCarousel from "../components/CardsCarousel.jsx";

const cards = [1,2,3,4,5]; //Hoveelheid kaarten straks berekent
function Library() {
    return(
        <>
            <CardsCarousel cards={cards}/>
        </>
    )
}

export default Library;