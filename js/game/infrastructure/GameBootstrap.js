import AssetsLoader from "./AssetLoader.js";
import GameFactory from "./GameFactory.js";
import SizeMananger from "./SizeManager.js";
import EventBus from "../../infrastructure/EventBus.js";

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
      gameElement: document.getElementById("game"),
    };

    this.#sizeManager = new SizeMananger(this.#ui.gameElement, this.#config);

    this.#runtime = GameFactory.create(
      this.#config,
      assets,
      this.#ui,
      this.#contexts,
      this.#sizeManager,
    );

    this.#bindEvents();

    this.#resize();
  }

  #bindEvents() {
    window.addEventListener("resize", this.#resize);
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
