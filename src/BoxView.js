import './BoxView.css'
import { useState } from 'react';
import Select from 'react-select';
import Utility from './Utility';
import DataManager from './data/DataManager';

function BoxView(props) {
    const [customMon, setCustomMon] = useState("");
    const [customLocation, setCustomLocation] = useState("");
    const [selectedMon, setSelectedMon] = useState(props.caught[0]?.name);
    const [checked, setChecked] = useState(false);
    const [selectedMonCaught, setSelectedMonCaught] = useState(props.caught.find(c => c.name === selectedMon));
    const pokemonOptions = [];
    DataManager.GetPokemonList().forEach(element => {
        if (element && element != null )
        pokemonOptions.push({ value: element, label: element })
    });

    const boxMonOnClick = (name) => {
        const caughtMon = props.caught.find(c => c.name === name)
        setSelectedMon(name)
        setSelectedMonCaught(caughtMon)
        setChecked(caughtMon.status ? (caughtMon.status === "alive" ? false : true) : false)
    }

    const switchOnChange = () => {
        setChecked(!checked);
        const temp = [...props.caught];
        temp.find(c => c.name === selectedMon).status = checked ? "alive" : "dead";
        props.setCaught(temp);
    };

    const selectOnChange = (value) => {
        setCustomMon(value);
    }

    function evolveMon(evoFrom, evoTo) {
        var mon = props.caught.find(c => c.name === evoFrom);
        if (!mon.caughtAs) mon.caughtAs = evoFrom;
        mon.name = evoTo;
        setSelectedMon(evoTo);
        props.setCaught(props.caught);
    }

    const onSubmit = (event) => {
        event.preventDefault();
        console.log(event);
        const temp = [...props.caught];
        if (temp.some(e => Utility.SameSpecies(customMon, e.name)))
            return

        const customEncounter = { name: customMon, location: { name: customLocation } }
        temp.push(customEncounter);
        return props.setCaught(temp);
    }

    return (
        <div className="boxView">
            <div className="background" onClick={() => props.setIsBoxViewOpen(false)} />
            <div className='leftPanel' style={{ display: selectedMon ? "block" : "none" }}>
                <div style={{ fontSize: 'calc(5px + 5vh)', marginTop: '5vh' }}>{selectedMon}</div>
                <div style={{ fontSize: 'calc(5px + 2vh)', marginTop: '1vh' }}>Met Location: {props.caught.find(e => e.name === selectedMon)?.location.name}</div>
                <img style={{ height: '20vh', marginTop: '3vh', marginBottom: '3vh' }} src={'/sprites/' + DataManager.GetId(selectedMon) + '.png'} alt={selectedMon} />
                <div className='evolvePanel' style={{ display: (DataManager.GetEvolutions(selectedMon)?.length > 1) ? 'block' : 'none' }}>
                    <div>Evolve by clicking an evolution below</div>
                    {DataManager.GetEvolutions(selectedMon).map(evo =>
                        <img
                            src={'/sprites/' + DataManager.GetId(evo.charAt(0).toUpperCase() + evo.slice(1)) + '.png'}
                            onClick={selectedMon === evo.charAt(0).toUpperCase() + evo.slice(1) ? () => null : () => evolveMon(selectedMon, evo.charAt(0).toUpperCase() + evo.slice(1))}
                            style={{ cursor: 'pointer'}}
                            key={evo}
                            alt={evo}
                        />
                    )}
                </div>
                <div style={{ paddingTop: '4vh', fontSize: 'calc(5px + 3vh)' }}>Status: </div>
                <div className='status' style={{ paddingTop: '2vh', fontSize: 'calc(5px + 2vh)' }}>
                    <div style={{ paddingRight: '1vw' }}>Dead?</div>
                    <label className="switch">
                        <input
                            type="checkbox"
                            checked={selectedMonCaught.status ? (selectedMonCaught.status === "alive" ? false : true) : false}
                            onChange={switchOnChange}
                            value=""
                        />
                        <span className="slider round"></span>
                    </label>
                    {/* <Select defaultInputValue={statusOptions[0].value} options={statusOptions}/> */}
                </div>
            </div>
            <div className="boxDisplay">
                {props.caught.map(e =>
                    <img
                        key={e.name}
                        src={'/sprites/' + DataManager.GetId(e.name) + '.png'}
                        onClick={() => boxMonOnClick(e.name)}
                        alt={e.name}
                        style={{ 
                            outline: selectedMon === e.name ? "2px solid white" : "", 
                            filter: props.caught.find(c => c.name === e.name).status === "dead" ? 'grayscale(1)' : 'grayscale(0)',
                            opacity: props.caught.find(c => c.name === e.name).status === "dead" ? '40%' : '100'
                        }}
                    />
                )}
            </div>
            <div className='customEncounter'>
                <div style={{ fontSize: '3vh' }}>Add Custom Encounter</div>
                <br />
                <form onSubmit={onSubmit}>
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <div style={{ position: 'absolute', left: '10vw' }}>Pokemon</div>
                        <div style={{ paddingLeft: '15vw', width: '25vw' }}>
                            <Select onChange={event => selectOnChange(event.value)} className='dropdown' style={{ width: '50%' }} options={pokemonOptions} />
                        </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingTop: '3vh' }}>
                        <div style={{ position: 'absolute', left: '10vw' }}>Location</div>
                        <input style={{ width: '25vw', position: 'absolute', left: '18.75vw' }} value={customLocation} onChange={event => setCustomLocation(event.target.value)}/>
                    </div>
                    <button style={{ marginTop: '3vh' }} disabled={customLocation && customMon ? false : true}>Add</button>
                </form>
            </div>
        </div>
    )
}

export default BoxView