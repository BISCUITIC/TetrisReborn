import AuthManager from "./AuthManager.js";

class AuthUI {
  constructor() {
    this.auth = document.getElementById("auth");

    this.syncInitialState();

    this.bindEvents();
  }

  bindEvents() {
    window.addEventListener("auth:login", () => {
      this.hide();
    });

    window.addEventListener("auth:logout", () => {
      this.show();
    });
  }

  syncInitialState() {
    if (AuthManager.isAuthenticated()) {
      this.hide();
    } else {
      this.show();
    }
  }

  show() {
    this.auth.classList.remove("hidden");
  }

  hide() {
    console.log("ADS");
    this.auth.classList.add("hidden");
  }
}

export default new AuthUI();
