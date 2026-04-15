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
    this.#left = false;
    this.#right = false;
    this.#up = false;
    this.#down = false;
  }

  #keyDown(event) {
    if (event.key === "a") this.#left = true;
    if (event.key === "d") this.#right = true;
    if (event.key === "w") this.#up = true;
    if (event.key === "s") this.#down = true;
  }

  #keyUp(event) {
    if (event.key === "a") this.#left = false;
    if (event.key === "d") this.#right = false;
    if (event.key === "w") this.#up = false;
    if (event.key === "s") this.#down = false;
  }
}
