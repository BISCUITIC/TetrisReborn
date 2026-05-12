import client from "./client.js";

export async function login(name, password) {
  const LoginRequest = {
    userName: name,
    password: password,
  };

  const result = await client("/auth/login", {
    method: "POST",
    body: JSON.stringify(LoginRequest),
  });

  return result;
}

export async function register(name, password) {
  const RegisterRequest = {
    userName: name,
    password: password,
  };

  const result = await client("/auth/register", {
    method: "POST",
    body: JSON.stringify(RegisterRequest),
  });

  return result;
}

export async function me() {
  const result = client("/auth/me", {
    method: "GET",
  });

  return result;
}
