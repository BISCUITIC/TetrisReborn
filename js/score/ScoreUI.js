import EventBus from "../infrastructure/EventBus.js";

class ScoreUI {
  #list = document.getElementById("leaderboard-list");
  #error = document.getElementById("leaderboard-error");
  #loading = document.getElementById("leaderboard-loading");

  #score = document.getElementById("score");
  #bestScore = document.getElementById("best-score");

  constructor() {
    this.#bindEvents();
  }

  #bindEvents() {
    EventBus.addEvent("score:leaderboard", (payload) => {
      this.#handleLeaderboard(payload);
    });

    EventBus.addEvent("score:ui:update", (payload) => {
      console.log(payload);
      this.#renderScore(payload.score, payload.bestScore);
    });
  }

  #handleLeaderboard(result) {
    this.#loading.hidden = true;

    if (!result.success) {
      this.#error.textContent = result.error;
      return;
    }

    this.#renderLeaderboard(result.data);
  }

  #renderLeaderboard(scores) {
    this.#list.innerHTML = "";

    for (const score of scores) {
      const li = document.createElement("li");
      li.textContent = `${score.userId} — ${score.value}`;
      this.#list.appendChild(li);
    }
  }

  #renderScore(score, bestScore) {
    this.#score.textContent = score.toString().padStart(5, "0");
    this.#bestScore.textContent = bestScore.toString().padStart(5, "0");
  }
}

export default new ScoreUI();
