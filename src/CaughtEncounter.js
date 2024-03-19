import { useEffect, useState } from 'react'

function CaughtEncounter(props) {
    const [apiData, setApiData] = useState([]);
    const name = props.name.toLowerCase();

    useEffect(() => {
        fetch('https://pokeapi.co/api/v2/pokemon/' + name)
            .then((response) => response.json())
            .then((data) => {
                setApiData(data);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, [name]);

    const Uncatch = () => {
        const index = props.caught.indexOf(props.caught.find(e => e.name === props.name));

        props.setCaught(
            [].concat(
                props.caught.slice(0, index),
                props.caught.slice(index + 1)
            )
        )
    }

    return (
        <div>
            {props.location}
            <br />
            <img alt={props.name} src={'/sprites/' + apiData.id + '.png'}></img>
            <br />
            <button onClick={Uncatch} >Undo</button>
        </div>
    )
}

export default CaughtEncounter;