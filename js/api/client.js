import AuthManager from "../auth/AuthManager.js";

const BASE_URL = "https://localhost:7196";

function setResult(success, status, error = null, data = null, code = null) {
  return { success, status, error, data, code };
}

export const ERROR_CODES = {
  NETWORK_ERROR: "NETWORK_ERROR",
  UNAUTHORIZED: "UNAUTHORIZED",
  INVALID_CREDENTIALS: "INVALID_CREDENTIALS",
  VALIDATION: "VALIDATION_ERROR",
  SERVER_ERROR: "SERVER_ERROR",
};

export default async function client(url = "/", options = {}) {
  const token = localStorage.getItem("token");

  try {
    const response = await fetch(`${BASE_URL}${url}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
      ...options,
    });

    if (response.status === 401) {
      AuthManager.logout();
      return setResult(
        false,
        response.status,
        "Unauthorized",
        null,
        ERROR_CODES.UNAUTHORIZED,
      );
    }

    if (!response.ok) {
      return setResult(
        false,
        response.status,
        data?.title || "Request failed",
        null,
        ERROR_CODES.REQUEST_ERROR,
      );
    }

    const data = await response.json();
    return setResult(true, response.status, null, data);
  } catch {
    return setResult(
      false,
      0,
      "Unable to connect to server",
      null,
      ERROR_CODES.NETWORK_ERROR,
    );
  }
}
