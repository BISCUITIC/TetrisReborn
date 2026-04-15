export default class KeyboardManager {
  #left;
  #right;
  #up;
  #down;

  get left() {
    return this.#left;
  }
  get right() {
    return this.#right;
  }
  get up() {
    return this.#up;
  }
  get down() {
    return this.#down;
  }

  constructor() {
    document.addEventListener("keydown", (event) => this.#keyDown(event));
    document.addEventListener("keyup", (event) => this.#keyUp(event));
    this.#left = true;
    this.#right = true;
    this.#down = true;
    this.#up = true;
  }

  #keyDown(event) {
    if (event.key === "a") this.#left = true;
    if (event.key === "d") this.#right = true;
    if (event.key === "w") this.#down = true;
    if (event.key === "s") this.#up = true;
  }

  #keyUp(event) {
    if (event.key === "a") this.#left = false;
    if (event.key === "d") this.#right = false;
    if (event.key === "w") this.#down = false;
    if (event.key === "s") this.#up = false;
  }
}
