import './EncounterTable.css';
import { Fragment } from 'react';
import EncounterData from './data/EncounterData';
import EncounterLocation from './EncounterLocation';


function EncounterTable(props) {
    const encounterData = JSON.parse(JSON.stringify(EncounterData));
    const locations = encounterData.locations.slice();

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

export default EncounterTable;