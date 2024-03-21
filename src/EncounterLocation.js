import './EncounterLocation.css'
import { useContext} from 'react';
import EncounterMethod from './EncounterMethod';
import CaughtEncounter from './CaughtEncounter';
import { UserContext } from './App';
import SameSpecies from './Utility';

function EncounterLocation(props) {
    const location = props.location;
    const methods = location.methods;
    const { encounterFilter } = useContext(UserContext);
    const caughtHere = props.caught.some(e => e.location.location === location.location);

    if (encounterFilter != null) {
        var hasDupe = false;
        location.methods.forEach(method => {
            if (method.encounters.some(e => SameSpecies(e.name, encounterFilter))) {
                hasDupe = true;
                return;
            }
        });
    }
    const show = encounterFilter == null || hasDupe
    if (caughtHere) {
        return (
            <div style={{ display: show ? "grid" : "none" }} className="encounterLocation">
                <CaughtEncounter caught={props.caught} setCaught={props.setCaught} location={location.location} name={props.caught.find(e => e.location.location === location.location).name} />
            </div>
        )
    }
    return (
        <div style={{ display: show ? "flex" : "none" }} className="encounterLocation" >
            <div className="encounterLocationPanel">
                <div className="locationName">{location.location}</div>
                {methods.map(method =>
                    <EncounterMethod caught={props.caught} setCaught={props.setCaught} key={method.method} method={method} location={location} />
                )}
            </div>
            <div style={{ minHeight: "20px" }}></div>
        </div>
    )
}

export default EncounterLocation;