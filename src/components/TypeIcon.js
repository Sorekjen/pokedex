import typeColors from "../helpers/typeColors";

function TypeIcon({type}) {

    return (
        <div key={1} className="type-icon" style={{ background: typeColors[type] }}>
            <p>{type}</p>
        </div>
    )
} export default TypeIcon;
    
