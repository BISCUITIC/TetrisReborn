import AuthManager from "./AuthManager.js";

class AuthForms {
  constructor() {
    this.loginForm = document.getElementById("loginForm");
    this.registerForm = document.getElementById("registerForm");

    this.loginBtn = document.getElementById("showLogin");
    this.registerBtn = document.getElementById("showRegister");

    this.errorBox = document.getElementById("authError");

    this.bindEvents();
  }

  bindEvents() {
    this.loginBtn.addEventListener("click", () => {
      this.showLogin();
    });
    this.registerBtn.addEventListener("click", () => {
      this.showRegister();
    });

    this.loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const name = this.loginForm.name.value;
      const password = this.loginForm.password.value;

      await this.handleLogin(name, password);
    });

    this.registerForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const name = this.registerForm.name.value;
      const password = this.registerForm.password.value;

      await this.handleRegister(name, password);
    });
  }

  async handleLogin(name, password) {
    try {
      this.clearError();
      await AuthManager.login(name, password);
    } catch (err) {
      this.showError(err.message);
    }
  }

  async handleRegister(name, password) {
    try {
      this.clearError();
      await AuthManager.register(name, password);
      this.showLogin();
    } catch (err) {
      this.showError(err.message);
    }
  }

  showLogin() {
    this.loginForm.classList.remove("hidden");
    this.registerForm.classList.add("hidden");
  }

  showRegister() {
    this.registerForm.classList.remove("hidden");
    this.loginForm.classList.add("hidden");
  }

  showError(msg) {
    this.errorBox.textContent = msg;
  }

  clearError() {
    this.errorBox.textContent = "";
  }
}

export default new AuthForms();
