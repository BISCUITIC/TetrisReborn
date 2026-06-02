import { ERROR_TYPES } from "../api/client.js";
import {
  getLeaderboard as apiGetLeaderboard,
  createScore as apiCreateScore,
} from "../api/score.js";
import EventBus from "../infrastructure/EventBus.js";

class ScoreManager {
  constructor() {
    this.#bindEvents();
    this.#loadLeaderboard();
  }

  #bindEvents() {
    EventBus.addEvent("score:create", (payload) => {
      this.submitScore(payload.value);
    });
  }

  #loadLeaderboard() {
    const resultPromise = apiGetLeaderboard();

    resultPromise.then((result) => {
      this.#emit("score:leaderboard", result);
    });
  }

  async submitScore(score) {
    const result = await apiCreateScore(score);

    this.#emit("score:created", result);

    if (result.success) {
      this.#loadLeaderboard();
    }

    return result;
  }

  #emit(event, payload = null) {
    EventBus.call(event, payload);
  }
}

export default new ScoreManager();
