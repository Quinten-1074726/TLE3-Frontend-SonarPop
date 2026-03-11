import { apiGet } from "./api.js";

function normalizeSong(track) {
  return {
    id: track.id ?? track.trackId ?? crypto.randomUUID(),
    title: track.title ?? track.name ?? "Unknown track",
    artist: track.artist ?? track.artistName ?? "Unknown artist",
    image:
      track.image ||
      track.cover ||
      track.albumCover ||
      track.artwork ||
      "https://placehold.co/300x300?text=Song",
  };
}

function normalizeFriend(profile) {
  return {
    id: profile.id ?? profile.userId ?? crypto.randomUUID(),
    name: profile.name ?? profile.username ?? "Unknown user",
    avatar:
      profile.avatar ||
      profile.profileImage ||
      profile.image ||
      "https://placehold.co/200x200?text=User",
  };
}

export async function getProfilePageData(userId, token) {
  const [feedback, blacklist] = await Promise.allSettled([
    apiGet(`/feedback/${userId}`, token),
    apiGet(`/blacklist/${userId}`, token),
  ]);

  const favoriteTracks =
    feedback.status === "fulfilled"
      ? Array.isArray(feedback.value)
        ? feedback.value
            .filter((item) => item.liked === true || item.type === "like")
            .slice(0, 10)
            .map((item) => normalizeSong(item.track ?? item))
        : []
      : [];

  const blockedItems =
    blacklist.status === "fulfilled" && Array.isArray(blacklist.value)
      ? blacklist.value
      : [];

  return {
    favoriteTracks,
    blockedItems,
  };
}