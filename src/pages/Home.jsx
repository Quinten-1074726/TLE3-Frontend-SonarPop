import PrimaryButton from "../components/PrimaryButton.jsx";

function Home() {
  return (
    <>
      <h1 className="text-4xl font-bold">Home</h1>
      <p className="mt-4 text-black ">
        Welkom bij SonarPOP.
      </p>
        <PrimaryButton> primary button</PrimaryButton>
    </>
  );
}

export default Home;