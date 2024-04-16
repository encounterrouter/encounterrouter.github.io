import Encounter from './Encounter'
import './EncounterMethod.css'
import Utility from './Utility';
import DataManager from './data/DataManager';

function EncounterMethod(props) {
    const method = props.method;
    const encounters = method.encounters;
    const isWeighted = encounters.some(e => e.hasOwnProperty("weight"));

    function calcOdds(encounter, sums, hasSteel, hasElectric) {
        const normalWeight = (encounter.weight / sums.all) * 100;

        if (props.ability === "none") {
            encounter.customWeight = normalWeight;
        }
        else if (props.ability === "mpull") {
            if (DataManager.GetTypes(encounter.name).includes("Steel")) {
                const steelWeight = (encounter.weight / sums.steel) * 100;

                encounter.customWeight = (normalWeight * 0.5) + (steelWeight * 0.5);
            }
            else {
                encounter.customWeight = hasSteel ? normalWeight * 0.5 : normalWeight;
            }
        }
        else if (props.ability === "static") {
            if (DataManager.GetTypes(encounter.name).includes("Electric")) {
                const electricWeight = (encounter.weight / sums.electric) * 100;

                encounter.customWeight = (normalWeight * 0.5) + (electricWeight * 0.5);
            }
            else {
                encounter.customWeight = hasElectric ? normalWeight * 0.5 : normalWeight;
            }
        }
        else {
            throw new Error("Unexpected value of ability radio.");
        }
    }

    if (isWeighted) {
        var filteredEncounters = encounters.filter(e => !props.caught.some(c => Utility.SameSpecies(c.name, e.name)));
        const hasSteel = filteredEncounters.some(e => DataManager.GetTypes(e.name)?.includes("Steel"));
        const hasElectric = filteredEncounters.some(e => DataManager.GetTypes(e.name)?.includes("Electric"));

        var sums = {
            "all": 0,
            "steel": 0,
            "electric": 0
        }

        filteredEncounters.forEach(fe => {
            sums.all += parseInt(fe.weight);
            if (DataManager.GetMon(fe.name)?.types?.includes("Steel"))
                sums.steel += parseInt(fe.weight);
            if (DataManager.GetMon(fe.name)?.types?.includes("Electric"))
                sums.electric += parseInt(fe.weight);
        });

        filteredEncounters.forEach(element => {
            calcOdds(element, sums, hasSteel, hasElectric);
        });
    }

    return (
        <div key={method.name} className="encounterMethod">
            <div className="methodText">
                {method.name}
            </div>
            {encounters.map(encounter =>
                <Encounter
                    caught={props.caught}
                    setCaught={props.setCaught}
                    key={encounter.name}
                    encounter={encounter}
                    methodName={method.name}
                    location={props.location}
                    openDetailView={props.openDetailView}
                    abilityFilter={
                        props.ability === "mpull" && DataManager.GetMon(encounter.name).types?.includes("Steel") ||
                        props.ability === "static" && DataManager.GetMon(encounter.name).types?.includes("Electric")
                    }
                />
            )}
        </div>
    )
}

export default EncounterMethod