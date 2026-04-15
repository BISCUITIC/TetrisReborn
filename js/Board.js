import Block from "./Block.js";

export default class Board {
  #width = 10;
  #height = 20;

  #field;

  get width() {
    return this.#width;
  }

  get height() {
    return this.#height;
  }

  get field() {
    return this.#field;
  }

  constructor(width, height) {
    this.#width = width;
    this.#height = height;

    this.#field = Array.from({ length: this.#height }, () =>
      Array(this.#width).fill(0),
    );
  }

  draw(context) {
    for (let y = 0; y < this.#field.length; y++) {
      for (let x = 0; x < this.#field[y].length; x++) {
        if (this.#field[y][x] !== 0) {
          new Block(x, y, "rgb(255,255,255)").draw(context);
        }
      }
    }
  }
}
