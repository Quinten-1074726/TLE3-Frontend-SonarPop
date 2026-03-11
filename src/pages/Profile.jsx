import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiSettings, FiLogOut, FiShield } from "react-icons/fi";

import SongCarousel from "../components/Cards & Carousels/SongCarousel.jsx";
import ProfileCarousel from "../components/Cards & Carousels/ProfileCarousel.jsx";
import defaultProfile from "../assets/default-profile.png";
import { getProfilePageData } from "../services/Profile.js";

const mockFavoriteSongs = [
    {
        id: "song-1",
        name: "Dromen In Kleur",
        artist: "Suzan & Freek",
        image: "https://placehold.co/300x300?text=Dromen+In+Kleur",
    },
    {
        id: "song-2",
        name: "Blauwe Dag",
        artist: "Suzan & Freek",
        image: "https://placehold.co/300x300?text=Blauwe+Dag",
    },
    {
        id: "song-3",
        name: "De Overkant",
        artist: "Suzan & Freek",
        image: "https://placehold.co/300x300?text=De+Overkant",
    },
    {
        id: "song-4",
        name: "Brabant",
        artist: "Guus Meeuwis",
        image: "https://placehold.co/300x300?text=Brabant",
    },
    {
        id: "song-5",
        name: "Het Is Een Nacht",
        artist: "Guus Meeuwis",
        image: "https://placehold.co/300x300?text=Het+Is+Een+Nacht",
    },
];

const mockFriends = [
    {
        id: "friend-1",
        username: "Rob Petten",
        avatar: "https://placehold.co/200x200?text=Rob",
    },
    {
        id: "friend-2",
        username: "Barend Drecht",
        avatar: "https://placehold.co/200x200?text=Barend",
    },
    {
        id: "friend-3",
        username: "Mark Putte",
        avatar: "https://placehold.co/200x200?text=Mark",
    },
];

function Profile() {
    const navigate = useNavigate();

    const [user, setUser] = useState(null);
    const [favoriteSongs, setFavoriteSongs] = useState([]);
    const [friends, setFriends] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            navigate("/login");
            return;
        }

        let isMounted = true;

        async function loadProfileData() {
            try {
                setLoading(true);

                const storedUser = localStorage.getItem("user");
                const parsedUser = storedUser ? JSON.parse(storedUser) : null;

                if (!isMounted) return;
                setUser(parsedUser);

                const data = await getProfilePageData();

                if (!isMounted) return;

                const fetchedFavoriteSongs = data?.favoriteTracks || [];
                const fetchedFriends = data?.friends || [];

                setFavoriteSongs(
                    fetchedFavoriteSongs.length > 0
                        ? fetchedFavoriteSongs
                        : mockFavoriteSongs
                );

                setFriends(
                    fetchedFriends.length > 0
                        ? fetchedFriends
                        : mockFriends
                );
            } catch (err) {
                console.error("Error while loading profile:", err);

                if (!isMounted) return;

                const storedUser = localStorage.getItem("user");
                const parsedUser = storedUser ? JSON.parse(storedUser) : null;

                setUser(parsedUser);
                setFavoriteSongs(mockFavoriteSongs);
                setFriends(mockFriends);
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        }

        loadProfileData();

        return () => {
            isMounted = false;
        };
    }, [navigate]);

    function handleLogout() {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
    }

    const displayName = user?.username || user?.name || "User";
    const avatar = user?.avatar || user?.profileImage || defaultProfile;

    return (
        <div className="min-h-screen bg-background text-text-primary pb-28">
            <section className="pt-8">
                <div className="px-6">
                    <div className="flex items-start gap-4">
                        <img
                            src={avatar}
                            alt={`${displayName} profile picture`}
                            className="w-28 h-28 rounded-full object-cover shrink-0"
                        />

                        <div className="flex-1 min-w-0 pt-1">
                            <p className="text-white/60 text-sm font-semibold">
                                Profile
                            </p>

                            <h1 className="text-3xl font-bold leading-tight break-words">
                                {displayName}
                            </h1>

                            <div className="mt-5 flex items-center gap-3">
                                <button
                                    type="button"
                                    aria-label="Open settings"
                                    onClick={() => navigate("/preferences")}
                                    className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-white text-lg focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-background"
                                >
                                    <FiSettings />
                                </button>

                                <button
                                    type="button"
                                    onClick={handleLogout}
                                    className="inline-flex items-center gap-2 rounded-full bg-red-700 px-5 py-2 text-sm font-bold text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-background"
                                >
                                    <FiLogOut aria-hidden="true" />
                                    <span>Logout</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-7 border-b border-white/30" />
            </section>

            <main className="pt-5">
                <div className="px-6 flex flex-col gap-2">
                    <button
                        onClick={() => navigate("/preferences")}
                        className="w-full rounded-full bg-primary px-4 py-2 text-sm font-bold text-text-primary hover:bg-primary-hover hover:text-text-inverse focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-background"
                    >
                        Change Preferences
                    </button>

                    <button
                        type="button"
                        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-secondary px-4 py-2 text-sm font-bold text-text-primary hover:bg-secondary-hover hover:text-text-inverse focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-background"
                    >
                        <FiShield aria-hidden="true" />
                        <span>AI Policy</span>
                    </button>
                </div>

                <div className="mt-8 flex flex-col gap-8">
                    {loading ? (
                        <p
                            className="px-6 text-sm text-white/80"
                            aria-live="polite"
                        >
                            Loading profile...
                        </p>
                    ) : (
                        <>
                            <SongCarousel
                                title="Your favorites this week"
                                cards={favoriteSongs}
                                emptyText="No favorite songs found yet."
                            />

                            <ProfileCarousel
                                title="Your Friends"
                                profiles={friends}
                                emptyText="No friends found yet."
                            />
                        </>
                    )}
                </div>
            </main>
        </div>
    );
}

export default Profile;