import request from "./client";

export const login = async (userName, password) => {
  const result = await request("/auth/login", {
    method: "POST",
    body: JSON.stringify({ userName, password }),
  });

  localStorage.setItem("token", result.token);
};

export const register = async (userName, password) => {
  await request("/auth/register", {
    method: "POST",
    body: JSON.stringify({ userName, password }),
  });
};

export const logout = () => {
  localStorage.removeItem("token");
};

export const getToken = () => {
  return localStorage.getItem("token");
};

export const isAuthenticated = () => {
  return !!getToken();
};
