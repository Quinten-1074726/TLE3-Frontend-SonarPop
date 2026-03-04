import Search from "../components/search";

export default function Home() {
    return (
        <div className="space-y-6">
            <h1 className="h1">Home</h1>
            <Search onSearch={(q) => console.log("search:", q)} />
        </div>
    );
}