import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import SongCarousel from "../components/Cards & Carousels/SongCarousel.jsx";
import ProfileCarousel from "../components/Cards & Carousels/ProfileCarousel.jsx";

import defaultProfile from "../assets/default-profile.png";
import { apiGet } from "../services/Api.js";

function Profile() {
    const navigate = useNavigate();

    const [favoriteSongs, setFavoriteSongs] = useState([]);
    const [friends, setFriends] = useState([]);
    const [loading, setLoading] = useState(true);

    const token = localStorage.getItem("token");

    const user = useMemo(() => {
        try {
            const storedUser = localStorage.getItem("user");
            return storedUser ? JSON.parse(storedUser) : null;
        } catch (err) {
            console.error("Kon user niet parsen uit localStorage:", err);
            return null;
        }
    }, []);

    const userId = user?.id || user?.userId || null;
    const displayName = user?.username || user?.name || "Gebruiker";
    const avatar = user?.avatar || user?.profileImage || defaultProfile;

    useEffect(() => {
        async function loadProfileData() {
            try {
                setLoading(true);

                if (userId && token) {
                    const feedbackData = await apiGet(`/feedback/${userId}`, token);

                    if (Array.isArray(feedbackData)) {
                        const mappedSongs = feedbackData.map((item, index) => ({
                            id: item?.id || item?.trackId || index,
                            name: item?.track?.name || item?.name || "Not Found",
                            artist: item?.track?.artist || item?.artist || "Not Found",
                            image:
                                item?.track?.image ||
                                item?.track?.cover ||
                                item?.image ||
                                item?.avatar ||
                                null,
                        }));

                        setFavoriteSongs(mappedSongs);
                    } else {
                        setFavoriteSongs([]);
                    }
                } else {
                    // Tijdelijke mock songs als user/token er nog niet zijn
                    setFavoriteSongs([
                        {
                            id: 1,
                            name: "Hypnotize",
                            artist: "Notorious B.I.G",
                            image: null,
                        },
                        {
                            id: 2,
                            name: "Dromen in kleur",
                            artist: "Suzan & Freek",
                            image: null,
                        },
                        {
                            id: 3,
                            name: "Hypnotize",
                            artist: "Notorious B.I.G",
                            image: null,
                        },
                    ]);
                }

                // Tijdelijke mock friends
                setFriends([
                    {
                        id: 1,
                        username: "Rob Jetten",
                        avatar: "https://placehold.co/200x200?text=Rob",
                    },
                    {
                        id: 2,
                        username: "Tom Berendsen",
                        avatar: "https://placehold.co/200x200?text=Tom",
                    },
                    {
                        id: 3,
                        username: "Mark Rutte",
                        avatar: "https://placehold.co/200x200?text=Mark",
                    },
                ]);
            } catch (err) {
                console.error("Fout bij ophalen profieldata:", err);

                // fallback zodat je layout gewoon zichtbaar blijft
                setFavoriteSongs([
                    {
                        id: 1,
                        name: "Hypnotize",
                        artist: "Notorious B.I.G",
                        image: null,
                    },
                    {
                        id: 2,
                        name: "Dromen in kleur",
                        artist: "Suzan & Freek",
                        image: null,
                    },
                    {
                        id: 3,
                        name: "Hypnotize",
                        artist: "Notorious B.I.G",
                        image: null,
                    },
                ]);

                setFriends([
                    {
                        id: 1,
                        username: "Rob Jetten",
                        avatar: "https://placehold.co/200x200?text=Rob",
                    },
                    {
                        id: 2,
                        username: "Tom Berendsen",
                        avatar: "https://placehold.co/200x200?text=Tom",
                    },
                    {
                        id: 3,
                        username: "Mark Rutte",
                        avatar: "https://placehold.co/200x200?text=Mark",
                    },
                ]);
            } finally {
                setLoading(false);
            }
        }

        loadProfileData();
    }, [userId, token]);

    function handleLogout() {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/");
    }

    return (
        <div className="min-h-screen bg-background text-text-primary pb-28">
            <section className="pt-8">
                <div className="px-8">
                    <div className="flex items-start gap-4">
                        <img
                            src={avatar}
                            alt={displayName}
                            className="w-28 h-28 rounded-full object-cover shrink-0"
                        />

                        <div className="flex-1 min-w-0 pt-1">
                            <p className="text-white/40 text-sm font-semibold">Profile</p>

                            <h1 className="text-3xl font-bold leading-tight break-words">
                                {displayName}
                            </h1>

                            <div className="mt-5 flex items-center gap-3">
                                <button
                                    type="button"
                                    aria-label="Settings"
                                    onClick={() => navigate("/preferences")}
                                    className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-white text-lg font-bold"
                                >
                                    ⚙
                                </button>

                                <button
                                    type="button"
                                    onClick={handleLogout}
                                    className="rounded-full bg-red-700 px-5 py-2 text-base font-bold text-white"
                                >
                                    Logout
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-7 border-b border-white/30" />
            </section>

            <main className="pt-6">
                <div className="px-8 flex flex-col gap-4">
                    <button
                        onClick={() => navigate("/preferences")}
                        className="w-full rounded-full bg-primary px-4 py-3 font-bold text-text-primary transition hover:bg-primary-hover hover:text-text-inverse"
                    >
                        Change Preferences
                    </button>

                    <button
                        type="button"
                        className="w-full rounded-full bg-secondary px-4 py-3 font-bold text-text-primary transition hover:bg-secondary-hover hover:text-text-inverse"
                    >
                        AI Policy
                    </button>
                </div>

                <div className="mt-8">
                    {loading ? (
                        <p className="px-8 text-sm text-white/70">Profiel laden...</p>
                    ) : (
                        <>
                            <SongCarousel
                                title="Your favorites this week"
                                cards={favoriteSongs}
                            />

                            <div className="mt-8">
                                <ProfileCarousel
                                    title="Your Friends"
                                    profiles={friends}
                                />
                            </div>
                        </>
                    )}
                </div>
            </main>
        </div>
    );
}

export default Profile;