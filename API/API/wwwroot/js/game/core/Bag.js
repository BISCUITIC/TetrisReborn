export default class Bag {
  #original;
  #data;

  get shuffled() {
    return this.#data;
  }

  constructor(data) {
    this.#original = [...data];
    this.#data = [];

    this.#shuffle();
  }

  #shuffle() {
    this.#data = [...this.#original];

    let j = 0;
    for (let i = 0; i < this.#data.length; i++) {
      j = Math.floor(Math.random() * this.#data.length);

      [this.#data[i], this.#data[j]] = [this.#data[j], this.#data[i]];
    }
  }

  first() {
    if (this.#data.length === 0) this.#shuffle();

    return this.#data[this.#data.length - 1];
  }

  next() {
    if (this.#data.length === 0) this.#shuffle();

    return this.#data.pop();
  }
}
