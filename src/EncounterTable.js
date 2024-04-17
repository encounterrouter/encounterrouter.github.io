import './EncounterTable.css';
import { Fragment } from 'react';
import EncounterLocation from './EncounterLocation';
import DataManager from './data/DataManager.js'


function EncounterTable(props) {
    const encounterData = JSON.parse(JSON.stringify(DataManager.GetEncounterData()));
    const locations = encounterData.locations.slice();

    return (
        <>
            <div style={{ position: 'fixed', width: '8vw', left: "30vw", top: "10vh", display: "flex", flexDirection: "column" }}>
                <div style={{ fontSize: "calc(3px + 1.5vw)" }}>Jump to</div>
                {DataManager.GetSplitData() ?
                    DataManager.GetSplitData().splits.map(split =>
                        <button key={split.name} style={{ marginTop: '1vh' }} onClick={() => document.querySelector("#" + split.name.replace(/\s/g, "").replace('&', "")).scrollIntoView()}>{split.name}</button>
                    )
                    :
                    ""
                }
            </div>
            <div key={"Table"} className="encounterTable">
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
        </>
    )
}

export default EncounterTable;