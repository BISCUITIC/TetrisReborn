import EventBus from "../../infrastructure/EventBus.js";

export default class ScoreManager {
  #bestScoreKey = "bestScore";

  #points;
  #score;
  #bestScore;

  constructor(points) {
    this.#points = points;

    this.#score = 0;
    this.#bestScore = this.#getBestScore();

    this.#emit("score:ui:update", {
      score: this.#score,
      bestScore: this.#bestScore,
    });

    this.#bindEvents();
  }

  #bindEvents() {
    EventBus.addEvent("game:deleteLine", (linesNumber) => {
      this.#update(linesNumber);
    });

    EventBus.addEvent("game:gameOver", () => {
      this.#finish();
    });
  }

  #update(linesNumber) {
    this.#score += this.#points[linesNumber];

    this.#emit("score:ui:update", {
      score: this.#score,
      bestScore: this.#bestScore,
    });
  }

  #finish() {
    if (this.#score <= this.#bestScore) return;

    this.#bestScore = this.#score;
    this.#setBestScore(this.#bestScore);

    this.#emit("score:ui:update", {
      score: this.#score,
      bestScore: this.#bestScore,
    });

    this.#emit("score:create", {
      value: this.#bestScore,
    });
  }

  #getBestScore() {
    return Number(localStorage.getItem(this.#bestScoreKey)) || 0;
  }

  #setBestScore() {
    localStorage.setItem(this.#bestScoreKey, this.#bestScore);
  }

  #emit(event, payload) {
    EventBus.call(event, payload);
  }
}
