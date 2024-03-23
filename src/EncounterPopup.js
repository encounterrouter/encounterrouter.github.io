import './EncounterPopup.css'
import { useContext, useRef, useEffect, useState } from 'react';
import { UserContext } from './App'

function EncounterPopup(props) {
    const [width, setWidth] = useState(0);
    const { setEncounterFilter } = useContext(UserContext);
    const { visiblePopup, setVisiblePopup } = useContext(UserContext);
    const selected = props.selected;
    const encounterName = props.encounterName;
    const popupVisible = visiblePopup === props.id;
    const popupText = useRef(null);

    useEffect(() => {
        setWidth(popupText.current ? popupText.current.offsetWidth : 0);
        const onResize = () => {
            setWidth(popupText.current ? popupText.current.offsetWidth : 0);
        }
        window.addEventListener("resize", onResize);
    }, [popupText.current]);

    return (
        <div className="popup" style={{ left: -((width / 2) - (props.encounterWidth / 2))}} onClick={() => setVisiblePopup(null)}>
            <div ref={popupText} className={popupVisible ? "popuptext show" : "popuptext"} id="myPopup">
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
                    <button onClick={() =>
                        props.openDetailView(props.location, encounterName)
                    }>
                        Open
                    </button>
                </div>
            </div>
        </div>
    )
}

export default EncounterPopup;