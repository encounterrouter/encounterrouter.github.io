import { useState, useContext, useEffect, useRef } from 'react';
import { UserContext } from './App'
import EncounterPopup from './EncounterPopup'
import './Encounter.css'
import SameSpecies from './Utility';
import Pokedex from './data/Pokedex';

function Encounter(props) {
    const { encounterFilter } = useContext(UserContext);
    const { visiblePopup, setVisiblePopup } = useContext(UserContext);
    const encounterObject = useRef(null);
    const [width, setWidth] = useState(null);
    const [height, setHeight] = useState(null);
    const isWeighted = props.encounter.hasOwnProperty("weight");
    const name = props.encounter.name;
    const selected = encounterFilter === null ? false : SameSpecies(name, encounterFilter);
    const isCaught = props.caught.some(c => SameSpecies(c.name, name))
    const encounterRate = Math.round(props.encounter.customWeight * 100) / 100 + "%";
    const encounterId = name + props.methodName + props.location.name;

    useEffect(() => {
        let encounterRef = encounterObject.current;
        setWidth(encounterRef ? encounterRef.offsetWidth : 0);
        setHeight(encounterRef ? encounterRef.offsetHeight : 0);
        const onResize = () => {
            setWidth(encounterRef ? encounterRef.offsetWidth : 0);
            setHeight(encounterRef ? encounterRef.offsetHeight : 0);
        }
        window.addEventListener("resize", onResize);
        return () => {
            window.removeEventListener("resize", () => {
                setWidth(encounterRef ? encounterRef.offsetWidth : 0);
                setHeight(encounterRef ? encounterRef.offsetHeight : 0);
            });
        }
    }, [encounterObject.current]);

    return (
        <div ref={encounterObject} className={selected ? "encounter selected" : "encounter"} style={{ border: isCaught ? "2px solid red" : "2px solid black" }}>
            <EncounterPopup id={encounterId + "Popup"} encounterHeight={height} encounterWidth={width} selected={selected} encounterName={name} caught={props.caught} setCaught={props.setCaught} location={props.location} openDetailView={props.openDetailView} />
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