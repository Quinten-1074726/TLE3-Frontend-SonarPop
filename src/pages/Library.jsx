import ProfileCarousel from "../components/ProfileCarousel.jsx";
import SongCarousel from "../components/SongCarousel.jsx";

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
    return(
        <>
            <SongCarousel title={cardsTitle} cards={dummyCards}/>
            <ProfileCarousel title ={profileTitle} profiles={dummyProfiles}/>
        </>
    )
}

export default Library;