import './BoxView.css'
import { useState } from 'react';
import Pokedex from './data/Pokedex';
import Select from 'react-select';

function BoxView(props) {
    const [customMon, setCustomMon] = useState({});
    const [customLocation, setCustomLocation] = useState(null);
    const [selectedMon, setSelectedMon] = useState(props.caught[0]?.name);
    const options = [];
    Object.keys(Pokedex).sort().forEach(element => {
        options.push({ value: element, label: element })
    });

    console.log(Pokedex[selectedMon]?.evolutions.length);
    console.log(Pokedex[selectedMon]?.evolutions.length > 1);

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
        const customEncounter = { name: customMon, location: { name: customLocation } }
        temp.push(customEncounter);
        return props.setCaught(temp);
    }

    return (
        <div className="boxView">
            <div className="background" onClick={() => props.setIsBoxViewOpen(false)} />
            <div className='leftPanel'>
                <div style={{ fontSize: 'calc(5px + 5vh)', marginTop: '5vh' }}>{selectedMon}</div>
                <div style={{ fontSize: 'calc(5px + 2vh)', marginTop: '1vh' }}>Met Location: {props.caught.find(e => e.name === selectedMon).location.name}</div>
                <img style={{ height: '20vh', marginTop: '3vh', marginBottom: '3vh' }} src={'/sprites/' + Pokedex[selectedMon]?.id + '.png'} alt={selectedMon} />
                <div className='evolvePanel' style={{ display: (Pokedex[selectedMon]?.evolutions.length > 1) ? 'block' : 'none' }}>
                    <div>Evolve by clicking an evolution below</div>
                    {Pokedex[selectedMon]?.evolutions.map(evo =>
                        <img
                            src={'/sprites/' + Pokedex[evo.charAt(0).toUpperCase() + evo.slice(1)]?.id + '.png'}
                            onClick={selectedMon === evo.charAt(0).toUpperCase() + evo.slice(1) ? () => null : () => evolveMon(selectedMon, evo.charAt(0).toUpperCase() + evo.slice(1))}
                            style={{ cursor: 'pointer' }}
                        />
                    )}
                </div>
            </div>
            <div className="boxDisplay">
                {props.caught.map(e =>
                    <img
                        src={'/sprites/' + Pokedex[e.name]?.id + '.png'}
                        onClick={() => setSelectedMon(e.name)}
                        alt={e.name}
                        style={{ outline: selectedMon === e.name ? "2px solid white" : "" }}
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
                            <Select onChange={event => setCustomMon(event.value)} className='dropdown' style={{ width: '50%' }} options={options} />
                        </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingTop: '3vh' }}>
                        <div style={{ position: 'absolute', left: '10vw' }}>Location</div>
                        <input style={{ width:'25vw', position: 'absolute', left: '18.75vw' }} value={customLocation} onChange={event => setCustomLocation(event.target.value)}></input>
                    </div>
                    <button style={{marginTop:'3vh'}} disabled={customLocation && customMon ? false : true}>Add</button>
                </form>
            </div>
        </div>
    )
}

export default BoxView