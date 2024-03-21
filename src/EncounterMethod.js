import Encounter from './Encounter'
import './EncounterMethod.css'
import SameSpecies from './Utility';

function EncounterMethod(props) {
    const method = props.method;
    const encounters = method.encounters;
    const isWeighted = encounters.some(e => e.hasOwnProperty("weight"));

    if (isWeighted) {
        var filteredEncounters = encounters.filter(e => !props.caught.some(c => SameSpecies(c.name, e.name)));
        var sum = 0;
        filteredEncounters.forEach(fe => sum += parseInt(fe.weight));
        filteredEncounters.forEach(element => {
            element.customWeight = (element.weight / sum) * 100;
        });
    }

    return (
        <div key={method.name} className="encounterMethod">
            <div className="methodText">
                {method.name}
            </div>
            {encounters.map(encounter =>
                <Encounter caught={props.caught} setCaught={props.setCaught} key={encounter.name} encounter={encounter} methodName={method.name} location={props.location} />
            )}
        </div>
    )
}

export default EncounterMethod