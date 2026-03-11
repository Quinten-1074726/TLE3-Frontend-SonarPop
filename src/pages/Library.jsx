import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FiPlus, FiMusic } from "react-icons/fi";

import CreatePlaylistComponent from "../components/CreatePlaylistComponent.jsx";
import PageHeader from "../components/ui/PageHeader.jsx";

const dummyPlaylists = [
    {
        id: "playlist-1",
        title: "Playlist 1",
        subtitle: "Your favorite Dutch pop tracks",
        image: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=500&h=500&auto=format&fit=crop",
    },
    {
        id: "playlist-2",
        title: "Late Night Mix",
        subtitle: "Chill songs for the evening",
        image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=500&h=500&auto=format&fit=crop",
    },
    {
        id: "playlist-3",
        title: "Roadtrip",
        subtitle: "Upbeat songs for onderweg",
        image: "https://images.unsplash.com/photo-1501612780327-45045538702b?q=80&w=500&h=500&auto=format&fit=crop",
    },
    {
        id: "playlist-4",
        title: "Focus Mode",
        subtitle: "Music to stay in the zone",
        image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=500&h=500&auto=format&fit=crop",
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
            <PageHeader title="Your Library" />

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
                    <div className="mb-4">
                        <h2 className="text-text-primary font-bold text-xl">
                            Your playlists
                        </h2>
                        <p className="text-sm text-white/70 mt-1">
                            All your saved playlists in one place.
                        </p>
                    </div>

                    {dummyPlaylists.length === 0 ? (
                        <div className="rounded-2xl border border-white/10 bg-tertiary p-6 text-center">
                            <FiMusic className="mx-auto mb-3 text-2xl text-white/70" />
                            <p className="text-text-primary font-semibold">
                                No playlists yet
                            </p>
                            <p className="text-sm text-white/70 mt-1">
                                Create your first playlist to get started.
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 gap-4">
                            {dummyPlaylists.map((playlist) => (
                                    <Link
                                        key={playlist.id}
                                        to="/playlist"
                                        className="block rounded-2xl p-1 transition hover:opacity-90 focus:outline-none"
                                    >
                                    <img
                                        src={playlist.image}
                                        alt={`${playlist.title} cover`}
                                        className="w-full aspect-square rounded-xl object-cover mb-3"
                                    />

                                    <h3 className="text-text-primary font-bold text-base leading-tight truncate">
                                        {playlist.title}
                                    </h3>

                                    <p className="text-xs text-white/70 mt-1 leading-snug line-clamp-2">
                                        {playlist.subtitle}
                                    </p>
                                </Link>
                            ))}
                        </div>
                    )}
                </section>
            </main>
        </div>
    );
}

export default Library;