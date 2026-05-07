const API_BASE = "https://localhost:7196";

const getToken = () => localStorage.getItem("token");

export default async function request(url, options = {}) {
  const token = getToken();

  const result = await fetch(`${API_BASE}${url}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
  });

  if (!result.ok) {
    const error = await res.text();
    throw new Error(error || "API error");
  }

  if (res.status === 204) return null;

  return res.json();
}
