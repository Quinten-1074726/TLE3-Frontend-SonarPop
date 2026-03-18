import { apiDelete, apiGet, apiPost } from "./Api";

function getToken() {
  return localStorage.getItem("token");
}

export async function getFeedback() {
  return apiGet("/feedback", getToken());
}

export async function likeTrack(trackId) {
  return apiPost(
    "/feedback",
    {
      trackId,
      action: "like",
    },
    getToken()
  );
}

export async function dislikeTrack(trackId) {
  return apiPost(
    "/feedback",
    {
      trackId,
      action: "dislike",
    },
    getToken()
  );
}

export async function removeTrackFeedback(trackId) {
  return apiDelete(`/feedback/${trackId}`, getToken());
}