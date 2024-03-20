import ToolbarMon from "./ToolbarMon";

function ToolbarBox(props) {
    return (
        <div key="ToolbarBox" className="toolbarBox">
            <div>Box</div>
            {props.caught.map(element =>
                <ToolbarMon key={element.name} name={element.name} />
            )
            }
        </div>
    )
}

export default ToolbarBox;