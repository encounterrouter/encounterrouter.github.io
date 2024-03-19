import './EncounterTable.css'
import { useEffect, useState, useContext, Fragment } from 'react';
import { UserContext } from './App'
import EncounterData from './EncounterData'
import usePersistedState from 'use-persisted-state-hook'


function EncounterTable(props) {
    const encounterData = EncounterData;
    const locations = encounterData.locations;

    return (
        <div key={"Table"} className="encounterTable">
            {locations.map(location =>
                <Fragment key={location.location}>
                    <EncounterLocation caught={props.caught} setCaught={props.setCaught} key={location.location} location={location} />
                </Fragment>
            )}
        </div>
    )
}

function EncounterLocation(props) {
    const location = props.location;
    const methods = location.methods;
    const { dupeFilter, setDupeFilter } = useContext(UserContext);
    const caughtHere = props.caught.some(e => e.location.location === location.location);

    if (dupeFilter != null) {
        var hasDupe = false;
        location.methods.forEach(method => {
            if (method.encounters.some(e => e.name === dupeFilter)) {
                hasDupe = true;
                return;
            }
        });
    }
    const show = dupeFilter == null || hasDupe
    if (caughtHere) {
        return (
            <div style={{ display: show ? "grid" : "none" }} className="encounterLocation">
                <CaughtEncounter caught={props.caught} setCaught={props.setCaught} location={location.location} name={props.caught.find(e => e.location.location === location.location).name} />
            </div>
        )
    }
    return (
        <div style={{ display: show ? "initial" : "none" }} className="encounterLocation" >
            <div className="encounterLocationPanel">
                <div className="locationName">{location.location}</div>
                {methods.map(method =>
                    <EncounterMethod caught={props.caught} setCaught={props.setCaught} key={method.method} method={method} location={location} />
                )}
                <br />
            </div>
            <div style={{ minHeight: "20px" }}></div>
        </div>
    )
}

function CaughtEncounter(props) {
    const [apiData, setApiData] = useState([]);
    useEffect(() => {
        fetch('https://pokeapi.co/api/v2/pokemon/' + props.name.toLowerCase())
            .then((response) => response.json())
            .then((data) => {
                setApiData(data);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, []);

    const Uncatch = () => {
        const index = props.caught.indexOf(props.caught.find(e => e.name === props.name));

        props.setCaught(
            [].concat(
                props.caught.slice(0, index),
                props.caught.slice(index + 1)
            )
        )
    }

    return (
        <div>
            {props.location}
            <br />
            <img src={'/sprites/' + apiData.id + '.png'}></img>
            <br />
            <button onClick={Uncatch} >Undo</button>
        </div>
    )
}

function EncounterMethod(props) {
    const method = props.method;
    var encounters = method.encounters;
    const isWeighted = encounters.some(e => e.hasOwnProperty("weight"));

    if (isWeighted) {
        encounters = encounters.filter(e => !props.caught.some(c => c.name === e.name));
        var sum = 0;
        encounters.map(e => sum += e.weight);
        encounters.forEach(element => {
            element.weight = (element.weight / sum) * 100;
        });
    }

    return (
        <div key={method.method} className="encounterMethod">
            {method.method}
            <br />
            {encounters.map(encounter =>
                <Encounter caught={props.caught} setCaught={props.setCaught} key={encounter.name} encounter={encounter} location={props.location} />
            )}
        </div>
    )
}

function Encounter(props) {
    const [apiData, setApiData] = useState([]);
    const { dupeFilter, setDupeFilter } = useContext(UserContext);
    const [popupVisible, setVisible] = useState(false);
    const isWeighted = props.encounter.hasOwnProperty("weight");
    const width = (isWeighted ? props.encounter.weight.toFixed(1) : "33") + "%";
    const selected = props.encounter.name === dupeFilter;

    useEffect(() => {
        fetch('https://pokeapi.co/api/v2/pokemon/' + props.encounter.name.toLowerCase())
            .then((response) => response.json())
            .then((data) => {
                setApiData(data);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, []);

    return (
        <div className={selected ? "encounter selected" : "encounter"} /*style={{ width: width }}*/>
            <div className="popup" onClick={() => setVisible(!popupVisible)}>
                <div className={popupVisible ? "popuptext show" : "popuptext"} id="myPopup">
                    <div>{props.encounter.name}</div>
                    <button onClick={() => {
                        props.setCaught(props.caught.concat(
                            {
                                name: props.encounter.name,
                                location: props.location
                            }));
                    }
                    }>Catch</button>
                    <button style={{ display: selected ? "none" : "inline" }} onClick={() =>
                        setDupeFilter(props.encounter.name)
                    }>
                        Show Dupes
                    </button>
                    <button style={{ display: selected ? "inline" : "none" }} onClick={() =>
                        setDupeFilter(null)
                    }>
                        Hide Dupes
                    </button>
                </div>
            </div>
            <button onClick={() => setVisible(!popupVisible)}>
                <img src={'/sprites/' + apiData.id + '.png'}></img>
            </button>
            <br />
            <div className="percent" style={{ display: isWeighted ? "block" : "none" }}>{width}</div>
        </div>
    )
}



export default EncounterTable;