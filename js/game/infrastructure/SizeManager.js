export default class SizeMananger {
  #body;
  #config;

  #blockSize;

  get blockSize() {
    return this.#blockSize;
  }

  get fieldWidth() {
    return this.#blockSize * this.#config.boardWidth;
  }

  get fieldHeight() {
    return this.#blockSize * this.#config.boardHeight;
  }

  get nextBoxWidth() {
    return this.#blockSize * this.#config.nextBoxWidth;
  }

  get nextBoxHeight() {
    return this.#blockSize * this.#config.nextBoxHeight;
  }

  constructor(body, config) {
    this.#body = body;
    this.#config = config;

    this.#calculate();
  }

  #calculate() {
    const clientWidth = this.#body.clientWidth;
    const clientHeight = this.#body.clientHeight;

    const gameSpaceWidth = this.#config.boardWidth + this.#config.nextBoxWidth;
    const gameSpaceHeight = this.#config.boardHeight;

    const blockWidthMaxSize = clientWidth / gameSpaceWidth;
    const blockHeightMaxSize = clientHeight / gameSpaceHeight;

    this.#blockSize = Math.floor(
      Math.min(blockWidthMaxSize, blockHeightMaxSize),
    );
  }
}
