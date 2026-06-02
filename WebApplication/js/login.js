import AuthManager from "./auth/AuthManager.js";

const form = document.getElementById("loginForm");
const errorBox = document.getElementById("error");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const userName = form.userName.value;
  const password = form.password.value;

  const result = await AuthManager.login(userName, password);

  if (result.success) {
    window.location.href = "/index.html";
  } else {
    errorBox.textContent = getErrorMessage(result);
  }
});

function getErrorMessage(result) {
  if (result.detail) return result.detail;

  const firstKey = Object.keys(result.errors)[0];

  if (!firstKey) return "Unknown error";

  return result.errors[firstKey][0];
}
