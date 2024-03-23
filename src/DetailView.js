import './DetailView.css'
import { useState, useRef, useEffect } from 'react';
import Pokedex from './data/Pokedex';
import SsPokedex from './data/SsPokedex';

function DetailView(props) {
    const [selectedMon, setSelectedMon] = useState(props.encounter ? props.encounter : props.location.methods[0].encounters[0].name);
    const levelObject = useRef(null);
    const SsMon = SsPokedex.poks[selectedMon];
    const [width, setWidth] = useState(0);

    function DetailMethod(props) {
        return (
            <div className='method'>
                <div className="methodName">{props.method.name}</div>
                {props.method.encounters.map(encounter =>
                    <img style={{ outline: selectedMon === encounter.name ? "2px solid white" : "" }} onClick={() => setSelectedMon(encounter.name)} alt={encounter?.name} src={'/sprites/' + Pokedex[encounter?.name]?.id + '.png'} />
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
                <div className="monDisplay">
                    <img className="mainImage" alt={selectedMon} src={'/sprites/' + Pokedex[selectedMon]?.id + '.png'} />
                    {SsMon.types.map(type =>
                        <div>{type}</div>
                    )}
                    <div className="evoDisplay">
                        {Pokedex[selectedMon].evolutions.map(evo =>
                            <img
                                alt={evo}
                                src={'/sprites/' + Pokedex[evo.charAt(0).toUpperCase() + evo.slice(1)]?.id + '.png'}
                                onClick={() => setSelectedMon(evo.charAt(0).toUpperCase() + evo.slice(1))}
                                style={{ outline: selectedMon === (evo.charAt(0).toUpperCase() + evo.slice(1)) ? "2px solid white" : "" }}
                            />
                        )}
                    </div>
                </div>
                <div className="statDisplay">
                    <div className='stats' >
                        <div>HP:</div>
                        <div>Atk:</div>
                        <div>Def:</div>
                        <div>SpAtk:</div>
                        <div>SpDef:</div>
                        <div>Spe:</div>
                    </div>
                    <div className='stats right'>
                        <div>{SsMon.bs.hp}</div>
                        <div>{SsMon.bs.at}</div>
                        <div>{SsMon.bs.df}</div>
                        <div>{SsMon.bs.sd}</div>
                        <div>{SsMon.bs.sp}</div>
                        <div>{SsMon.bs.sp}</div>
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
                            <div className="moveAndLevel">
                                <div className={"level"} style={{ fontFamily: 'Kubasta', width: width, boxSizing:'border-box'}}>{move[0]}</div>
                                <div style={{ fontFamily: 'Kubasta' }}>{move[1]}</div>
                            </div>
                        )}
                        </div>
                    </div>
                    <div className="tms">
                        <div>TMs</div>
                        <div className="tmList">
                            {SsMon.learnset_info.tms.map(move =>
                                <div style={{ fontFamily: 'Kubasta' }}>{move}</div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div className="monSelector">
                {props.location.methods.map(method =>
                    <DetailMethod key={"Detail View " + method.name} method={method} />
                )}
            </div>
        </div>
    )
}

export default DetailView;