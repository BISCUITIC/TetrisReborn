import Tetramino from "./Tetramino.js";
import KeyboardManager from "./KeyboardManager.js";

export default class Game {
  #keyManager;

  #board;
  #tetraminoBag;
  #colourBag;
  #tetramino;

  #frameCounter;
  #keyCounter;

  get gameSpeed() {
    return this.#keyManager.down ? 10 : 30;
  }
  get keySpeed() {
    return 5;
  }

  constructor(board, tetraminoBag, colourBag) {
    this.#keyManager = new KeyboardManager();

    this.#board = board;
    this.#tetraminoBag = tetraminoBag;
    this.#colourBag = colourBag;
    this.#tetramino = this.#generateNext();

    this.#frameCounter = 0;
    this.#keyCounter = 0;
  }

  update(context) {
    if (this.#keyCounter >= this.keySpeed) {
      this.#keyLogger();
      this.#keyCounter = 0;
    }

    if (this.#frameCounter >= this.gameSpeed) {
      this.#gravity();
      this.#frameCounter = 0;
    }

    this.#board.draw(context);
    this.#tetramino.draw(context);

    this.#frameCounter++;
    this.#keyCounter++;
  }

  #keyLogger() {
    const { left, right } = this.#keyManager;

    if (right && !this.#checkCollision(1, 0)) this.#tetramino.move(1, 0);
    if (left && !this.#checkCollision(-1, 0)) this.#tetramino.move(-1, 0);
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
      5,
      0,
      this.#tetraminoBag.next(),
      this.#colourBag.next(),
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

    for (let i = 0; i < body.length; i++) {
      for (let j = 0; j < body[i].length; j++) {
        if (body[i][j] !== 0) {
          field[tetraminoY + i][tetraminoX + j] = body[i][j];
        }
      }
    }
  }
}
