import CardsCarousel from "../components/CardsCarousel.jsx";
import PageHeader from "../components/ui/PageHeader.jsx";

const title = "Ontdek meer van Sjoerd"
const cards = [1,2,3,4,5]; // Hoeveelheid kaarten straks berekent
function Library() {
    return(
        <>
            <PageHeader title="Library" />
            <CardsCarousel title={title} cards={cards}/>
        </>
    )
}

export default Library;