export default class Block {
  static width = 20;
  static height = 20;

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
      this.#x * Block.width,
      this.#y * Block.height,
      Block.width,
      Block.height,
    );
  }
}
