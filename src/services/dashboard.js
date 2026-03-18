import { apiGet } from "./Api";
import { getToken } from "../auth/AuthStorage";

// Dashboard gebruikt nu alleen echte, veilige systeem/catalogus data.
// Geen user-personalisatie endpoints zoals /feedback, /profile/compute of /recommendations.
//
// TODO backend endpoints voor latere dashboard-uitbreiding:
// - GET /admin/dashboard/overview
// - GET /admin/users
// - GET /admin/logs
// - GET /curator/recommendations/summary
// - GET /curator/interventions

export async function getDashboardBootstrap() {
  const token = getToken();

  const [genresResult, tracksResult, dialResult] = await Promise.allSettled([
    apiGet("/genres", token),
    apiGet("/tracks", token),
    apiGet("/dial", token),
  ]);

  return {
    genres: genresResult.status === "fulfilled" ? genresResult.value : null,
    tracks: tracksResult.status === "fulfilled" ? tracksResult.value : null,
    dial: dialResult.status === "fulfilled" ? dialResult.value : null,
    errors: {
      genres: genresResult.status === "rejected" ? genresResult.reason : null,
      tracks: tracksResult.status === "rejected" ? tracksResult.reason : null,
      dial: dialResult.status === "rejected" ? dialResult.reason : null,
    },
  };
}