import EventBus from "./EventBus.js";
import KeyboardManager from "../managers/KeyboardManager.js";
import ScoreManager from "../managers/ScoreManager.js";
import TetraminoManager from "../managers/TetraminoManager.js";
import Board from "../core/Board.js";
import NextBox from "../core/NextBox.js";
import Game from "../core/Game.js";
import Bag from "../core/Bag.js";
export default class GameFactory {
  static create(config, assets, ui) {
    const eventBus = new EventBus();

    const tetraminoManager = new TetraminoManager(
      new Bag(assets.tetraminos),
      new Bag(assets.colours),
      config.boardWidth,
      config.boardHeight,
    );

    const keyboardManager = new KeyboardManager();

    const scoreManager = new ScoreManager(
      assets.points,
      ui.scoreElement,
      ui.bestScoreElement,
    );

    const board = new Board(config.boardWidth, config.boardHeight);

    const nextBox = new NextBox(
      tetraminoManager,
      config.nextBoxWidth,
      config.nextBoxHeight,
    );

    const game = new Game(board, tetraminoManager, keyboardManager, eventBus);

    return {
      game,
      nextBox,
      scoreManager,
      keyboardManager,
      tetraminoManager,
      board,
      eventBus,
    };
  }
}
