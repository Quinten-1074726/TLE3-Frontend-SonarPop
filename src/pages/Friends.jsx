
import {useNavigate} from "react-router-dom";
import {FiSettings, FiLogOut, FiShield} from "react-icons/fi";

import SongCarousel from "../components/Cards & Carousels/SongCarousel.jsx";
import ProfileCarousel from "../components/Cards & Carousels/ProfileCarousel.jsx";

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

function Friends() {
    const navigate = useNavigate()

    return (
        <div className="min-h-screen bg-background text-text-primary pb-28">
            <section className="pt-8">
                <div className="px-6">
                    <div className="flex items-start gap-4">

                        <div className="mt-5 flex items-center gap-3">
                            <button
                                type="button"
                                aria-label="Open settings"
                                onClick={() => navigate("/preferences")}
                                className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-white text-lg focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-background"
                            >
                                <FiSettings/>
                            </button>

                            <button
                                type="button"
                                onClick={handleLogout}
                                className="inline-flex items-center gap-2 rounded-full bg-red-700 px-5 py-2 text-sm font-bold text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-background"
                            >
                                <FiLogOut aria-hidden="true"/>
                                <span>Logout</span>
                            </button>
                        </div>
                    </div>
                </div>
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
                        <FiShield aria-hidden="true"/>
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


                        <ProfileCarousel
                            title="Your Friends"
                            profiles={friends}
                            emptyText="No friends found yet."
                        />

                    )}
                </div>
            </main>
        </div>)
}

export default Friends



