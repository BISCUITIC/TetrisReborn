import AuthManager from "../auth/AuthManager.js";

const BASE_URL = "https://localhost:7196";

export default async function client(url = "/", options = {}) {
  const token = localStorage.getItem("token");

  const result = await fetch(`${BASE_URL}${url}`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
    ...options,
  });

  if (result.status === 401) {
    AuthManager.logout();
    throw new Error("Unauthorized");
  }

  if (!result.ok) {
    const error = await response.text();
    throw new Error(error || "Request failed");
  }

  return result.json();
}
