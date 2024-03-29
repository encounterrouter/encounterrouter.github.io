import './DetailView.css'
import { useState, useRef, useEffect } from 'react';
import Pokedex from './data/Pokedex';
import SsPokedex from './data/SsPokedex';

function DetailView(props) {
    const [selectedMon, setSelectedMon] = useState(props.encounter ? props.encounter : props.location.methods[0].encounters[0].name);
    const levelObject = useRef(null);
    const imgObject = useRef(null);
    const SsMon = SsPokedex.poks[selectedMon];
    const [width, setWidth] = useState(0);
    const [imgWidth, setImgWidth] = useState(0);
    const [imgHeight, setImgHeight] = useState(0);

    var values = Object.keys(SsMon.bs).map(function (key) {
        return SsMon.bs[key];
    });

    function onImgLoad() {
        const img = new Image();
        img.src = '/gifs/' + Pokedex[selectedMon]?.id + '.gif';
        setImgWidth(img.width);
        setImgHeight(img.height);
    }

    function DetailMethod(props) {
        return (
            <div className='method'>
                <div className="methodName">{props.method.name}</div>
                {props.method.encounters.map(encounter =>
                    <img key={encounter.name} style={{ outline: selectedMon === encounter.name ? "2px solid white" : "" }} onClick={() => setSelectedMon(encounter.name)} alt={encounter?.name} src={'/sprites/' + Pokedex[encounter?.name]?.id + '.png'} />
                )}
            </div>
        )
    }

    useEffect(() => {
        setWidth(levelObject.current ? levelObject.current.offsetWidth : 0);
    }, [levelObject.current])

    return (
        <div className="detailView">
            <div className="background" onClick={() => props.setIsDetailViewOpen(false)} />
            <button className="closeButton" onClick={() => props.setIsDetailViewOpen(false)}><img alt="close-button" src={'/sprites/201-x.png'} /></button>
            <div className="topView">
                <div className="leftPanel">
                    <img ref={imgObject} style={{ width: imgWidth * 3, height: imgHeight * 3 }} className="mainImage" onLoad={onImgLoad} alt={selectedMon} src={'/gifs/' + Pokedex[selectedMon]?.id + '.gif'} />
                    <div style={{minHeight:'10vh'}}>
                        {SsMon.types.map(type =>
                            <div style={{marginTop:'1vh'}} key={type}>{type}</div>
                        )}
                    </div>
                    <div className="evoDisplay">
                        {Pokedex[selectedMon].evolutions.map(evo =>
                            <img
                                alt={evo}
                                key={evo}
                                src={'/sprites/' + Pokedex[evo.charAt(0).toUpperCase() + evo.slice(1)]?.id + '.png'}
                                onClick={() => setSelectedMon(evo.charAt(0).toUpperCase() + evo.slice(1))}
                                style={{ outline: selectedMon === (evo.charAt(0).toUpperCase() + evo.slice(1)) ? "2px solid white" : "" }}
                            />
                        )}
                    </div>
                </div>
                <div className="midPanel">
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <div>HP:</div>
                        <div>{SsMon.bs.hp}</div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <div>Atk:</div>
                        <div>{SsMon.bs.at}</div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <div>Def:</div>
                        <div>{SsMon.bs.df}</div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <div>SpAtk:</div>
                        <div>{SsMon.bs.sa}</div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <div>SpDef:</div>
                        <div>{SsMon.bs.sd}</div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <div>Spe:</div>
                        <div>{SsMon.bs.sp}</div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <div>Total:</div>
                        <div>{values.reduce((a, b) => a + b, 0)}</div>
                    </div>
                    <div className='abilityDisplay'>
                        <div key="abilities">
                            Abilities:
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', fontSize: '1vw' }}>
                            {SsMon.abilities.map(a =>
                                <div key={a}>{a}</div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="learnsetDisplay">
                    <div className="levelUp">
                        <div className="moveAndLevel">
                            <div ref={levelObject} className={"level"}>Level</div>
                            <div>Move</div>
                        </div>
                        <div className='noHeader'>
                            {SsMon.learnset_info.learnset.map(move =>
                                <div key={move[1]} className="moveAndLevel">
                                    <div className={"level"} style={{ fontFamily: 'Kubasta', width: width, boxSizing: 'border-box' }}>{move[0]}</div>
                                    <div style={{ fontFamily: 'Kubasta' }}>{move[1]}</div>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="tms">
                        <div>TMs</div>
                        <div className="tmList">
                            {SsMon.learnset_info.tms.map(move =>
                                move ? <div key={move} style={{ fontFamily: 'Kubasta' }}>{move}</div> : ""
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div className="monSelector">
                {props.location.methods?.map(method =>
                    <DetailMethod key={"Detail View " + method.name} method={method} />
                )}
            </div>
        </div>
    )
}

export default DetailView;