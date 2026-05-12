import {
  login as apiLogin,
  register as apiRegister,
  me as apiMe,
} from "../api/auth.js";

class AuthManager {
  #tokenKey = "token";
  #userIdKey = "userId";

  isAuthenticated() {
    return !!this.getToken();
  }
  getToken() {
    return localStorage.getItem(this.#tokenKey);
  }
  getUserId() {
    return localStorage.getItem(this.#userIdKey);
  }

  #setToken(token) {
    localStorage.setItem(this.#tokenKey, token);
  }
  #setUserId(id) {
    localStorage.setItem(this.#userIdKey, id);
  }
  #clear() {
    localStorage.removeItem(this.#tokenKey);
    localStorage.removeItem(this.#userIdKey);
  }

  async init() {
    const token = this.getToken();
    if (!token)
      return {
        success: false,
        status: 401,
        error: "Unauthorized",
      };

    const result = await this.me();
    if (!result.success) this.logout();

    return result;
  }

  async me() {
    const result = await apiMe();

    if (result.success) {
      this.#setUserId(result.data.id);
    }

    return result;
  }

  async login(name, password) {
    const result = await apiLogin(name, password);

    if (result.success) {
      this.#setToken(result.data.token);
      this.#setUserId(result.data.id);

      this.#emit("auth:login");
    }

    return result;
  }

  async register(name, password) {
    const result = await apiRegister(name, password);

    if (result.success) {
      this.#emit("auth:register");
    }

    return result;
  }

  logout() {
    const wasAuthenticated = this.isAuthenticated();

    this.#clear();

    if (!wasAuthenticated) this.#emit("auth:logout");
  }

  #emit(event) {
    window.dispatchEvent(new Event(event));
  }
}

export default new AuthManager();
