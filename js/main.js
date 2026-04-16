import Board from "./Board.js";
import Game from "./Game.js";
import Bag from "./Bag.js";
import TetraminoManager from "./Managers/TetraminoManager.js";
import KeyboardManager from "./Managers/KeyboardManager.js";
import SizeMananger from "./Managers/SizeManager.js";

const filedCanvas = document.getElementById("game");
const filedContext = filedCanvas.getContext("2d");

const width = 10;
const height = 20;

SizeMananger.set(filedCanvas, width, height);

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

const tetraminoManager = new TetraminoManager(tetraminoBag, colourBag);
const keyboardManager = new KeyboardManager();

const game = new Game(board, tetraminoManager, keyboardManager);

function loop() {
  filedContext.clearRect(0, 0, 300, 600);

  game.update(filedContext);

  requestAnimationFrame(loop);
}

loop();
