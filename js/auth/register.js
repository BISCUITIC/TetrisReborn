import { login } from "../api/auth.js";

const form = document.getElementById("loginForm");
const errorBox = document.getElementById("error");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const userName = form.userName.value;
  const password = form.password.value;

  try {
    const result = await login(userName, password);

    localStorage.setItem("token", result.token);
    localStorage.setItem("userId", result.id);

    window.location.href = "/index.html";
  } catch (err) {
    errorBox.textContent = err.message;
  }
});
