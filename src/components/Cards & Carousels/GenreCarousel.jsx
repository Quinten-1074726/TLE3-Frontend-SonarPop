import GenreCard from "./GenreCard.jsx";

function GenreCarousel({
    title,
    genres = [],
    emptyText = "No genres found.",
}) {
    return (
        <section className="w-full">
            <p className="px-4 text-text-primary font-bold text-xl mb-4">
                {title}
            </p>

            {genres.length === 0 ? (
                <p className="px-4 text-sm text-white/70">{emptyText}</p>
            ) : (
                <div className="overflow-x-auto whitespace-nowrap pl-4 pr-5 pb-2 scrollbar-soft">
                    {genres.map((genre, idx) => (
                        <div
                            key={genre?.id || idx}
                            className="inline-block align-top mr-8"
                        >
                            <GenreCard genre={genre} />
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
}

export default GenreCarousel;