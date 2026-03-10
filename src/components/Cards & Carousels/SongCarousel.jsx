import SongCard from "./SongCard.jsx";

//
function SongCarousel({ title, cards }) {
    return (
        <>
            <p className="px-4 text-text-primary font-bold text-xl">{ title }</p>
            <div className="overflow-x-auto flex p-2 w-full max-w-107.5 mx-auto snap-x snap-mandatory scrollbar-none">
                {cards.map((card, idx) => (
                    <div
                        key={idx}
                        className="shrink-0 w-[45%] sm:w-[48%] snap-start"
                    >
                        <SongCard card={card}/>
                    </div>
                ))}
            </div>
        </>
    );
}

export default SongCarousel;