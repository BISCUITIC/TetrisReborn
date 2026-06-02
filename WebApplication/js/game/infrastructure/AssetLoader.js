export default class AssetsLoader {
  static async load() {
    const [tetraminos, colours, points] = await Promise.all([
      AssetsLoader.#loadJson("./js/game/assets/tetraminos.json"),
      AssetsLoader.#loadJson("./js/game/assets/colours.json"),
      AssetsLoader.#loadJson("./js/game/assets/points.json"),
    ]);

    return {
      tetraminos,
      colours,
      points,
    };
  }

  static async #loadJson(path) {
    const response = await fetch(path);

    if (!response.ok) {
      throw new Error(`Cannot load ${path}`);
    }

    return response.json();
  }
}
