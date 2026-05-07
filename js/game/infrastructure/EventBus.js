export default class EventBus {
  #listeners;

  constructor() {
    this.#listeners = {};
  }

  addEvent(event, callback) {
    if (!this.#listeners[event]) {
      this.#listeners[event] = [];
    }

    this.#listeners[event].push(callback);
  }

  deleteEvent(event, callback) {
    if (!this.#listeners[event]) return;

    this.#listeners[event] = this.#listeners[event].filter(
      (func) => func !== callback,
    );
  }

  call(event, ...data) {
    if (!this.#listeners[event]) return;

    this.#listeners[event].forEach((callback) => {
      callback(...data);
    });
  }
}
