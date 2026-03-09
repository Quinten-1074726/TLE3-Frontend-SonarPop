import MusicCard from "../components/MusicCard.jsx";

function MusicCarousel({ title, cards }) {
    return (
        <>
            <p className="p-4 text-text-primary font-bold text-xl">{ title }</p>
            <div className="overflow-x-auto flex p-2 w-full max-w-107.5 mx-auto snap-x snap-mandatory scrollbar-none">
                {cards.map((card, idx) => (
                    <div
                        key={idx}
                        className="shrink-0 w-[45%] sm:w-[48%] snap-start"
                    >
                        <MusicCard />
                    </div>
                ))}
            </div>
        </>
    );
}

export default MusicCarousel;