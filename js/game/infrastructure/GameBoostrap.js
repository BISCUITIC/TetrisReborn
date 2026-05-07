import AssetsLoader from "./AssetLoader.js";
import GameFactory from "./GameFactory.js";
import SizeMananger from "./SizeManager.js";

export default class GameBootstrap {
  #contexts;
  #config;
  #ui;

  #runtime;

  #sizeManager;

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

    this.#sizeManager = new SizeMananger(this.#ui.gameElement, this.#config);

    this.#subscribeToEvents();

    this.#resize();
  }

  #subscribeToEvents() {
    window.addEventListener("resize", this.#resize);

    this.#runtime.eventBus.addEvent("placeTetramino", () => {
      this.#runtime.nextBox.next();

      this.#runtime.nextBox.update({
        drawContext: this.#contexts.nextBox,
        sizeManager: this.#sizeManager,
      });
    });

    this.#runtime.eventBus.addEvent("deleteLine", (linesNumber) => {
      this.#runtime.scoreManager.update(linesNumber);
    });

    this.#runtime.eventBus.addEvent("gameOver", () => {
      this.#runtime.scoreManager.save();
    });
  }

  #resize = () => {
    this.#sizeManager.update();

    this.#contexts.gameField.canvas.height = this.#sizeManager.fieldHeight;
    this.#contexts.gameField.canvas.width = this.#sizeManager.fieldWidth;

    this.#contexts.nextBox.canvas.height = this.#sizeManager.nextBoxHeight;
    this.#contexts.nextBox.canvas.width = this.#sizeManager.nextBoxWidth;
  };

  loop = () => {
    if (this.#runtime.game.gameOver) return;

    this.#runtime.game.update({
      drawContext: this.#contexts.gameField,
      sizeManager: this.#sizeManager,
    });

    requestAnimationFrame(this.loop);
  };
}
