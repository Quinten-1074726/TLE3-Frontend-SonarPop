import SongCard from "./SongCard.jsx";

function SongCarousel({ title, cards = [], emptyText = "No songs found." }) {
  return (
    <section className="w-full">
      <p className="px-4 text-text-primary font-bold text-xl mb-4">{title}</p>

      {cards.length === 0 ? (
        <p className="px-4 text-sm text-white/70">{emptyText}</p>
      ) : (
        <div className="overflow-x-auto whitespace-nowrap pl-4 pr-5 pb-2 scrollbar-soft">
          {cards.map((card, idx) => (
            <div key={card?.id || idx} className="inline-block align-top mr-8">
              <SongCard card={card} playlist={cards} />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default SongCarousel;
