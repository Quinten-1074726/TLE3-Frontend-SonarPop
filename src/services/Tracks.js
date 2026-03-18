import { apiGet } from "./Api";

function getToken() {
  return localStorage.getItem("token");
}

export async function getTracks() {
  const data = await apiGet("/tracks", getToken());

  if (Array.isArray(data)) {
    return data;
  }

  if (Array.isArray(data?.items)) {
    return data.items;
  }

  if (Array.isArray(data?.tracks)) {
    return data.tracks;
  }

  return [];
}