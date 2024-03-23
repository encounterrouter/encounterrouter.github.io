import './Toolbar.css'
import ToolbarBox from './ToolbarBox';
import { useContext} from 'react';
import { UserContext } from './App';

function Toolbar(props) {
    const { setEncounterFilter } = useContext(UserContext);

    return (
        <div key="Toolbar" className="toolbar">
            <button onClick={() => setEncounterFilter(null)}>Clear Filters</button>
            <ToolbarBox caught={props.caught} openDetailView={props.openDetailView}/>
            <button className="clearEncounterButton" onClick={() => props.setCaught([])}>Clear Encounters</button>
        </div>
    )
}

export default Toolbar;