import Board from "./game/Board.js";
import NextBox from "./game/NextBox.js";
import Game from "./game/Game.js";
import Bag from "./game/Bag.js";
import EventBus from "./game/EventBus.js";
import TetraminoManager from "./game/Managers/TetraminoManager.js";
import KeyboardManager from "./game/Managers/KeyboardManager.js";
import SizeMananger from "./game/Managers/SizeManager.js";
import ScoreManager from "./game/Managers/ScoreManager.js";
import GameInit from "./game/GameInit.js";

await GameInit.init();
GameInit.subscribeToEvents();
GameInit.loop();
