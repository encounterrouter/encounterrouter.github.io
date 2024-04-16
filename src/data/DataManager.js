import Pokedex from "./Pokedex";

import RnbEncounterData from "./rnb/EncounterData";
import RnbSplitData from "./rnb/SplitData";

import SsEncounterData from "./EncounterData";
import SsSplitData from "./SplitData";
import SsEvoData from "./EvoData";
import SsPokedex from "./SsPokedex";


class DataManager {
    static GAMES = Object.freeze({
        STERLINGSILVER:   Symbol("ss"),
        RUNANDBUN:  Symbol("rnb")
    });
    static ss = this.GAMES.STERLINGSILVER;
    static rnb = this.GAMES.RUNANDBUN;

    static game = this.GAMES.STERLINGSILVER;

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
                return SsPokedex.poks[name];
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
        return Pokedex[name].id;
    }

    static GetEvolutions(name) {
        return Pokedex[name].evolutions;
    }

    static GetPokemonList() {
        return Object.keys(Pokedex).sort();
    }
}

export default DataManager;