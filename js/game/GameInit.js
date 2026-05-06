import Board from "./Board.js";
import NextBox from "./NextBox.js";
import Game from "./Game.js";
import Bag from "./Bag.js";
import EventBus from "./EventBus.js";
import TetraminoManager from "./Managers/TetraminoManager.js";
import KeyboardManager from "./Managers/KeyboardManager.js";
import SizeMananger from "./Managers/SizeManager.js";
import ScoreManager from "./Managers/ScoreManager.js";

export default class GameInit {
  static #boardWidth = 10;
  static #boardHeight = 20;

  static #nextBoxWidth = 5;
  static #nextBoxHeight = 5;

  static #fieldCanvas = document.getElementById("field");
  static #fieldContext = GameInit.#fieldCanvas.getContext("2d");

  static #nextBoxCanvas = document.getElementById("nextBox");
  static #nextBoxContext = GameInit.#nextBoxCanvas.getContext("2d");

  static #scoreElement = document.getElementById("score");
  static #bestScoreElement = document.getElementById("best-score");
  static #gameElement = document.getElementById("game");

  static #eventBus = new EventBus();
  static #nextBox;
  static #game;

  static #tetraminoManager;
  static #keyboardManager;
  static #scoreManager;

  static async init() {
    const tetraminoBag = new Bag(
      await fetch("./js/game/assets/tetraminos.json")
        .then((response) => response.json())
        .catch((error) => console.error("Ошибка:", error)),
    );
    const colourBag = new Bag(
      await fetch("./js/game/assets/colours.json")
        .then((response) => response.json())
        .catch((error) => console.error("Ошибка:", error)),
    );
    const points = await fetch("./js/game/assets/points.json")
      .then((response) => response.json())
      .catch((error) => console.error("Ошибка:", error));

    GameInit.#tetraminoManager = new TetraminoManager(
      tetraminoBag,
      colourBag,
      GameInit.#boardWidth,
      GameInit.#boardHeight,
    );
    GameInit.#scoreManager = new ScoreManager(
      points,
      GameInit.#scoreElement,
      GameInit.#bestScoreElement,
    );
    GameInit.#keyboardManager = new KeyboardManager();

    const board = new Board(GameInit.#boardWidth, GameInit.#boardHeight);

    GameInit.#nextBox = new NextBox(
      GameInit.#tetraminoManager,
      GameInit.#nextBoxWidth,
      GameInit.#nextBoxHeight,
    );
    GameInit.#game = new Game(
      board,
      GameInit.#tetraminoManager,
      GameInit.#keyboardManager,
      GameInit.#eventBus,
    );

    GameInit.resize();
  }

  static subscribeToEvents() {
    window.addEventListener("resize", GameInit.resize);

    GameInit.#eventBus.addEvent("placeTetramino", () => {
      GameInit.#nextBox.next();

      GameInit.#nextBoxContext.clearRect(
        0,
        0,
        SizeMananger.nextBoxWidth,
        SizeMananger.nextBoxHeight,
      );

      GameInit.#nextBox.update(GameInit.#nextBoxContext);
    });

    GameInit.#eventBus.addEvent("deleteLine", (linesNumber) => {
      GameInit.#scoreManager.update(linesNumber);
    });

    GameInit.#eventBus.addEvent("gameOver", () => {
      GameInit.#scoreManager.save();
    });
  }

  static resize() {
    SizeMananger.set(
      GameInit.#gameElement,
      GameInit.#boardWidth,
      GameInit.#boardHeight,
      GameInit.#nextBoxWidth,
      GameInit.#nextBoxHeight,
    );

    GameInit.#fieldCanvas.height = SizeMananger.fieldHeight;
    GameInit.#fieldCanvas.width = SizeMananger.fieldWidth;

    GameInit.#nextBoxCanvas.height = SizeMananger.nextBoxHeight;
    GameInit.#nextBoxCanvas.width = SizeMananger.nextBoxWidth;
  }

  static loop() {
    if (GameInit.#game.gameOver) return;

    GameInit.#fieldContext.clearRect(
      0,
      0,
      SizeMananger.fieldWidth,
      SizeMananger.fieldHeight,
    );

    GameInit.#game.update(GameInit.#fieldContext);

    requestAnimationFrame(GameInit.loop);
  }
}
