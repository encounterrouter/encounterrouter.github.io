import './Toolbar.css'
import ToolbarBox from './ToolbarBox';

function Toolbar(props) {

    return (
        <div key="Toolbar" className="toolbar">
            <ToolbarBox caught={props.caught}/>
            <button className="clearEncounterButton" onClick={() => props.setCaught([])}>Clear Encounters</button>
        </div>
    )
}

export default Toolbar;