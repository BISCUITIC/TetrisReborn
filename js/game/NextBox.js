export default class NextBox {
  #nextTetramino;

  set next(tetramino) {
    this.#nextTetramino = tetramino;
  }

  constructor() {}

  update(context) {
    this.#nextTetramino.draw(context);
  }
}
