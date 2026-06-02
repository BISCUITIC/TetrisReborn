import Game from "../core/Game.js";

export default class GameUI {
  #restartButton = document.getElementById("restart-button");
  #pauseButton = document.getElementById("pause-button");

  #pauseButtonSvg = this.#pauseButton.querySelector(".game-menu-icon");

  #game;

  #pauseIcon = `
  <path d="M2 6C2 4.11438 2 3.17157 2.58579 2.58579C3.17157 2 4.11438 2 6 2C7.88562 2 8.82843 2 9.41421 2.58579C10 3.17157 10 4.11438 10 6V18C10 19.8856 10 20.8284 9.41421 21.4142C8.82843 22 7.88562 22 6 22C4.11438 22 3.17157 22 2.58579 21.4142C2 20.8284 2 19.8856 2 18V6Z"/>
  <path d="M14 6C14 4.11438 14 3.17157 14.5858 2.58579C15.1716 2 16.1144 2 18 2C19.8856 2 20.8284 2 21.4142 2.58579C22 3.17157 22 4.11438 22 6V18C22 19.8856 22 20.8284 21.4142 21.4142C20.8284 22 19.8856 22 18 22C16.1144 22 15.1716 22 14.5858 21.4142C14 20.8284 14 19.8856 14 18V6Z"/>
  `;

  #playIcon = `
  <path d="M21.4086 9.35258C23.5305 10.5065 23.5305 13.4935 21.4086 14.6474L8.59662 21.6145C6.53435 22.736 4 21.2763 4 18.9671L4 5.0329C4 2.72368 6.53435 1.26402 8.59661 2.38548L21.4086 9.35258Z"/>
  `;

  constructor(game) {
    this.#game = game;
    this.#bindEvents();
  }

  #bindEvents() {
    this.#restartButton.addEventListener("click", (e) => {
      this.#game.restart();

      this.#pauseButtonSvg.innerHTML = this.#pauseIcon;

      e.currentTarget.blur();
    });

    this.#pauseButton.addEventListener("click", (e) => {
      this.#game.togglePause();

      const isPaused = this.#game.isPaused;

      this.#pauseButtonSvg.innerHTML = isPaused
        ? this.#playIcon
        : this.#pauseIcon;

      e.currentTarget.blur();
    });
  }
}
