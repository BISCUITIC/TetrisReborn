import AuthManager from "./auth/AuthManager.js";
import { ERROR_CODES } from "./api/client.js";

const form = document.getElementById("registerForm");
const errorBox = document.getElementById("error");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const userName = form.userName.value;
  const password = form.password.value;

  const result = await AuthManager.register(userName, password);

  if (result.success) {
    window.location.href = "/login.html";
  } else {
    switch (result.code) {
      case ERROR_CODES.NETWORK_ERROR:
        errorBox.textContent = "Server is unavailable";
        break;
      default:
        errorBox.textContent = result.error;
    }
  }
});
