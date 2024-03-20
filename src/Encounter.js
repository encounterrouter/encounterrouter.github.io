import { useState, useContext, useEffect } from 'react';
import { UserContext } from './App'
import EncounterPopup from './EncounterPopup'
import './Encounter.css'

function Encounter(props) {
    const [apiData, setApiData] = useState([]);
    const { encounterFilter } = useContext(UserContext);
    const { visiblePopup, setVisiblePopup } = useContext(UserContext);
    const isWeighted = props.encounter.hasOwnProperty("weight");
    const name = props.encounter.name;
    const selected = name === encounterFilter;
    const isCaught = props.caught.some(c => c.name === name)
    const width = (isWeighted ? Math.round(props.encounter.weight * 100) / 100 : "33") + "%";
    const encounterId = name + props.method + props.location.location;

    useEffect(() => {
        fetch('https://pokeapi.co/api/v2/pokemon/' + name.toLowerCase())
            .then((response) => response.json())
            .then((data) => {
                setApiData(data);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, [name]);

    return (
        <div className={selected ? "encounter selected" : "encounter"} style={{border: isCaught ? "2px solid red" : "none" }}>
            <EncounterPopup id={encounterId + "Popup"} selected={selected} encounterName={name} caught={props.caught} setCaught={props.setCaught} location={props.location} />
            <button className="encounterButton" onClick={() => {
                if (visiblePopup !== encounterId + "Popup")
                    setVisiblePopup(encounterId + "Popup");
                else
                    setVisiblePopup(null);
            }}>
                <img alt={name} src={'/sprites/' + apiData.id + '.png'} style={{ opacity: isCaught ? "0.25" : "1" }} />
                <div className="percent" style={{ display: isWeighted ? "block" : "none" }}>
                    {isCaught ? "Dupe" : width}
                </div>
            </button>
        </div>
    )
}

export default Encounter;