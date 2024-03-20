import './EncounterPopup.css'
import { useContext } from 'react';
import { UserContext } from './App'

function EncounterPopup(props) {
    const { setEncounterFilter } = useContext(UserContext);
    const { visiblePopup, setVisiblePopup } = useContext(UserContext);
    const selected = props.selected;
    const encounterName = props.encounterName;
    const popupVisible = visiblePopup === props.id;

    return (
        <div className="popup" onClick={() => setVisiblePopup(null)}>
            <div className={popupVisible ? "popuptext show" : "popuptext"} id="myPopup">
                <div>{encounterName}</div>
                <button onClick={() => {
                    props.setCaught(props.caught.concat(
                        {
                            name: encounterName,
                            location: props.location
                        }));
                }
                }>Catch</button>
                <button style={{ display: selected ? "none" : "inline" }} onClick={() =>
                    setEncounterFilter(encounterName)
                }>
                    Filter Dupes
                </button>
                <button style={{ display: selected ? "inline" : "none" }} onClick={() =>
                    setEncounterFilter(null)
                }>
                    Unfilter Dupes
                </button>
            </div>
        </div>
    )
}

export default EncounterPopup;