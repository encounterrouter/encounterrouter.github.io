import { useContext } from "react";
import ToolbarMon from "./ToolbarMon";
import { UserContext } from './App';

function ToolbarBox(props) {
    const { openNotificationPopup } = useContext(UserContext);

    function exportOnClick() {
        navigator.clipboard.writeText(JSON.stringify(props.caught));
        openNotificationPopup("Encounters copied to clipboard - save somewhere and copy back to clipboard to import.");
    }

    function importOnClick() {
        navigator.clipboard.readText().then(text =>
            props.setCaught(JSON.parse(text))
        ).catch(error =>
            openNotificationPopup("Import failed - please copy a valid encounter list to your clipboard and try again.")
        )
        
        // promise.catch()
        // {
        //     openNotificationPopup("Failed to import");
        // }
    }

    return (
        <div key="ToolbarBox" className="toolbarBox">
            <div>Box</div>
            <div className="boxButtons">
                <button onClick={() => props.setIsBoxViewOpen(true)}>Edit Box</button>
                <button onClick={exportOnClick}>Export Box</button>
                <button onClick={importOnClick}>Import Box</button>
            </div>
            {props.caught.map(element =>
                <ToolbarMon key={element.name} name={element.name} location={element.location} openDetailView={props.openDetailView} />
            )
            }
        </div>
    )
}

export default ToolbarBox;