export default class ScoreManager {
  #points;
  #score;
  #bestScore;

  #scoreUI;
  #bestScoreUI;

  constructor(points, scoreUI, bestScoreUI) {
    this.#points = points;

    this.#scoreUI = scoreUI;
    this.#bestScoreUI = bestScoreUI;

    this.#init();
  }

  update(linesNumber) {
    this.#score += this.#points[linesNumber];

    this.#render();
  }

  save() {
    if (this.#score <= this.#bestScore) return;

    this.#bestScore = this.#score;
    localStorage.setItem("bestScore", this.#bestScore);

    this.#render();
  }

  #init() {
    this.#score = 0;
    this.#bestScore = Number(localStorage.getItem("bestScore")) || 0;

    console.log(this.#bestScore);

    this.#render();
  }

  #render() {
    this.#scoreUI.textContent = this.#score.toString().padStart(5, "0");
    this.#bestScoreUI.textContent = this.#bestScore.toString().padStart(5, "0");
  }
}
