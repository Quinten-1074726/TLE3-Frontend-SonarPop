import {useEffect, useState} from "react";
import TopModal from "../components/toplist/TopModal";
import PageHeader from "../components/ui/PageHeader.jsx";
import { STATISTICS_MOCK } from "../mocks/statisticsMock.js";
import PrimaryButton from "../components/PrimaryButton.jsx";
import notFound from "../assets/Image-not-found.png";
import {useNavigate} from "react-router";

export default function Statistics() {
  //Check if user is logged in by searching JWT token in localstorage
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
    }
  }, []);

  const [openType, setOpenType] = useState(null);

  const items = openType ? STATISTICS_MOCK[openType] : [];

  return (
    <>
      <PageHeader title="Statistics" />

      <div className="grid grid-cols-2 gap-12 mx-6">
        <div className="">
          <p className="text-text-primary py-2 text-xl">Top Artist</p>
          <img src={notFound} alt="Top Artist" className="rounded-xl my-4" />
          <PrimaryButton onClick={() => setOpenType("artist")}>
            Top Artists
          </PrimaryButton>
        </div>

        <div className="">
          <p className="text-text-primary py-2 text-xl">Top Genre</p>
          <img src={notFound} alt="Top Artist" className="rounded-xl my-4" />
          <PrimaryButton onClick={() => setOpenType("genre")}>
            Top Genres
          </PrimaryButton>
        </div>

        <div className="">
          <p className="text-text-primary py-2 text-xl">Top Album</p>
          <img src={notFound} alt="Top Artist" className="rounded-xl my-4" />
          <PrimaryButton onClick={() => setOpenType("album")}>
            Top Albums
          </PrimaryButton>
        </div>

        <div className="">
          <p className="text-text-primary py-2 text-xl">Top Song</p>
          <img src={notFound} alt="Top Artist" className="rounded-xl my-4" />
          <PrimaryButton onClick={() => setOpenType("song")}>
            Top Songs
          </PrimaryButton>
        </div>
      </div>

      {openType && (
        <TopModal
          type={openType}
          items={items}
          onClose={() => setOpenType(null)}
          onSelectItem={(item) => console.log("Clicked item:", item)}
        />
      )}
    </>
  );
}