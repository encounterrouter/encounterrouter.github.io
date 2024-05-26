import './EncounterLocation.css'
import { useContext, useState } from 'react';
import EncounterMethod from './EncounterMethod';
import CaughtEncounter from './CaughtEncounter';
import { UserContext } from './App';
import Utility from './Utility';
import DataManager from './data/DataManager';

function EncounterLocation(props) {
    const location = props.location;
    const methods = location.methods;
    const { encounterFilter } = useContext(UserContext);
    const [radioVal, setRadioVal] = useState("none");
    const caughtHere = props.caught.some(e => e.location.name === location.name);
    const locationHasSteel = location.methods.some(m => m.encounters.some(e => DataManager.GetMon(e.name)?.types.includes("Steel")));
    const locationHasElectric = location.methods.some(m => m.encounters.some(e => DataManager.GetMon(e.name)?.types.includes("Electric")));

    const onRadioChange = (event) => {
        setRadioVal(event.target.value);
    }

    function Radio() {
        return (
            <div className="abilities">
            <form>
                <div className="radio">
                    <label>
                        <input type="radio" value="none" onChange={onRadioChange} checked={radioVal === "none"} />
                        &nbsp;&nbsp;None
                    </label>
                </div>
                { locationHasSteel ? 
                <div className="radio">
                    <label>
                        <input type="radio" value="mpull" onChange={onRadioChange} checked={radioVal === "mpull"} />
                        &nbsp;&nbsp;Magnet Pull
                    </label>
                </div>
                : ""}
                { locationHasElectric ? 
                <div className="radio">
                    <label>
                        <input type="radio" value="static" onChange={onRadioChange} checked={radioVal === "static"} />
                        &nbsp;&nbsp;Static
                    </label>
                </div>
                : ""}
            </form>
        </div>
        )
    }

    if (encounterFilter != null) {
        var hasDupe = false;
        location.methods.forEach(method => {
            if (method.encounters.some(e => Utility.SameSpecies(e.name, encounterFilter))) {
                hasDupe = true;
                return;
            }
        });
    }
    const show = encounterFilter == null || hasDupe
    if (caughtHere) {
        return (
            <div style={{ display: show ? "grid" : "none" }} className="encounterLocation">
                <CaughtEncounter caught={props.caught} setCaught={props.setCaught} locationName={location.name} name={props.caught.find(e => e.location.name === location.name).name} />
            </div>
        )
    }
    return (
        <div style={{ display: show ? "flex" : "none" }} className="encounterLocation" >
            <div className="encounterLocationPanel">
                <div className="locationName">{location.name}</div>
                {/* { locationHasSteel || locationHasElectric ? <Radio /> : ""} */}
                {methods.map(method =>
                    <EncounterMethod caught={props.caught} setCaught={props.setCaught} key={method.name} method={method} location={location} openDetailView={props.openDetailView} ability={radioVal} />
                )}
                {DataManager.game === DataManager.GAMES.STERLINGSILVER ? 
                <button onClick={() => props.openDetailView(location)}>View Details</button> :
                ""}
                
            </div>
            <div style={{ minHeight: "20px" }}></div>
        </div>
    )
}

export default EncounterLocation;