import AuthManager from "./AuthManager.js";

class AuthUI {
  #authButton = document.getElementById("authButton");

  constructor() {
    this.render();
    this.bindEvents();
  }

  bindEvents() {
    this.#authButton.addEventListener("click", () => {
      if (AuthManager.isAuthenticated()) {
        AuthManager.logout();
      } else {
        window.location.href = "/login.html";
      }
    });

    window.addEventListener("auth:login", () => this.render());
    window.addEventListener("auth:logout", () => this.render());
  }

  render() {
    if (AuthManager.isAuthenticated()) {
      this.#authButton.textContent = "Logout";
    } else {
      this.#authButton.textContent = "Login";
    }
  }
}

export default new AuthUI();
