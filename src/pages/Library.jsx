import CardsCarousel from "../components/CardsCarousel.jsx";

const title = "Ontdek meer van Sjoerd"
const cards = [1,2,3,4,5]; // Hoeveelheid kaarten straks berekent
function Library() {
    return(
        <>
            <CardsCarousel title={title} cards={cards}/>
        </>
    )
}

export default Library;