import { apiGet } from "./Api";
import { getToken } from "../auth/AuthStorage";

export async function fetchStatisticsData() {
  const token = getToken();

  const [feedbackResult, tracksResult, genresResult] = await Promise.allSettled(
    [
      apiGet("/feedback", token),
      apiGet("/tracks", token),
      apiGet("/genres", token),
    ],
  );

  return {
    feedback:
      feedbackResult.status === "fulfilled" ? feedbackResult.value : null,
    tracks: tracksResult.status === "fulfilled" ? tracksResult.value : null,
    genres: genresResult.status === "fulfilled" ? genresResult.value : null,
    errors: {
      feedback:
        feedbackResult.status === "rejected" ? feedbackResult.reason : null,
      tracks: tracksResult.status === "rejected" ? tracksResult.reason : null,
      genres: genresResult.status === "rejected" ? genresResult.reason : null,
    },
  };
}

export function computeStatistics(feedback, tracks, genres) {
  const feedbackList = Array.isArray(feedback)
    ? feedback
    : (feedback?.items ?? []);
  const trackItems = tracks?.items ?? [];
  const genreItems = genres?.items ?? [];

  const trackMap = new Map(trackItems.map((t) => [t._id, t]));
  const genreMap = new Map(genreItems.map((g) => [g.index, g.name]));

  const artistAgg = new Map();
  const genreAgg = new Map();

  const enriched = feedbackList
    .map((f) => {
      const track = trackMap.get(f.trackId);
      if (!track) return null;
      return { ...f, track };
    })
    .filter(Boolean);

  for (const { track, playCount } of enriched) {
    const plays = playCount ?? 0;

    // Aggregate per artist
    const prev = artistAgg.get(track.artist) || { plays: 0, imageUrl: null };
    artistAgg.set(track.artist, {
      plays: prev.plays + plays,
      imageUrl: prev.imageUrl || track.imageUrl || null,
    });

    // Aggregate genre vectors weighted by playCount
    if (Array.isArray(track.genreVector)) {
      for (let i = 0; i < track.genreVector.length; i++) {
        const score = track.genreVector[i] * Math.max(plays, 1);
        genreAgg.set(i, (genreAgg.get(i) || 0) + score);
      }
    }
  }

  const artists = [...artistAgg.entries()]
    .sort((a, b) => b[1].plays - a[1].plays)
    .slice(0, 5)
    .map(([name, data]) => ({
      id: name,
      name,
      subtitle: "Artist",
      value: `${data.plays} plays`,
      valueNumber: data.plays,
      imageUrl: data.imageUrl || "",
    }));

  const genreStats = [...genreAgg.entries()]
    .filter(([i]) => genreMap.has(i))
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([i, score]) => ({
      id: `genre-${i}`,
      name: genreMap.get(i),
      subtitle: "Genre",
      value: `Score: ${Math.round(score)}`,
      valueNumber: Math.round(score),
      imageUrl: "",
    }));

  const liked = enriched
    .filter((e) => e.action === "like")
    .sort((a, b) => (b.playCount ?? 0) - (a.playCount ?? 0))
    .slice(0, 5)
    .map((e) => ({
      id: e.trackId,
      name: e.track.title,
      subtitle: e.track.artist,
      value: `${e.playCount ?? 0} plays`,
      valueNumber: e.playCount ?? 0,
      imageUrl: e.track.imageUrl || "",
    }));

  return { artists, genres: genreStats, liked };
}
