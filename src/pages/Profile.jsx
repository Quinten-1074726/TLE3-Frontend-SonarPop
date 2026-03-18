import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiSettings, FiLogOut, FiShield } from "react-icons/fi";

import SongCarousel from "../components/Cards & Carousels/SongCarousel.jsx";
import ProfileCarousel from "../components/Cards & Carousels/ProfileCarousel.jsx";
import defaultProfile from "../assets/default-profile.png";
import { getProfilePageData } from "../services/Profile.js";
import { logout } from "../auth/AuthStorage";
import useLikedSongs from "../hooks/useLikedSongs.js";

const mockFriends = [
  {
    id: "friend-1",
    username: "Robbert",
    avatar: "https://placehold.co/200x200?text=Robbert",
  },
  {
    id: "friend-2",
    username: "Jessica",
    avatar: "https://placehold.co/200x200?text=Jessica",
  },
  {
    id: "friend-3",
    username: "Mark",
    avatar: "https://placehold.co/200x200?text=Mark",
  },
];

function Profile() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);

  const {
    likedSongs,
    isLiked,
    toggleLike,
    loading: likedSongsLoading,
  } = useLikedSongs();

  useEffect(() => {
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

        const fetchedFriends = data?.friends || [];

        setFriends(fetchedFriends.length > 0 ? fetchedFriends : mockFriends);
      } catch (err) {
        console.error("Error while loading profile:", err);

        if (!isMounted) return;

        const storedUser = localStorage.getItem("user");
        const parsedUser = storedUser ? JSON.parse(storedUser) : null;

        setUser(parsedUser);
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
  }, []);

  function handleLogout() {
    logout();
    navigate("/login");
  }

  const displayName = user?.username || user?.name || "User";
  const avatar = user?.avatar || user?.profileImage || defaultProfile;
  const isPageLoading = loading || likedSongsLoading;

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
              <p className="text-white/60 text-sm font-semibold">Profile</p>

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
            onClick={() => navigate("/policy")}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-secondary px-4 py-2 text-sm font-bold text-text-primary hover:bg-secondary-hover hover:text-text-inverse focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-background"
          >
            <FiShield aria-hidden="true" />
            <span>AI Policy</span>
          </button>
        </div>

        <div className="mt-8 flex flex-col gap-8">
          {isPageLoading ? (
            <p className="px-6 text-sm text-white/80" aria-live="polite">
              Loading profile...
            </p>
          ) : (
            <>
              <SongCarousel
                title="Your favorites"
                cards={likedSongs}
                emptyText="No favorite songs found yet."
                isLiked={isLiked}
                onToggleLike={toggleLike}
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