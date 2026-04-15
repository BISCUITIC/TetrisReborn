import Board from "./Board.js";
import Tetramino from "./Tetramino.js";
import Game from "./Game.js";
import Bag from "./Bag.js";

const canvas = document.getElementById("game");
const context = canvas.getContext("2d");

const board = new Board(10, 20);
board.draw(context);

const tetraminoS = new Tetramino(
  5,
  0,
  [
    [0, 1, 0],
    [1, 1, 1],
    [0, 0, 0],
  ],
  "rgb(255,255,155)",
);

const bag = new Bag([
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
]);

const game = new Game(board, bag);

function loop() {
  context.clearRect(0, 0, 300, 600);

  game.update(context);

  requestAnimationFrame(loop);
}

loop();
