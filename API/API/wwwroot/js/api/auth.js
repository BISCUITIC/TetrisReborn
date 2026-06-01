import client from "./client.js";

export async function login(name, password) {
  const loginRequest = {
    userName: name,
    password: password,
  };

  const result = await client("/auth/login", {
    method: "POST",
    body: JSON.stringify(loginRequest),
  });

  return result;
}

export async function register(name, password) {
  const registerRequest = {
    userName: name,
    password: password,
  };

  const result = await client("/auth/register", {
    method: "POST",
    body: JSON.stringify(registerRequest),
  });

  return result;
}

export async function me() {
  const result = client("/auth/me", {
    method: "GET",
  });

  return result;
}
