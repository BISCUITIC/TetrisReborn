import GameBootstrap from "./game/infrastructure/GameBoostrap.js";

const gameInit = await GameBootstrap.create();
gameInit.loop();
