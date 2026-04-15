export default class KeyboardManager {
  #left;
  #right;
  #rotate;
  #speedUp;

  get left() {
    return this.#left;
  }
  get right() {
    return this.#right;
  }
  get rotate() {
    return this.#rotate;
  }
  get speedUp() {
    return this.#speedUp;
  }

  #pressedButtons;

  get pressedBuffer() {
    const result = { ...this.#pressedButtons };

    return result;
  }

  constructor() {
    document.addEventListener("keydown", (event) => this.#keyDown(event));
    document.addEventListener("keyup", (event) => this.#keyUp(event));

    this.#left = false;
    this.#right = false;
    this.#rotate = false;
    this.#speedUp = false;

    this.#pressedButtons = {
      direction: "",
      speedUp: false,
      rotate: false,
    };
  }

  #keyDown(event) {
    if (event.key === "a") this.#left = true;
    if (event.key === "d") this.#right = true;
    if (event.key === "w") this.#rotate = true;
    if (event.key === "s") this.#speedUp = true;
  }

  #keyUp(event) {
    if (event.key === "a" && this.#left) this.#left = false;
    if (event.key === "d" && this.#right) this.#right = false;
    if (event.key === "w" && this.#rotate) this.#rotate = false;
    if (event.key === "s" && this.#speedUp) this.#speedUp = false;
  }
}
