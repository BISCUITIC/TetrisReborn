import GameBootstrap from "./game/infrastructure/GameBootstrap.js";
import AuthUI from "./auth/AuthUI.js";
import ScoreUI from "./score/ScoreUI.js";
import GameUI from "./game/ui/GameUI.js";

import AuthManager from "./auth/AuthManager.js";
import ScoreManager from "./score/ScoreManager.js";

await AuthManager.init();

const gameInit = await GameBootstrap.create();
gameInit.loop();
