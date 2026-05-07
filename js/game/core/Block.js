import SizeMananger from "../infrastructure/SizeManager.js";

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
    context.drawContext.fillStyle = this.#colour;
    context.drawContext.fillRect(
      this.#x * context.sizeManager.blockSize,
      this.#y * context.sizeManager.blockSize,
      context.sizeManager.blockSize,
      context.sizeManager.blockSize,
    );
  }
}
