import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiSettings, FiLogOut, FiShield } from "react-icons/fi";

import SongCarousel from "../components/Cards & Carousels/SongCarousel.jsx";
import ProfileCarousel from "../components/Cards & Carousels/ProfileCarousel.jsx";
import defaultProfile from "../assets/default-profile.png";
import { getProfilePageData } from "../services/Profile.js";

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

                setFavoriteSongs(data.favoriteTracks || []);
                setFriends(data.friends || []);
            } catch (err) {
                console.error("Fout bij laden van profiel:", err);

                if (!isMounted) return;
                setUser(null);
                setFavoriteSongs([]);
                setFriends([]);
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

    const displayName = user?.username || user?.name || "Gebruiker";
    const avatar = user?.avatar || user?.profileImage || defaultProfile;

    return (
        <div className="min-h-screen bg-background text-text-primary pb-28">
            <section className="pt-8">
                <div className="px-6">
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
                                    onClick={() => navigate("/settings")}
                                    className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-white text-lg"
                                >
                                    <FiSettings />
                                </button>

                                <button
                                    type="button"
                                    onClick={handleLogout}
                                    className="inline-flex items-center gap-2 rounded-full bg-red-700 px-5 py-2 text-sm font-bold text-white"
                                >
                                    <FiLogOut />
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
                        className="w-full rounded-full bg-primary px-4 py-1.5 text-sm font-bold text-text-primary"
                    >
                        Change Preferences
                    </button>

                    <button
                        type="button"
                        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-secondary px-4 py-1.5 text-sm font-bold text-text-primary"
                    >
                        <FiShield />
                        <span>AI Policy</span>
                    </button>
                </div>

                <div className="mt-8 flex flex-col gap-8">
                    {loading ? (
                        <p className="px-6 text-sm text-white/70">Profiel laden...</p>
                    ) : (
                        <>
                            <SongCarousel
                                title="Your favorites this week"
                                cards={favoriteSongs}
                            />

                            <ProfileCarousel
                                title="Your Friends"
                                profiles={friends}
                            />
                        </>
                    )}
                </div>
            </main>
        </div>
    );
}

export default Profile;