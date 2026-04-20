import Tetramino from "./Tetramino.js";

export default class Game {
  static defaultSpeed = 30;
  static uppedSpeed = 5;
  static keySpeed = 5;

  #keyManager;
  #tetraminoManager;

  #eventBus;

  #board;
  #tetramino;

  #frameCounter;
  #keyCounter;

  #speedUp;

  #gameOver;

  get gameOver() {
    return this.#gameOver;
  }

  get gameSpeed() {
    return this.#speedUp ? Game.uppedSpeed : Game.defaultSpeed;
  }
  get keySpeed() {
    return Game.keySpeed;
  }

  constructor(board, tetraminoManager, keyboardManager, eventBus) {
    this.#tetraminoManager = tetraminoManager;
    this.#keyManager = keyboardManager;

    this.#eventBus = eventBus;

    this.#board = board;
    this.#tetramino = this.#tetraminoManager.next;
    this.#eventBus.call("placeTetramino");

    this.#frameCounter = 0;
    this.#keyCounter = 0;

    this.#speedUp = false;

    this.#gameOver = false;
  }

  update(context) {
    if (this.#keyCounter >= this.keySpeed) {
      this.#keyLogger();
      this.#keyCounter = 0;
    }

    if (this.#frameCounter >= this.gameSpeed) {
      this.#gravity();
      this.#board.update();
      this.#frameCounter = 0;
    }

    this.#board.draw(context);
    this.#tetramino.draw(context);

    this.#frameCounter++;
    this.#keyCounter++;
  }

  #keyLogger() {
    const {
      right: rightPressed,
      left: leftPressed,
      rotate: rotatePressed,
      speedUp: speedUpPressed,
    } = this.#keyManager.pressed;

    const {
      right: rightClicked,
      left: leftClicked,
      rotate: rotateClicked,
      speedUp: speedUpClicked,
    } = this.#keyManager.clicked;

    if (
      (rightPressed || rightClicked) &&
      !leftPressed &&
      this.#hasNoCollision(1, 0, this.#tetramino)
    )
      this.#tetramino.move(1, 0);

    if (
      (leftPressed || leftClicked) &&
      !rightPressed &&
      this.#hasNoCollision(-1, 0, this.#tetramino)
    )
      this.#tetramino.move(-1, 0);

    if (rotateClicked && this.#canRotate()) this.#tetramino.rotate();

    this.#speedUp = speedUpPressed || speedUpClicked;
  }

  #gravity() {
    if (this.#hasNoCollision(0, 1, this.#tetramino)) {
      this.#tetramino.move(0, 1);
    } else {
      this.#placeTetramino();
      this.#tetramino = this.#tetraminoManager.next;
      this.#eventBus.call("placeTetramino");

      if (!this.#hasNoCollision(0, 0, this.#tetramino)) {
        this.#gameOver = true;
      }
    }
  }

  #hasNoCollision(dx, dy, tetramino) {
    const tetraminoX = tetramino.x;
    const tetraminoY = tetramino.y;
    const body = tetramino.body;

    const left = 0;
    const right = this.#board.width;
    const top = 0;
    const bottom = this.#board.height;

    const field = this.#board.field;

    for (let i = 0; i < body.length; i++) {
      for (let j = 0; j < body[i].length; j++) {
        if (body[i][j] === 0) continue;

        if (tetraminoY + i + dy >= bottom) return false;
        if (tetraminoY + i + dy < top) return false;

        if (tetraminoX + j + dx >= right) return false;
        if (tetraminoX + j + dx < left) return false;

        if (field[tetraminoY + i + dy][tetraminoX + j + dx]) return false;
      }
    }

    return true;
  }

  #canRotate() {
    const rotated = new Tetramino(
      this.#tetramino.x,
      this.#tetramino.y,
      this.#tetramino.body.map((row) => [...row]),
      this.#tetramino.colour,
    );

    rotated.rotate();

    return this.#hasNoCollision(0, 0, rotated);
  }

  #placeTetramino() {
    const tetraminoX = this.#tetramino.x;
    const tetraminoY = this.#tetramino.y;
    const body = this.#tetramino.body;

    const field = this.#board.field;

    for (let i = 0; i < body.length; i++) {
      for (let j = 0; j < body[i].length; j++) {
        if (body[i][j] !== 0) {
          field[tetraminoY + i][tetraminoX + j] = body[i][j];
        }
      }
    }
  }
}
