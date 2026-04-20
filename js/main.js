import Board from "./game/Board.js";
import NextBox from "./game/NextBox.js";
import Game from "./game/Game.js";
import Bag from "./game/Bag.js";
import EventBus from "./game/EventBus.js";
import TetraminoManager from "./game/Managers/TetraminoManager.js";
import KeyboardManager from "./game/Managers/KeyboardManager.js";
import SizeMananger from "./game/Managers/SizeManager.js";

const gameElement = document.getElementById("game");

const fieldCanvas = document.getElementById("field");
const fieldContext = fieldCanvas.getContext("2d");

const nextBoxCanvas = document.getElementById("nextBox");
const nextBoxContext = nextBoxCanvas.getContext("2d");

const width = 10;
const height = 20;

const nextBoxWidth = 5;
const nextBoxHeight = 5;

resize();
window.addEventListener("resize", resize);

const eventBus = new EventBus();

const board = new Board(width, height);

const tetraminoBag = new Bag([
  [
    [0, 1, 0],
    [1, 1, 1],
    [0, 0, 0],
  ],
  [
    [1, 1, 0],
    [0, 1, 1],
    [0, 0, 0],
  ],
  [
    [0, 1, 1],
    [1, 1, 0],
    [0, 0, 0],
  ],
  [
    [0, 1, 0, 0],
    [0, 1, 0, 0],
    [0, 1, 0, 0],
    [0, 1, 0, 0],
  ],
  [
    [1, 1],
    [1, 1],
  ],
  [
    [0, 1, 0],
    [0, 1, 0],
    [0, 1, 1],
  ],
  [
    [0, 1, 0],
    [0, 1, 0],
    [1, 1, 0],
  ],
]);

const colourBag = new Bag([
  "rgb(0, 255, 255)",
  "rgb(255, 255, 0)",
  "rgb(128, 0, 128)",
  "rgb(0, 255, 0)",
  "rgb(255, 0, 0)",
  "rgb(0, 0, 255)",
  "rgb(255, 165, 0)",
]);

const tetraminoManager = new TetraminoManager(
  tetraminoBag,
  colourBag,
  width,
  height,
);
const keyboardManager = new KeyboardManager();

const nextBox = new NextBox(tetraminoManager, nextBoxWidth, nextBoxHeight);
eventBus.addEvent("placeTetramino", () => {
  nextBox.next();

  nextBoxContext.clearRect(
    0,
    0,
    SizeMananger.nextBoxWidth,
    SizeMananger.nextBoxHeight,
  );

  nextBox.update(nextBoxContext);
});

const game = new Game(board, tetraminoManager, keyboardManager, eventBus);

function resize() {
  SizeMananger.set(gameElement, width, height, nextBoxWidth, nextBoxHeight);

  fieldCanvas.height = SizeMananger.fieldHeight;
  fieldCanvas.width = SizeMananger.fieldWidth;

  nextBoxCanvas.height = SizeMananger.nextBoxHeight;
  nextBoxCanvas.width = SizeMananger.nextBoxWidth;
}

function loop() {
  if (game.gameOver) return;

  fieldContext.clearRect(
    0,
    0,
    SizeMananger.fieldWidth,
    SizeMananger.fieldHeight,
  );

  game.update(fieldContext);

  requestAnimationFrame(loop);
}

loop();
