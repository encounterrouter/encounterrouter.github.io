import './EncounterLocation.css'
import { useContext} from 'react';
import EncounterMethod from './EncounterMethod';
import CaughtEncounter from './CaughtEncounter';
import { UserContext } from './App';

function EncounterLocation(props) {
    const location = props.location;
    const methods = location.methods;
    const { dupeFilter } = useContext(UserContext);
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

export default EncounterLocation;