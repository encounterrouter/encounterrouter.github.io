import ToolbarMon from "./ToolbarMon";

function ToolbarBox(props) {
    return (
        <div key="ToolbarBox" className="toolbarBox">
            <div>Box</div>
            {props.caught.map(element =>
                <ToolbarMon key={element.name} name={element.name} location={element.location} openDetailView={props.openDetailView}/>
            )
            }
        </div>
    )
}

export default ToolbarBox;