import Tetramino from "./Tetramino.js";

export default class TetraminoManager {
  #tetraminoBag;
  #colourBag;

  constructor(tetraminoBag, colourBag) {
    this.#tetraminoBag = tetraminoBag;
    this.#colourBag = colourBag;
  }

  generateNext() {
    return new Tetramino(
      5,
      0,
      this.#tetraminoBag.next(),
      this.#colourBag.next(),
    );
  }
}
