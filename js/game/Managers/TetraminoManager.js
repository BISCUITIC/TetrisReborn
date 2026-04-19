import Tetramino from "../Tetramino.js";

export default class TetraminoManager {
  #tetraminoBag;
  #colourBag;

  #width;
  #height;

  constructor(tetraminoBag, colourBag, width, height) {
    this.#tetraminoBag = tetraminoBag;
    this.#colourBag = colourBag;

    this.#width = width;
    this.#height = height;
  }

  get first() {
    return new Tetramino(
      0,
      0,
      this.#tetraminoBag.first(),
      this.#colourBag.first(),
    );
  }

  get next() {
    return new Tetramino(
      Math.floor(this.#width / 2 - this.#tetraminoBag.first().length / 2),
      0,
      this.#tetraminoBag.next(),
      this.#colourBag.next(),
    );
  }
}
