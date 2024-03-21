import './DetailView.css'
import { useState } from 'react';
import Pokedex from './data/Pokedex';
import SsPokedex from './data/SsPokedex';

function DetailView(props) {
    const [selectedMon, setSelectedMon] = useState(props.location.methods[0].encounters[0].name);
    const SsMon = SsPokedex.poks[selectedMon];

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

    return (
        <div className="detailView">
            <div className="background" onClick={() => props.setIsDetailViewOpen(false)} />
            <button className="closeButton" onClick={() => props.setIsDetailViewOpen(false)}><img src={'/sprites/201-x.png'} /></button>
            <div className="topView">
                <div className="monDisplay">
                    <img alt={selectedMon} src={'/sprites/' + Pokedex[selectedMon]?.id + '.png'} />
                    {SsMon.types.map(type =>
                        <div>{type}</div>
                    )}
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
                    <div className="moveLevels">
                        <div>Level</div>
                        {SsMon.learnset_info.learnset.map(move =>
                            <div style={{ fontFamily: 'Kubasta' }}>{move[0]}</div>
                        )}
                    </div>
                    <div className="moveNames">
                        <div>Move</div>
                        {SsMon.learnset_info.learnset.map(move =>
                            <div style={{ fontFamily: 'Kubasta' }}>{move[1]}</div>
                        )}
                    </div>
                    <div className="tms">
                        <div>TMs</div>
                        {SsMon.learnset_info.tms.map(move =>
                            <div style={{ fontFamily: 'Kubasta' }}>{move}</div>
                        )}
                    </div>
                </div>
            </div>
            <div className="monSelector">
                {props.location.methods.map(method =>
                    <DetailMethod method={method} />
                )}
            </div>
        </div>
    )
}

export default DetailView;