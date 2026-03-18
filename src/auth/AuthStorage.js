export function getToken() {
  return localStorage.getItem("token");
}

export function getStoredUser() {
  try {
    return JSON.parse(localStorage.getItem("user") || "null");
  } catch {
    return null;
  }
}

export function isLoggedIn() {
  return Boolean(getToken());
}

export function getUserRole() {
  const user = getStoredUser();

  if (user?.role) return user.role;

  if (user?.username === "admin") return "admin";
  if (user?.username === "curator") return "curator";

  return "user";
}

export function storeSession(token, user) {
  localStorage.setItem("token", token);

  if (user) {
    localStorage.setItem("user", JSON.stringify(user));
  } else {
    localStorage.removeItem("user");
  }
}

export function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
}