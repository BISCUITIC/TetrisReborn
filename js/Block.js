import SizeMananger from "./Managers/SizeManager.js";

export default class Block {
  #x;
  #y;

  #colour;

  constructor(x, y, colour) {
    this.#x = x;
    this.#y = y;
    this.#colour = colour;
  }

  draw(context) {
    context.fillStyle = this.#colour;
    context.fillRect(
      this.#x * SizeMananger.blockSize,
      this.#y * SizeMananger.blockSize,
      SizeMananger.blockSize,
      SizeMananger.blockSize,
    );
  }
}
