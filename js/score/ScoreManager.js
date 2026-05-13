import { ERROR_CODES } from "../api/client.js";
import {
  getLeaderboard as apiGetLeaderboard,
  createScore as apiCreateScore,
} from "../api/score.js";
import EventBus from "../infrastructure/EventBus.js";

class ScoreManager {
  async init() {
    const result = await this.getLeaderboard();

    return result;
  }

  async getLeaderboard() {
    const resultPromise = apiGetLeaderboard();

    resultPromise.then((result) => {
      this.#emit("score:leaderboard", result);
    });

    return resultPromise;
  }

  async submitScore(scsore) {
    const result = await apiCreateScore(scsore);

    this.#emit("score:created", result);

    if (result.success) {
      await this.loadLeaderboard();
    }

    return result;
  }

  #emit(event, payload = null) {
    EventBus.call(event, payload);
  }
}

export default new ScoreManager();
