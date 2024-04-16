// import { useEffect, useState } from 'react'
import DataManager from "./data/DataManager";

// function useForceUpdate(){
//     const [value, setValue] = useState(0); // integer state
//     return () => setValue(value => value + 1); // update state to force render
//     // A function that increment 👆🏻 the previous state like here 
//     // is better than directly setting `setValue(value + 1)`
// }

function ToolbarMon(props) {
    const name = props.name
    // const forceUpdate = useForceUpdate();

    // useEffect(() => {
    //     if (name in Pokedex.poks) {
    //         if (!("dexNumber" in Pokedex.poks[name]))
    //         fetch('https://pokeapi.co/api/v2/pokemon/' + name.toLowerCase())
    //             .then((response) => response.json())
    //             .then((data) => {
    //                 Pokedex.poks[name]["dexNumber"] = data.id;
    //                 forceUpdate()
    //             })
    //             .catch((err) => {
    //                 console.log(err.message);
    //             });
    //     }
    // }, [name]);

    return (
        <img
            onClick=
            {() => {
                switch (DataManager.game) {
                    case DataManager.GAMES.RUNANDBUN:
                        window.open("https://dex.runandbun.com/pokemon/" + name)
                        break;
                    case DataManager.GAMES.STERLINGSILVER:
                        props.openDetailView(props.location, name)
                        break;
                }
            }}
            alt={name}
            src={'/sprites/' + DataManager.GetId(name) + '.png'}
            style={{ cursor: "pointer" }}>
        </img>
    )
}

export default ToolbarMon;