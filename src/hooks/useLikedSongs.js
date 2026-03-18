import { useCallback, useEffect, useState } from "react";
import { getFeedback, likeTrack, removeTrackFeedback } from "../services/Feedback";
import { getTracks } from "../services/Tracks";

function normalizeTrack(track) {
  const trackId = track?.id || track?._id;

  return {
    id: trackId,
    name: track?.name || track?.title || "Unknown song",
    artist: track?.artist || track?.artistName || "Unknown artist",
    imageUrl: track?.imageUrl || track?.image || null,
    previewUrl: track?.previewUrl || track?.preview_url || track?.src || null,
    album: track?.album || null,
  };
}

export default function useLikedSongs() {
  const [likedSongs, setLikedSongs] = useState([]);
  const [likedSongIds, setLikedSongIds] = useState(new Set());
  const [loading, setLoading] = useState(true);

  const loadLikedSongs = useCallback(async () => {
    try {
      setLoading(true);

      const [feedbackResponse, tracksResponse] = await Promise.all([
        getFeedback(),
        getTracks(),
      ]);

      const feedbackItems = Array.isArray(feedbackResponse)
        ? feedbackResponse
        : Array.isArray(feedbackResponse?.items)
          ? feedbackResponse.items
          : Array.isArray(feedbackResponse?.feedback)
            ? feedbackResponse.feedback
            : [];

      const likedFeedback = feedbackItems.filter(
        (item) => item?.action === "like" && item?.trackId
      );

      const likedIds = new Set(likedFeedback.map((item) => item.trackId));

      const normalizedLikedSongs = tracksResponse
        .map((track) => {
          const normalized = normalizeTrack(track);
          return normalized;
        })
        .filter((track) => likedIds.has(track.id));

      setLikedSongIds(likedIds);
      setLikedSongs(normalizedLikedSongs);
    } catch (error) {
      console.error("Failed to load liked songs:", error);
      setLikedSongs([]);
      setLikedSongIds(new Set());
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadLikedSongs();
  }, [loadLikedSongs]);

  const isLiked = useCallback(
    (trackId) => {
      if (!trackId) return false;
      return likedSongIds.has(trackId);
    },
    [likedSongIds]
  );

  const toggleLike = useCallback(
    async (track) => {
      const normalizedTrack = normalizeTrack(track);
      const trackId = normalizedTrack.id;

      if (!trackId) {
        console.warn("Track heeft geen id, like kan niet worden opgeslagen.");
        return;
      }

      const alreadyLiked = likedSongIds.has(trackId);

      if (alreadyLiked) {
        await removeTrackFeedback(trackId);

        setLikedSongIds((prev) => {
          const next = new Set(prev);
          next.delete(trackId);
          return next;
        });

        setLikedSongs((prev) => prev.filter((song) => song.id !== trackId));
        return;
      }

      await likeTrack(trackId);

      setLikedSongIds((prev) => new Set(prev).add(trackId));

      setLikedSongs((prev) => {
        const exists = prev.some((song) => song.id === trackId);
        if (exists) return prev;
        return [normalizedTrack, ...prev];
      });
    },
    [likedSongIds]
  );

  return {
    likedSongs,
    likedSongIds,
    isLiked,
    toggleLike,
    loading,
    reloadLikedSongs: loadLikedSongs,
  };
}