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

  update() {
    let numberDeletedRows = 0;

    let y = this.#height - 1;
    while (y >= 0) {
      let needToDelete = true;

      for (let x = 0; x < this.#width; x++) {
        if (this.#field[y][x] === 0) {
          needToDelete = false;
          break;
        }
      }

      if (needToDelete) {
        this.#deleteRow(y);
        numberDeletedRows++;
      } else {
        y--;
      }
    }

    return numberDeletedRows;
  }

  #deleteRow(index) {
    for (let y = index; y >= 1; y--) {
      for (let x = 0; x < this.#width; x++) {
        this.#field[y][x] = this.#field[y - 1][x];
      }
    }

    for (let x = 0; x < this.#width; x++) {
      this.#field[0][x] = 0;
    }
  }

  draw(context) {
    for (let y = 0; y < this.#height; y++) {
      for (let x = 0; x < this.#width; x++) {
        if (this.#field[y][x] !== 0) {
          new Block(x, y, "rgb(255,255,255)").draw(context);
        }
      }
    }
  }
}
