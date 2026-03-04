function TopListItem({ item, rank, onSelect }) {
  const { name, subtitle, value, imageUrl } = item;

  return (
    <button
      type="button"
      onClick={() => onSelect?.(item)}
      className="
        w-full text-left
        flex items-center gap-4
        rounded-lg px-3 py-2
        hover:bg-white/10 transition
      "
    >
      {/* Image placeholder */}
      <div className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center overflow-hidden shrink-0">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-white/50 text-xs">IMG</span>
        )}
      </div>

      {/* Text */}
      <div className="min-w-0 flex-1">
        <div className="text-text-primary truncate">
          {rank}. {name}
        </div>
        {subtitle && (
          <div className="text-xs text-white/50 truncate">{subtitle}</div>
        )}
      </div>

      {/* Value */}
      {value && (
        <div className="text-xs text-white/60 shrink-0">{value}</div>
      )}
    </button>
  );
}

export default TopListItem;