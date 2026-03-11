import SongCard from "./SongCard.jsx";

function SongCarousel({ title, cards = [] }) {
    return (
        <section className="w-full">
            <p className="px-8 text-text-primary font-bold text-2xl mb-3">
                {title}
            </p>

            <div className="overflow-x-auto flex gap-4 px-8 snap-x snap-mandatory scrollbar-none">
                {cards.length === 0 ? (
                    <p className="text-sm text-white/60">Nog geen favoriete nummers gevonden.</p>
                ) : (
                    cards.map((card, idx) => (
                        <div
                            key={card?.id || idx}
                            className="shrink-0 snap-start"
                        >
                            <SongCard card={card} />
                        </div>
                    ))
                )}
            </div>
        </section>
    );
}

export default SongCarousel;