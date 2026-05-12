import GameBootstrap from "./game/infrastructure/GameBoostrap.js";
import AuthManager from "./auth/AuthManager.js";
import AuthUI from "./auth/AuthUI.js";
import AuthForms from "./auth/AuthForms.js";

await AuthManager.init();

const gameInit = await GameBootstrap.create();
gameInit.loop();
