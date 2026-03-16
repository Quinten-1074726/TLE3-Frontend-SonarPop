import { apiGet, apiPost } from "./Api";
import { getToken } from "../auth/AuthStorage";

export async function getDashboardBootstrap() {
  const token = getToken();

  const [genres, tracks, dial] = await Promise.allSettled([
    apiGet("/genres", token),
    apiGet("/tracks", token),
    apiGet("/dial", token),
  ]);

  return {
    genres: genres.status === "fulfilled" ? genres.value : null,
    tracks: tracks.status === "fulfilled" ? tracks.value : null,
    dial: dial.status === "fulfilled" ? dial.value : null,
  };
}

export async function getRecommendationsPreview(profileVector, dialPosition = 3) {
  const token = getToken();

  return apiPost(
    "/recommendations",
    {
      profileVector,
      limit: 10,
      offset: 0,
      dial: dialPosition,
    },
    token
  );
}

export async function computeProfile(weights = {}) {
  const token = getToken();
  return apiPost("/profile/compute", { weights }, token);
}

export async function getFeedbackList() {
  const token = getToken();
  return apiGet("/feedback", token);
}