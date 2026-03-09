import CardsCarousel from "../components/CardsCarousel.jsx";
import PageHeader from "../components/ui/PageHeader.jsx";

const cards = [1,2,3,4,5]; //Hoveelheid kaarten straks berekent
function Library() {
    return(
        <>
            <PageHeader title="Library" />
            <CardsCarousel cards={cards}/>
        </>
    )
}

export default Library;