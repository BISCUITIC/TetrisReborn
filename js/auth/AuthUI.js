import AuthManager from "./AuthManager.js";

class AuthUI {
  constructor() {
    this.button = document.getElementById("authButton");

    this.render();
    this.bind();
  }

  bind() {
    this.button.addEventListener("click", () => {
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
      this.button.textContent = "Logout";
    } else {
      this.button.textContent = "Login";
    }
  }
}

export default new AuthUI();
