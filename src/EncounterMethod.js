import Encounter from './Encounter'
import './EncounterMethod.css'

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

export default EncounterMethod