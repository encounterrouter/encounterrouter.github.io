import { useState, useContext, useEffect, useRef } from 'react';
import { UserContext } from './App'
import EncounterPopup from './EncounterPopup'
import './Encounter.css'
import SameSpecies from './Utility';
import Pokedex from './data/Pokedex';

function Encounter(props) {
    const { encounterFilter } = useContext(UserContext);
    const { visiblePopup, setVisiblePopup } = useContext(UserContext);
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);
    const encounterObject = useRef(null);
    const isWeighted = props.encounter.hasOwnProperty("weight");
    const name = props.encounter.name;
    const selected = encounterFilter === null ? false : SameSpecies(name, encounterFilter);
    const isCaught = props.caught.some(c => SameSpecies(c.name, name))
    const encounterRate = Math.round(props.encounter.customWeight * 100) / 100 + "%";
    const encounterId = name + props.methodName + props.location.name;

    useEffect(() => {
       setWidth(encounterObject.current ? encounterObject.current.offsetWidth : 0);
       setHeight(encounterObject.current ? encounterObject.current.offsetHeight : 0)
    }, [encounterObject.current]);

    return (
        <div ref={encounterObject} className={selected ? "encounter selected" : "encounter"} style={{ border: isCaught ? "2px solid red" : "2px solid black" }}>
            <EncounterPopup id={encounterId + "Popup"} encounterHeight={height} encounterWidth={width} selected={selected} encounterName={name} caught={props.caught} setCaught={props.setCaught} location={props.location} />
            <button className="encounterButton" onClick={() => {
                if (visiblePopup !== encounterId + "Popup")
                    setVisiblePopup(encounterId + "Popup");
                else
                    setVisiblePopup(null);
            }}>
                <img alt={name} src={'/sprites/' + Pokedex[name].id + '.png'} style={{ opacity: isCaught ? "0.25" : "1" }} />
                <div className="percent" style={{ display: isWeighted ? "block" : "none" }}>
                    {isCaught ? "Dupe" : encounterRate}
                </div>
            </button>
        </div>
    )
}

export default Encounter;