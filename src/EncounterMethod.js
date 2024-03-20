import Encounter from './Encounter'
import './EncounterMethod.css'

function EncounterMethod(props) {
    const method = props.method;
    const encounters = method.encounters;
    const isWeighted = encounters.some(e => e.hasOwnProperty("weight"));

    if (isWeighted) {
        var filteredEncounters = encounters.filter(e => !props.caught.some(c => c.name === e.name));
        var sum = 0;
        filteredEncounters.forEach(fe => sum += parseInt(fe.weight));
        filteredEncounters.forEach(element => {
            element.weight = (element.weight / sum) * 100;
        });
    }

    return (
        <div key={method.method} className="encounterMethod">
            <div className="methodText">
                {method.method}
            </div>
            {encounters.map(encounter =>
                <Encounter caught={props.caught} setCaught={props.setCaught} key={encounter.name} encounter={encounter} method={method.method} location={props.location} />
            )}
        </div>
    )
}

export default EncounterMethod