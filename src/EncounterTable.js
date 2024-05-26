import './EncounterTable.css';
import { Fragment } from 'react';
import EncounterLocation from './EncounterLocation';
import DataManager from './data/DataManager.js'


function EncounterTable(props) {
    const encounterData = JSON.parse(JSON.stringify(DataManager.GetEncounterData()));
    const locations = encounterData.locations.slice();

    return (
        <>
            <div key={"Table"} className="encounterTable">
                <div>
                    {DataManager.GetSplitData()
                        ?
                        DataManager.GetSplitData().splits.map(split =>
                            <Fragment key={split.name}>
                                <div id={split.name.replace(/\s/g, "").replace('&', "")} style={{ fontSize: 'calc(10px + 8vh)', paddingTop: '10vh', paddingBottom: '3vh' }}>{split.name} Split</div>
                                {split.locations.map(location =>
                                    <Fragment key={location}>
                                        <EncounterLocation caught={props.caught} setCaught={props.setCaught} key={location} location={locations.find(l => l.name === location)} openDetailView={props.openDetailView} />
                                    </Fragment>
                                )}
                            </Fragment>
                        )
                        :
                        locations.map(location =>
                            <Fragment key={location.name}>
                                <EncounterLocation caught={props.caught} setCaught={props.setCaught} key={location.name} location={location} openDetailView={props.openDetailView} />
                            </Fragment>
                        )}
                </div>
            </div>
        </>
    )
}

export default EncounterTable;