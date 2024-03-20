import Pokedex from "./data/Pokedex";

function SameSpecies(left, right) {
    return Pokedex[left].evolutions.includes(right.toLowerCase())
}

export default SameSpecies;