import TopListItem from "./TopListItem";

function TopList({ items, onSelect, limit = 5 }) {
  return (
    <div className="space-y-1">
      {items.slice(0, limit).map((item, index) => (
        <TopListItem
          key={item.id ?? `${item.type}-${index}`}
          item={item}
          rank={index + 1}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}

export default TopList;