import SongCard from "./SongCard.jsx";

function SongCarousel({ title, cards = [] }) {
    return (
        <section className="w-full">
            <p className="px-4 text-text-primary font-bold text-xl mb-3">
                {title}
            </p>

            {cards.length === 0 ? (
                <p className="px-4 text-sm text-white/60">
                    Nog geen favoriete nummers gevonden.
                </p>
            ) : (
                <div className="overflow-x-auto whitespace-nowrap pl-4 pr-2 scrollbar-none">
                    {cards.map((card, idx) => (
                        <div
                            key={card?.id || idx}
                            className="inline-block align-top mr-4"
                        >
                            <SongCard card={card} />
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
}

export default SongCarousel;