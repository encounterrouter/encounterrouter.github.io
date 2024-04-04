import './Toolbar.css'
import ToolbarBox from './ToolbarBox';
import { useContext } from 'react';
import { UserContext } from './App';

function Toolbar(props) {
    const { setEncounterFilter } = useContext(UserContext);

    function clearOnClick() {
        if (window.confirm('Clear all encounters? This cannot be undone.'))
        {
            props.setCaught([]);
        }
    }

    return (
        <div key="Toolbar" className="toolbar">
            <div className='topButtons'>
                <button onClick={() => setEncounterFilter(null)}>Clear Filters</button>
                <button className="clearEncounterButton" onClick={clearOnClick}>Clear Encounters</button>
            </div>
            <ToolbarBox setIsBoxViewOpen={props.setIsBoxViewOpen} caught={props.caught} setCaught={props.setCaught} openDetailView={props.openDetailView} />
        </div>
    )
}

export default Toolbar;