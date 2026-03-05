import TopListItem from "./TopListItem";

function TopList({ items, onSelect }) {
  return (
    <div className="space-y-1">
      {items.map((item, index) => (
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