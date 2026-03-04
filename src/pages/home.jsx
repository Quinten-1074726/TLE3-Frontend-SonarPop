import Search from "../components/Search.jsx";

function Home() {
  return (
    <>
      <h1 className="text-4xl font-bold">Home</h1>  
        <Search onSearch={(q) => console.log("search:", q)} />
    </>
  );
}

export default Home;