export default class SizeMananger {
  static #boardWidth;
  static #boardHeight;

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

  static set(body, boardWidth, boardHeight) {
    SizeMananger.#filedWidth = body.clientWidth - 50;
    SizeMananger.#filedHeight = body.clientHeight - 50;

    SizeMananger.#boardWidth = boardWidth;
    SizeMananger.#boardHeight = boardHeight;

    SizeMananger.#calculate();
  }

  static #calculate() {
    const widthMaxSize = this.#filedWidth / this.#boardWidth;
    const heightMaxSize = this.#filedHeight / this.#boardHeight;

    this.#blockSize = Math.floor(Math.min(widthMaxSize, heightMaxSize));

    SizeMananger.#filedWidth = this.#blockSize * this.#boardWidth;
    SizeMananger.#filedHeight = this.#blockSize * this.#boardHeight;
  }
}
