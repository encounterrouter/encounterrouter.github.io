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
                <div className="popupHeader">{encounterName}</div>
                <div className="buttonContainer">
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
                    Filter
                </button>
                <button style={{ display: selected ? "inline" : "none" }} onClick={() =>
                    setEncounterFilter(null)
                }>
                    Unfilter
                </button>
                </div>
            </div>
        </div>
    )
}

export default EncounterPopup;