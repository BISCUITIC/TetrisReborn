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
    if (event.key === "a") {
      this.#left = true;
      console.log("a");
    }
    if (event.key === "d") {
      this.#right = true;
      console.log("d");
    }
    if (event.key === "w") {
      this.#up = true;
      console.log("w");
    }
    if (event.key === "s") {
      this.#down = true;
      console.log("s");
    }
  }

  #keyUp(event) {
    if (event.key === "a") {
      this.#left = false;
      console.log("a");
    }
    if (event.key === "d") {
      this.#right = false;
      console.log("d");
    }
    if (event.key === "w") {
      this.#up = false;
      console.log("w");
    }
    if (event.key === "s") {
      this.#down = false;
      console.log("s");
    }
  }
}
