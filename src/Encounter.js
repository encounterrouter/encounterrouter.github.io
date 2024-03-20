import { useState, useContext, useEffect } from 'react';
import { UserContext } from './App'
import EncounterPopup from './EncounterPopup'
import './Encounter.css'
import SameSpecies from './Utility';
import Pokedex from './data/Pokedex';

function useForceUpdate(){
    const [value, setValue] = useState(0); // integer state
    return () => setValue(value => value + 1); // update state to force render
    // A function that increment 👆🏻 the previous state like here 
    // is better than directly setting `setValue(value + 1)`
}

function Encounter(props) {
    const { encounterFilter } = useContext(UserContext);
    const { visiblePopup, setVisiblePopup } = useContext(UserContext);
    const isWeighted = props.encounter.hasOwnProperty("weight");
    const name = props.encounter.name;
    const selected = encounterFilter === null ? false : SameSpecies(name, encounterFilter);
    const isCaught = props.caught.some(c => SameSpecies(c.name, name))
    const width = (isWeighted ? Math.round(props.encounter.weight * 100) / 100 : "33") + "%";
    const encounterId = name + props.method + props.location.location;
    // const forceUpdate = useForceUpdate();

    // useEffect(() => {
    //     if (name in Pokedex.poks) {
    //         if (!("dexNumber" in Pokedex.poks[name]))
    //         fetch('https://pokeapi.co/api/v2/pokemon/' + name.toLowerCase())
    //             .then((response) => response.json())
    //             .then((data) => {
    //                 Pokedex.poks[name]["dexNumber"] = data.id;
    //                 forceUpdate();
    //             })
    //             .catch((err) => {
    //                 console.log(err.message);
    //             });
    //     }
    // }, [name]);

    return (
        <div className={selected ? "encounter selected" : "encounter"} style={{ border: isCaught ? "2px solid red" : "none" }}>
            <EncounterPopup id={encounterId + "Popup"} selected={selected} encounterName={name} caught={props.caught} setCaught={props.setCaught} location={props.location} />
            <button className="encounterButton" onClick={() => {
                if (visiblePopup !== encounterId + "Popup")
                    setVisiblePopup(encounterId + "Popup");
                else
                    setVisiblePopup(null);
            }}>
                <img alt={name} src={'/sprites/' + Pokedex[name].id + '.png'} style={{ opacity: isCaught ? "0.25" : "1" }} />
                <div className="percent" style={{ display: isWeighted ? "block" : "none" }}>
                    {isCaught ? "Dupe" : width}
                </div>
            </button>
        </div>
    )
}

export default Encounter;