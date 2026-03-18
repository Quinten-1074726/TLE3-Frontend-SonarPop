import { apiGet, apiPost, apiPatch } from "./Api";
import { getToken } from "../auth/AuthStorage";

export async function getAdminConfig() {
  const token = getToken();

  try {
    return await apiGet("/admin/config", token);
  } catch (err) {
    if (err.status === 404) {
      const customError = new Error(
        "Admin config endpoint bestaat nog niet op de huidige backend."
      );
      customError.status = 404;
      throw customError;
    }
    throw err;
  }
}

export async function updateAdminConfig(payload) {
  const token = getToken();

  try {
    return await apiPatch("/admin/config", payload, token);
  } catch (err) {
    throw err;
  }
}

export async function resetAdminConfig() {
  const token = getToken();

  try {
    return await apiPost("/admin/config/reset", {}, token);
  } catch (err) {
    throw err;
  }
}

export async function getAdminExplain(trackId, userId) {
  const token = getToken();
  return apiGet(`/admin/explain/${trackId}?userId=${encodeURIComponent(userId)}`, token);
}