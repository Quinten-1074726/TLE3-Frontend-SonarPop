import Search from "../components/Search.jsx";

export default function Home() {
  const handleSearch = (q) => console.log("Searching:", q);

  return (
    <div className="space-y-6">
      <h1 className="h1">Home</h1>
      <Search onSearch={handleSearch} />
    </div>
  );
}