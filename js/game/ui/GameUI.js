// import EventBus from "../infrastructure/EventBus.js";
import Game from "../core/Game.js";

export default class GameUI {
  #restartButton = document.getElementById("restart-button");
  #pauseButton = document.getElementById("pause-button");

  #game;

  constructor(game) {
    this.#game = game;
    this.#bindEvents();
  }

  #bindEvents() {
    this.#restartButton.addEventListener("click", () => {
      console.log("restart");
    });

    this.#pauseButton.addEventListener("click", () => {
      console.log("pause");
      this.#game.togglePause();
    });
  }
}

// new GameUI();
