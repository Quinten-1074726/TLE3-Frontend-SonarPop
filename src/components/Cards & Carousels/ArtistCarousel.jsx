import ArtistProfile from "./ArtistProfile.jsx";

function ArtistCarousel({ title, artists, onArtistSelect }) {
    return (
        <>
            <p className="p-4 text-text-primary font-bold text-xl">{title}</p>
            <div
                className="overflow-x-auto flex gap-4 p-2 w-full max-w-107.5 snap-x snap-mandatory scrollbar-none"
                role="list"
                aria-label={title}
            >
                {artists.map((artist, idx) => (
                    <div key={idx} className="shrink-0 snap-start" role="listitem">
                        <ArtistProfile
                            artist={artist}
                            tabIndex={0}
                            onClick={() => onArtistSelect?.(artist)}
                        />
                    </div>
                ))}
            </div>
        </>
    );
}

export default ArtistCarousel;