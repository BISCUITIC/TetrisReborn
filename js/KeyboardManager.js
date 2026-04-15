export default class KeyboardManager {
  #pressedButtons;

  get pressedBuffer() {
    const result = { ...this.#pressedButtons };

    return result;
  }

  constructor() {
    document.addEventListener("keydown", (event) => this.#keyDown(event));
    document.addEventListener("keyup", (event) => this.#keyUp(event));

    this.#pressedButtons = {
      direction: "",
      speedUp: false,
      rotate: false,
    };
  }

  #keyDown(event) {
    if (event.key === "a") {
      this.#pressedButtons.direction = "left";
    }
    if (event.key === "d") {
      this.#pressedButtons.direction = "right";
    }
    if (event.key === "w") {
      this.#pressedButtons.rotate = true;
    }
    if (event.key === "s") {
      this.#pressedButtons.speedUp = true;
    }
  }

  #keyUp(event) {
    if (event.key === "a" && this.#pressedButtons.direction === "left") {
      this.#pressedButtons.direction = "";
    }
    if (event.key === "d" && this.#pressedButtons.direction === "right") {
      this.#pressedButtons.direction = "";
    }
    if (event.key === "w" && this.#pressedButtons.rotate) {
      this.#pressedButtons.rotate = false;
    }
    if (event.key === "s" && this.#pressedButtons.speedUp) {
      this.#pressedButtons.speedUp = false;
    }
  }
}
