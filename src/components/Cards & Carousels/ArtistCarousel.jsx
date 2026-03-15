import ArtistProfile from "./ArtistProfile.jsx";

function ArtistCarousel({title, artists}) {
    return(
        <>
            <p className="p-4 text-text-primary font-bold text-xl">{title}</p>
            <div className="overflow-x-auto flex gap-4 p-2 w-full max-w-107.5 snap-x snap-mandatory scrollbar-none">
                {artists.map((artist, idx) => (
                    <div key={idx} className="shrink-0 snap-start">
                        <ArtistProfile artist={artist} />
                    </div>
                ))}
            </div>
        </>
    )
}

export default ArtistCarousel;