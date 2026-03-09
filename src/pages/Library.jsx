import ProfileCarousel from "../components/ProfileCarousel.jsx";
import SongCarousel from "../components/SongCarousel.jsx";
import PageHeader from "../components/ui/PageHeader.jsx";
import ArtistCarousel from "../components/ArtistCarousel.jsx";

const cardsTitle = "Ontdek meer van Sjoerd" // Title die straks als prop kan worden ingeladen
const dummyCards = [
    { name: "Sjoerd", artist: "Sjoerd Sjoerdsma" },
    { name: "Blauwe dag", artist: "Suzan & Freek" },
    { name: "Brabant", artist: "Guus Meeuwis" },
]

const profileTitle = "Bekijk je vrienden" // Title die straks als prop kan worden ingeladen
const dummyProfiles = [
    { name: "Jan" },
    { name: "Piet" },
    { name: "Klaas" },
];

const artistTitle = "Ontdek meer artiesten" // Title die straks als prop kan worden ingeladen
const dummyArtists = [
    { name: "Sabrina Carpenter" },
    { name: "Suzan & Freek" },
    { name: "Ronnie Flex" },
];

function Library() {
    return(
        <>
            <PageHeader title="Library" />
            <SongCarousel title={cardsTitle} cards={dummyCards}/>
            <ProfileCarousel title ={profileTitle} profiles={dummyProfiles}/>
            <ArtistCarousel title={artistTitle} artists={dummyArtists} />
        </>
    )
}

export default Library;