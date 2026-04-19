export default class KeyboardManager {
  #clicked;
  #pressed;

  get clicked() {
    const result = { ...this.#clicked };

    this.#clicked = {
      left: false,
      right: false,
      rotate: false,
      speedUp: false,
    };

    return result;
  }

  get pressed() {
    const result = { ...this.#pressed };

    return result;
  }

  constructor() {
    document.addEventListener("keydown", (event) => this.#keyDown(event));
    document.addEventListener("keyup", (event) => this.#keyUp(event));

    this.#pressed = {
      left: false,
      right: false,
      speedUp: false,
      rotate: false,
    };

    this.#clicked = {
      left: false,
      right: false,
      rotate: false,
      speedUp: false,
    };
  }

  #keyDown(event) {
    if (event.repeat) return;

    if (event.code === "KeyA") {
      this.#pressed.left = true;
      this.#clicked.left = true;
    }
    if (event.code === "KeyD") {
      this.#pressed.right = true;
      this.#clicked.right = true;
    }
    if (event.code === "KeyW" || event.code === "Space") {
      this.#pressed.rotate = true;
      this.#clicked.rotate = true;
    }
    if (event.code === "KeyS") {
      this.#pressed.speedUp = true;
      this.#clicked.speedUp = true;
    }
  }

  #keyUp(event) {
    if (event.code === "KeyA" && this.#pressed.left) this.#pressed.left = false;
    if (event.code === "KeyD" && this.#pressed.right)
      this.#pressed.right = false;
    if (
      event.code === "KeyW" ||
      (event.code === "Space" && this.#pressed.rotate)
    )
      this.#pressed.rotate = false;
    if (event.code === "KeyS" && this.#pressed.speedUp)
      this.#pressed.speedUp = false;
  }
}
