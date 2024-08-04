import Pokedex from "./Pokedex";

import RnbEncounterData from "./rnb/EncounterData";
import RnbSplitData from "./rnb/SplitData";

import SsEncounterData from "./EncounterData";
import SsSplitData from "./SplitData";
import SsEvoData from "./EvoData";
import SsPokedex from "./SsPokedex";

class DataManager {
  static GAMES = Object.freeze({
    STERLINGSILVER: Symbol("ss"),
    RUNANDBUN: Symbol("rnb"),
  });
  static ss = this.GAMES.STERLINGSILVER;
  static rnb = this.GAMES.RUNANDBUN;

  static game = this.GAMES.STERLINGSILVER;

  static GetGameName() {
    switch (DataManager.game) {
      case this.GAMES.RUNANDBUN:
        return "Run and Bun";
      case this.GAMES.STERLINGSILVER:
        return "Sterling Silver";
    }
  }

  static GetEncounterData() {
    switch (DataManager.game) {
      case this.GAMES.RUNANDBUN:
        return RnbEncounterData;
      case this.GAMES.STERLINGSILVER:
        return SsEncounterData;
    }

    return null;
  }

  static GetEvoData() {
    switch (DataManager.game) {
      case this.GAMES.STERLINGSILVER:
        return SsEvoData;
    }
  }

  static GetSplitData() {
    switch (DataManager.game) {
      case this.GAMES.RUNANDBUN:
        return RnbSplitData;
      case this.GAMES.STERLINGSILVER:
        return SsSplitData;
    }
  }

  static GetMon(name) {
    switch (DataManager.game) {
      case this.GAMES.RUNANDBUN:
        return Pokedex[name];
      case this.GAMES.STERLINGSILVER:
        var mon = SsPokedex.poks[name];
        if (!mon) {
          const hyphenIndex = name.indexOf("-");
          const newName =
            name.slice(0, hyphenIndex + 1) +
            name.charAt(hyphenIndex + 1).toUpperCase() +
            name.slice(hyphenIndex + 2);
          mon = SsPokedex.poks[newName];
        }
        return mon;
    }
  }

  static GetTypes(name) {
    switch (DataManager.game) {
      case this.GAMES.RUNANDBUN:
        return Pokedex[name].types;
      case this.GAMES.STERLINGSILVER:
        return SsPokedex.poks[name].types;
    }
  }

  static GetId(name) {
    var mon = Pokedex[name];
    if (!mon) {
      const hyphenIndex = name.indexOf("-");
      const newName =
        name.slice(0, hyphenIndex + 1) +
        name.charAt(hyphenIndex + 1).toUpperCase() +
        name.slice(hyphenIndex + 2);
      mon = Pokedex[newName];
    }
    return mon?.id;
  }

  static GetEvolutions(name) {
    var mon = Pokedex[name];
    if (!mon) {
      const hyphenIndex = name.indexOf("-");
      const newName =
        name.slice(0, hyphenIndex + 1) +
        name.charAt(hyphenIndex + 1).toUpperCase() +
        name.slice(hyphenIndex + 2);
      mon = Pokedex[newName];
    }
    return mon.evolutions;
  }

  static GetPokemonList() {
    return Object.keys(Pokedex).sort();
  }
}

export default DataManager;
