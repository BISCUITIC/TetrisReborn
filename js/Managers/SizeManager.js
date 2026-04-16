export default class SizeMananger {
  static #boardWidth;
  static #boardHeight;

  static #filedWidth;
  static #filedHeight;

  static #blockSize;

  static get blockSize() {
    return SizeMananger.#blockSize;
  }

  static set(canvas, boardWidth, boardHeight) {
    SizeMananger.#filedWidth = canvas.clientWidth;
    SizeMananger.#filedHeight = canvas.clientHeight;

    SizeMananger.#boardWidth = boardWidth;
    SizeMananger.#boardHeight = boardHeight;

    SizeMananger.#calculate();
  }

  static #calculate() {
    const widthMaxSize = Math.floor(this.#filedWidth / this.#boardWidth);
    const heightMaxSize = Math.floor(this.#filedHeight / this.#boardHeight);

    this.#blockSize = Math.min(widthMaxSize, heightMaxSize);
  }
}
