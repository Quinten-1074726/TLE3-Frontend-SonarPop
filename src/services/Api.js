const API_BASE_URL = import.meta.env.VITE_BASE_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

function buildHeaders(token, includeContentType = true) {
    const headers = {};

    if (includeContentType) {
        headers["Content-Type"] = "application/json";
    }

    if (API_KEY) {
        headers["X-API-Key"] = API_KEY;
    }

    if (token) {
        headers["Authorization"] = `Bearer ${token}`;
    }

    return headers;
}

export async function apiGet(path, token) {
    const res = await fetch(`${API_BASE_URL}${path}`, {
        method: "GET",
        headers: buildHeaders(token, false),
    });

    if (!res.ok) {
        throw new Error(`GET ${path} failed: ${res.status}`);
    }

    return res.json();
}

export async function apiPost(path, body, token) {
    const res = await fetch(`${API_BASE_URL}${path}`, {
        method: "POST",
        headers: buildHeaders(token),
        body: JSON.stringify(body),
    });

    if (!res.ok) {
        throw new Error(`POST ${path} failed: ${res.status}`);
    }

    return res.json();
}

export async function apiPut(path, body, token) {
    const res = await fetch(`${API_BASE_URL}${path}`, {
        method: "PUT",
        headers: buildHeaders(token),
        body: JSON.stringify(body),
    });

    if (!res.ok) {
        throw new Error(`PUT ${path} failed: ${res.status}`);
    }

    return res.json();
}

export async function apiDelete(path, token) {
    const res = await fetch(`${API_BASE_URL}${path}`, {
        method: "DELETE",
        headers: buildHeaders(token, false),
    });

    if (!res.ok) {
        throw new Error(`DELETE ${path} failed: ${res.status}`);
    }

    return res.json();
}