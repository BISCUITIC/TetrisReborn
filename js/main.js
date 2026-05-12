import GameBootstrap from "./game/infrastructure/GameBoostrap.js";
import AuthManager from "./auth/AuthManager.js";
import AuthUI from "./auth/AuthUI.js";

const user = await AuthManager.init();

const gameInit = await GameBootstrap.create();
gameInit.loop();
