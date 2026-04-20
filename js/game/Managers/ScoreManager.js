export default class ScoreManager {
  #points;
  #score;

  #uiElement;

  constructor(points, ui) {
    this.#points = points;
    this.#uiElement = ui;
    this.#score = 0;
  }

  update(linesNumber) {
    this.#score += this.#points[linesNumber];
    this.#uiElement.innerHTML = this.#score;
  }
}
