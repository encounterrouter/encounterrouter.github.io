import Info from "./data/Info";

function SameSpecies(left, right) {
    return Info[left].evolutions.includes(right.toLowerCase())
}

export default SameSpecies;