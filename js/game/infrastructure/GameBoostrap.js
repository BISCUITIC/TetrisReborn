import AssetsLoader from "./AssetLoader.js";
import GameFactory from "./GameFactory.js";
import SizeMananger from "./SizeManager.js";

export default class GameBootstrap {
  #contexts;
  #config;
  #ui;

  #runtime;

  static async create() {
    const game = new GameBootstrap();

    await game.init();

    return game;
  }

  constructor() {}

  async init() {
    const assets = await AssetsLoader.load();

    this.#contexts = {
      gameField: document.getElementById("field").getContext("2d"),
      nextBox: document.getElementById("nextBox").getContext("2d"),
    };

    this.#config = {
      boardWidth: 10,
      boardHeight: 20,
      nextBoxWidth: 5,
      nextBoxHeight: 5,
    };

    this.#ui = {
      scoreElement: document.getElementById("score"),
      bestScoreElement: document.getElementById("best-score"),
      gameElement: document.getElementById("game"),
    };

    this.#runtime = GameFactory.create(this.#config, assets, this.#ui);

    this.#subscribeToEvents();

    this.#resize();
  }

  #subscribeToEvents() {
    window.addEventListener("resize", this.#resize);

    this.#runtime.eventBus.addEvent("placeTetramino", () => {
      this.#runtime.nextBox.next();

      this.#contexts.nextBox.clearRect(
        0,
        0,
        SizeMananger.nextBoxWidth,
        SizeMananger.nextBoxHeight,
      );

      this.#runtime.nextBox.update(this.#contexts.nextBox);
    });

    this.#runtime.eventBus.addEvent("deleteLine", (linesNumber) => {
      this.#runtime.scoreManager.update(linesNumber);
    });

    this.#runtime.eventBus.addEvent("gameOver", () => {
      this.#runtime.scoreManager.save();
    });
  }

  #resize = () => {
    SizeMananger.set(
      this.#ui.gameElement,
      this.#config.boardWidth,
      this.#config.boardHeight,
      this.#config.nextBoxWidth,
      this.#config.nextBoxHeight,
    );

    this.#contexts.gameField.canvas.height = SizeMananger.fieldHeight;
    this.#contexts.gameField.canvas.width = SizeMananger.fieldWidth;

    this.#contexts.nextBox.canvas.height = SizeMananger.nextBoxHeight;
    this.#contexts.nextBox.canvas.width = SizeMananger.nextBoxWidth;
  };

  loop = () => {
    if (this.#runtime.game.gameOver) return;

    this.#contexts.gameField.clearRect(
      0,
      0,
      SizeMananger.fieldWidth,
      SizeMananger.fieldHeight,
    );

    this.#runtime.game.update(this.#contexts.gameField);

    requestAnimationFrame(this.loop);
  };
}
