import Tetramino from "./Tetramino.js";
import KeyboardManager from "./KeyboardManager.js";

export default class Game {
  #keyManager;

  #board;
  #tetramino;

  #frameCounter;
  #speedMode;

  get gameSpeed() {
    if (this.#speedMode) return 10;
    else return 30;
  }

  constructor(board, tetramino) {
    this.#keyManager = new KeyboardManager();
    // document.addEventListener("keydown", (event) => this.#keyLogger(event));

    this.#board = board;
    this.#tetramino = tetramino;

    this.#frameCounter = 0;
    this.#speedMode = false;
  }

  update(context) {
    this.#keyLogger();

    if (this.#frameCounter >= this.gameSpeed) {
      this.#gravity();
      this.#frameCounter = 0;
    }

    this.#board.draw(context);
    this.#tetramino.draw(context);

    this.#speedMode = false;
    this.#frameCounter++;
  }

  #keyLogger(event) {
    if (this.#keyManager.right) {
      if (!this.#checkCollision(1, 0)) this.#tetramino.move(1, 0);
    }
    if (this.#keyManager.left) {
      if (!this.#checkCollision(-1, 0)) this.#tetramino.move(-1, 0);
    }
    if (this.#keyManager.down) {
      this.#speedMode = true;
    }
  }

  #gravity() {
    if (this.#checkCollision(0, 1)) {
      this.#placeTetramino();
      this.#tetramino = this.#generateNext();
    } else {
      this.#tetramino.move(0, 1);
    }
  }

  #generateNext() {
    return new Tetramino(
      0,
      0,
      [
        [0, 1, 0],
        [1, 1, 1],
        [0, 0, 0],
      ],
      "rgb(255,255,155)",
    );
  }

  #checkCollision(dx, dy) {
    let tetraminoX = this.#tetramino.x;
    let tetraminoY = this.#tetramino.y;
    let body = this.#tetramino.body;

    let left = 0;
    let right = this.#board.width;
    let top = 0;
    let bottom = this.#board.height;

    let field = this.#board.field;

    for (let i = 0; i < body.length; i++) {
      for (let j = 0; j < body[i].length; j++) {
        if (body[i][j] === 0) continue;

        if (tetraminoY + i + dy >= bottom) return true;
        if (tetraminoY + i + dy < top) return true;

        if (tetraminoX + j + dx >= right) return true;
        if (tetraminoX + j + dx < left) return true;

        if (field[tetraminoY + i + dy][tetraminoX + j + dx]) return true;
      }
    }

    return false;
  }

  #placeTetramino() {
    let tetraminoX = this.#tetramino.x;
    let tetraminoY = this.#tetramino.y;
    let body = this.#tetramino.body;

    let field = this.#board.field;

    console.log(body);
    console.log(field);

    for (let i = 0; i < body.length; i++) {
      for (let j = 0; j < body[i].length; j++) {
        if (body[i][j] !== 0) {
          field[tetraminoY + i][tetraminoX + j] = body[i][j];
        }
      }
    }
  }
}
