import AuthManager from "../auth/AuthManager.js";

const BASE_URL = "https://localhost:7196";

function setResult(success, type, detail = null, errors = null, data = null) {
  return { success, type, detail, errors, data };
}

export const ERROR_TYPES = {
  INVALID_CREDENTIALS: "auth/invalid-credentials",
  REGISTRATION_VALIDATION_FAILED: "auth/register/validation-failed",
  ME_UNAUTHORIZED: "auth/me/unauthorized",
  REQUEST_INVALID: "validation/request-invalid",
  CONNECTION_FAILED: "server/connection-failed",
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

    const payload = await response.json();

    if (!response.ok) {
      return setResult(
        false,
        payload.type,
        payload.detail,
        payload.errors,
        null,
      );
    } else {
      return setResult(true, null, null, null, payload);
    }
  } catch {
    return setResult(
      false,
      ERROR_TYPES.CONNECTION_FAILED,
      "Unable to connect to server",
      null,
      null,
    );
  }
}
