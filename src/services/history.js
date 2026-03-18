import { apiGet } from "./Api";
import { getToken } from "../auth/AuthStorage";

export async function getBlacklistHistory() {
  return apiGet("/history/blacklist", getToken());
}

export async function getGenreSliderHistory() {
  return apiGet("/history/genreslider", getToken());
}

export async function getFeedbackHistory() {
  return apiGet("/history/feedback", getToken());
}
