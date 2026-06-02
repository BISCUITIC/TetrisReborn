import AssetsLoader from "./AssetLoader.js";
import GameFactory from "./GameFactory.js";
import SizeMananger from "./SizeManager.js";
import EventBus from "../../infrastructure/EventBus.js";
import GameUI from "../ui/GameUI.js";

export default class GameBootstrap {
  #contexts;
  #config;
  #ui;

  #runtime;

  #sizeManager;

  #gameUI;

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
      nextBox: document.getElementById("next-box").getContext("2d"),
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

    this.#gameUI = new GameUI(this.#runtime.game);

    this.#bindEvents();

    this.#resize();

    this.#emit("game:init");
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

  #emit(event, payload) {
    EventBus.call(event, payload);
  }

  loop = () => {
    if (this.#runtime.game.gameOver) return;

    this.#runtime.game.update({
      drawContext: this.#contexts.gameField,
      sizeManager: this.#sizeManager,
    });

    requestAnimationFrame(this.loop);
  };
}
