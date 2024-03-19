import { useState, useContext, useEffect } from 'react';
import { UserContext } from './App'
import './Encounter.css'
import './popup.css'

function Encounter(props) {
        const [apiData, setApiData] = useState([]);
        const { dupeFilter, setDupeFilter } = useContext(UserContext);
        const [popupVisible, setVisible] = useState(false);
        const isWeighted = props.encounter.hasOwnProperty("weight");
        const width = (isWeighted ? props.encounter.weight.toFixed(1) : "33") + "%";
        const selected = props.encounter.name === dupeFilter;
        const name = props.encounter.name;

        useEffect(() => {
            fetch('https://pokeapi.co/api/v2/pokemon/' + name.toLowerCase())
                .then((response) => response.json())
                .then((data) => {
                    setApiData(data);
                })
                .catch((err) => {
                    console.log(err.message);
                });
        }, [name]);

        return (
            <div className={selected ? "encounter selected" : "encounter"} /*style={{ width: width }}*/>
                <div className="popup" onClick={() => setVisible(!popupVisible)}>
                    <div className={popupVisible ? "popuptext show" : "popuptext"} id="myPopup">
                        <div>{name}</div>
                        <button onClick={() => {
                            props.setCaught(props.caught.concat(
                                {
                                    name: name,
                                    location: props.location
                                }));
                        }
                        }>Catch</button>
                        <button style={{ display: selected ? "none" : "inline" }} onClick={() =>
                            setDupeFilter(name)
                        }>
                            Show Dupes
                        </button>
                        <button style={{ display: selected ? "inline" : "none" }} onClick={() =>
                            setDupeFilter(null)
                        }>
                            Hide Dupes
                        </button>
                    </div>
                </div>
                <button onClick={() => setVisible(!popupVisible)}>
                    <img alt={name} src={'/sprites/' + apiData.id + '.png'}></img>
                    <br />
                    <div className="percent" style={{ display: isWeighted ? "block" : "none" }}>{width}</div>
                </button>
            </div>
        )
    }

export default Encounter;