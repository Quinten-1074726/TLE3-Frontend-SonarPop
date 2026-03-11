import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FiPlus } from "react-icons/fi";

import CreatePlaylistComponent from "../components/CreatePlaylistComponent.jsx";
import ProfileCarousel from "../components/Cards & Carousels/ProfileCarousel.jsx";
import SongCarousel from "../components/Cards & Carousels/SongCarousel.jsx";
import PageHeader from "../components/ui/PageHeader.jsx";

const cardsTitle = "Because you like Dutch pop";

const dummyCards = [
  {
    id: "rec-1",
    name: "Als Het Avond Is",
    artist: "Suzan & Freek",
    image: "https://placehold.co/300x300?text=Als+Het+Avond+Is",
  },
  {
    id: "rec-2",
    name: "Zij Weet Het",
    artist: "Tino Martin",
    image: "https://placehold.co/300x300?text=Zij+Weet+Het",
  },
  {
    id: "rec-3",
    name: "Samen Voor Altijd",
    artist: "Marco Borsato",
    image: "https://placehold.co/300x300?text=Samen+Voor+Altijd",
  },
  {
    id: "rec-4",
    name: "Stiekem",
    artist: "Maan & Goldband",
    image: "https://placehold.co/300x300?text=Stiekem",
  },
  {
    id: "rec-5",
    name: "Lichtje Branden",
    artist: "Suzan & Freek",
    image: "https://placehold.co/300x300?text=Lichtje+Branden",
  },
];

const profileTitle = "Friends you may know";

const dummyProfiles = [
    {
        id: "lib-friend-1",
        username: "Rob Petten",
        avatar: "https://placehold.co/200x200?text=Rob",
    },
    {
        id: "lib-friend-2",
        username: "Barend Drecht",
        avatar: "https://placehold.co/200x200?text=Barend",
    },
    {
        id: "lib-friend-3",
        username: "Mark Putte",
        avatar: "https://placehold.co/200x200?text=Mark",
    },
];

function Library() {
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            navigate("/login");
        }
    }, [navigate]);

    const openModal = () => setShowModal(true);
    const closeModal = () => setShowModal(false);

    return (
        <div className="min-h-screen bg-background text-text-primary pb-28">
            <PageHeader title="Library" />

            <main className="pt-4 flex flex-col gap-8">
                <div className="px-4">
                    <button
                        type="button"
                        onClick={openModal}
                        className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 font-bold text-text-primary hover:bg-primary-hover hover:text-text-inverse focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-background"
                    >
                        <FiPlus aria-hidden="true" />
                        <span>Create Playlist</span>
                    </button>
                </div>

                <CreatePlaylistComponent isOpen={showModal} onClose={closeModal} />

                <section className="px-4">
                    <p className="text-text-primary font-bold text-xl mb-4">
                        Your playlist
                    </p>

                    <Link
                        to="/playlist"
                        className="block rounded-2xl bg-tertiary border border-white/10 p-4 hover:border-white/20 transition"
                    >
                        <div className="flex items-center gap-4">
                            <img
                                className="h-24 w-24 rounded-xl object-cover shrink-0"
                                alt="Playlist cover"
                                src="https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=500&h=500&auto=format&fit=crop"
                            />

                            <div className="min-w-0">
                                <h2 className="text-text-primary font-bold text-lg truncate">
                                    Playlist 1
                                </h2>
                                <p className="text-sm text-white/70 mt-1">
                                    A mix of your saved favorites and recent discoveries.
                                </p>
                            </div>
                        </div>
                    </Link>
                </section>

                <SongCarousel
                    title={cardsTitle}
                    cards={dummyCards}
                    emptyText="No songs found yet."
                />

                <ProfileCarousel
                    title={profileTitle}
                    profiles={dummyProfiles}
                    emptyText="No profiles found yet."
                />
            </main>
        </div>
    );
}

export default Library;