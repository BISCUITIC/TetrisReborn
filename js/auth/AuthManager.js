import {
  login as apiLogin,
  register as apiRegister,
  me as apiMe,
} from "../api/auth.js";

class AuthManager {
  #tokenKey = "token";
  #userIdKey = "id";

  #setToken(token) {
    localStorage.setItem(this.#tokenKey, token);
  }

  #setUserId(id) {
    localStorage.setItem(this.#userIdKey, id);
  }

  async init() {
    const token = this.getToken();

    if (token) {
      try {
        const user = await this.Me();
        return user;
      } catch {
        this.logout();
        return null;
      }
      window.dispatchEvent(new Event("auth:ready"));
    } else {
      window.dispatchEvent(new Event("auth:ready"));
      return null;
    }
  }

  async Me() {
    const result = await apiMe();

    this.#setUserId(result.id);

    window.dispatchEvent(new Event("auth:login"));

    return result;
  }

  async login(name, password) {
    const result = await apiLogin(name, password);

    this.#setToken(result.token);
    this.#setUserId(result.id);

    window.dispatchEvent(new Event("auth:login"));

    return result;
  }

  async register(name, password) {
    return await apiRegister(name, password);
  }

  logout() {
    localStorage.removeItem(this.#tokenKey);
    localStorage.removeItem(this.#userIdKey);

    window.dispatchEvent(new Event("auth:logout"));
  }

  isAuthenticated() {
    return !!this.getToken();
  }

  getToken() {
    return localStorage.getItem(this.#tokenKey);
  }

  getUserId() {
    return localStorage.getItem(this.#userIdKey);
  }
}

export default new AuthManager();
