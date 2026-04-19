export default class SizeMananger {
  static #boardWidth;
  static #boardHeight;

  static #nextBoxWidth;
  static #nextBoxHeight;

  static #filedWidth;
  static #filedHeight;

  static #blockSize;

  static get blockSize() {
    return SizeMananger.#blockSize;
  }

  static get fieldWidth() {
    return SizeMananger.#filedWidth;
  }

  static get fieldHeight() {
    return SizeMananger.#filedHeight;
  }

  static get nextBoxWidth() {
    return SizeMananger.#nextBoxWidth;
  }

  static get nextBoxHeight() {
    return SizeMananger.#nextBoxHeight;
  }

  static set(body, boardWidth, boardHeight, nextBoxWidth, nextBoxHeight) {
    SizeMananger.#filedWidth = body.clientWidth;
    SizeMananger.#filedHeight = body.clientHeight;

    SizeMananger.#boardWidth = boardWidth;
    SizeMananger.#boardHeight = boardHeight;

    SizeMananger.#nextBoxWidth = nextBoxWidth;
    SizeMananger.#nextBoxHeight = nextBoxHeight;

    SizeMananger.#calculate();
  }

  static #calculate() {
    const widthMaxSize =
      this.#filedWidth / (this.#boardWidth + this.#nextBoxWidth);
    const heightMaxSize = this.#filedHeight / this.#boardHeight;

    this.#blockSize = Math.floor(Math.min(widthMaxSize, heightMaxSize));

    SizeMananger.#filedWidth = this.#blockSize * this.#boardWidth;
    SizeMananger.#filedHeight = this.#blockSize * this.#boardHeight;

    SizeMananger.#nextBoxWidth = this.#blockSize * this.#nextBoxWidth;
    SizeMananger.#nextBoxHeight = this.#blockSize * this.#nextBoxHeight;
  }
}
