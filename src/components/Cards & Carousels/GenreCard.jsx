 function GenreCard({ genre, selected, onClick }) {
        return (
            <div
                onClick={onClick}
                className={`
        relative cursor-pointer rounded-xl p-6 text-center border transition-all duration-200 overflow-hidden
        ${selected
                    ? "scale-105 border-[var(--color-primary)] shadow-lg shadow-[var(--color-primary)/30]"
                    : "border-[var(--color-tertiary)] hover:scale-105 hover:border-[var(--color-primary)]"}
      `}
            >
                {/* achtergrond */}
                <div
                    className={`
          absolute inset-0 rounded-xl
          ${selected
                        ? "bg-[var(--color-primary)]/80"
                        : "bg-[var(--color-secondary)]/60 hover:bg-[var(--color-secondary-hover)]/60"}
        `}
                />

                {/* overlay voor leesbaarheid */}
                <div className="absolute inset-0 rounded-xl bg-black/20" />

                {/* genre tekst */}
                <p className="relative text-sm font-semibold capitalize text-[var(--color-text-primary)]">
                    {genre.name}
                </p>

                {/* checkmark bij selectie */}
                {selected && (
                    <span className="absolute top-2 right-3 text-[var(--color-text-primary)] text-sm font-bold">
          ✓
        </span>
                )}
            </div>
        )
}

export default GenreCard;