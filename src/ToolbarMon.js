import { useEffect, useState } from 'react'

function ToolbarMon(props) {
    const [apiData, setApiData] = useState([]);
    const name = props.name

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
        <img alt={name} src={'/sprites/' + apiData.id + '.png'}></img>
    )
}

export default ToolbarMon;