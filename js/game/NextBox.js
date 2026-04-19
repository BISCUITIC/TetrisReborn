import Tetramino from "./Tetramino.js";

export default class NextBox {
  #tetraminoManager;
  #realBodyNextTetramino;

  #width;
  #height;

  next() {
    this.#countPosition(this.#tetraminoManager.first);
  }

  constructor(tetraminoManager, width, height) {
    this.#tetraminoManager = tetraminoManager;
    this.next();

    this.#width = width;
    this.#height = height;
  }

  update(context) {
    this.#realBodyNextTetramino.draw(context);
  }

  #countPosition(nextTetramino) {
    let body = nextTetramino.body.map((row) => {
      return [...row];
    });

    let row = 0;
    while (row < body.length) {
      let isEmptyRow = true;

      for (let column = 0; column < body[row].length; column++) {
        if (body[row][column] !== 0) {
          isEmptyRow = false;
          break;
        }
      }

      if (isEmptyRow) {
        body.splice(row, 1);
      } else {
        row++;
      }
    }

    let column = 0;
    while (column < body[0].length) {
      let isEmptyColumn = true;

      for (let row = 0; row < body.length; row++) {
        if (body[row][column] !== 0) {
          isEmptyColumn = false;
          break;
        }
      }

      if (isEmptyColumn) {
        body = body.map((row) => {
          row.splice(column, 1);
          return [...row];
        });
      } else {
        column++;
      }
    }

    const x = this.#width / 2 - body[0].length / 2;
    const y = this.#height / 2 - body.length / 2;

    this.#realBodyNextTetramino = new Tetramino(
      x,
      y,
      body,
      nextTetramino.colour,
    );
  }
}
