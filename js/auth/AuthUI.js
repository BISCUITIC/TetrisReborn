import EventBus from "../infrastructure/EventBus.js";
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

    EventBus.addEvent("auth:login", () => this.render());
    EventBus.addEvent("auth:logout", () => this.render());
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
