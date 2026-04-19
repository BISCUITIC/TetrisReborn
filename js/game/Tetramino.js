import Block from "./Block.js";

export default class Tetramino {
  #x;
  #y;

  #body;
  #colour;

  get x() {
    return this.#x;
  }

  get y() {
    return this.#y;
  }

  get body() {
    return this.#body;
  }

  get colour() {
    return this.#colour;
  }

  constructor(x, y, body, colour) {
    this.#x = x;
    this.#y = y;
    this.#body = body;
    this.#colour = colour;
  }

  draw(context) {
    for (let row = 0; row < this.#body.length; row++) {
      for (let column = 0; column < this.#body[row].length; column++) {
        if (this.#body[row][column] !== 0) {
          new Block(this.#x + column, this.#y + row, this.#colour).draw(
            context,
          );
        }
      }
    }
  }

  move(dx, dy) {
    this.#x += dx;
    this.#y += dy;
  }

  rotate() {
    const base = this.#body.map((row) => [...row]);
    this.#body = this.#body.map((row) => row.map((el) => 0));

    const module = this.#body.length - 1;

    for (let row = 0; row < this.#body.length; row++) {
      for (let column = 0; column < this.#body[row].length; column++) {
        if (base[row][column] !== 0) {
          this.#body[
            column + module > module
              ? (column + module) % module
              : column + module
          ][row] = 1;
        }
      }
    }
  }
}
