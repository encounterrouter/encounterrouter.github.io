import Pokedex from "./data/Pokedex";

class Utility {

    static SameSpecies(left, right) {
        return Pokedex[left]?.evolutions?.includes(right.toLowerCase());
    }

    static GetPokedexName(name) {
        var newName = name.charAt(0).toUpperCase() + name.slice(1);
        if (newName.includes('-')) {
            return "Ho-Oh"
        }
        if (newName === "Flabebe")
            return "Flabébé"

        return newName;
    }

}
export default Utility;