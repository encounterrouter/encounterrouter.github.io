import './EncounterPopup.css'
import { useContext, useRef, useEffect, useState } from 'react';
import { UserContext } from './App'

function EncounterPopup(props) {
    const { setEncounterFilter } = useContext(UserContext);
    const { visiblePopup, setVisiblePopup } = useContext(UserContext);
    const selected = props.selected;
    const encounterName = props.encounterName;
    const popupVisible = visiblePopup === props.id;
    const popupText = useRef(null);
    const [width, setWidth] = useState(0);

    useEffect(() => {
        let popupRef = popupText.current;
        setWidth(popupRef ? popupRef.offsetWidth : 0);
        const onResize = () => {
            setWidth(popupRef ? popupRef.offsetWidth : 0);
        }
        window.addEventListener("resize", onResize);
        return () => {
            window.removeEventListener("resize", () => {
                setWidth(popupRef ? popupRef.offsetWidth : 0);
            });
        }

    }, [popupText.current]);

    const getLeft = () => {
        return -((width / 2) - (props.encounterWidth / 2));
    }

    return (
        <div className="popup" style={{ left: getLeft()}} onClick={() => setVisiblePopup(null)}>
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