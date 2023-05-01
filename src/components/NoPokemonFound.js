import "../css/card.css";
import typeColors from "../helpers/typeColors.js";


function Card({filterProperties}) {
  let pokemonData = {};
  let primaryType = "normal";
  let secondaryType = "normal";

  if (filterProperties?.search) {
    if (!isNaN(+filterProperties?.search)) pokemonData.id = +filterProperties.search;
      else pokemonData.id = 34;
    if (filterProperties.search !== "") pokemonData.name = filterProperties.search;
      else pokemonData.name = "Sad Ditto";
  } else {
    pokemonData.id = 34;
    pokemonData.name = "Sad Ditto";
  }

  if(filterProperties.primaryType !== "") 
    primaryType = filterProperties.primaryType;


  if(filterProperties.secondaryType !== "") 
    secondaryType = filterProperties.secondaryType;



  return (
    <div className={"card-container"}>
    <div className={"card-background"} 
    style={{background: `linear-gradient(160deg, ${typeColors[primaryType]} 0%, ${typeColors[primaryType]} 65%, ${typeColors[secondaryType]} 65%, ${typeColors[secondaryType]} 100%`}} >
    <div className={`card`}>

        <div className="card-image">
          <img src={`https://pbs.twimg.com/media/D5j8smjWAAAQikp.png`} alt="sad ditto" />
        
        </div>
        <div className="card-content">
          <p>#{pokemonData.id}</p>
          <h3>{pokemonData.name}</h3>
        </div>
    </div>
    </div>
    </div>

  );
}

export default Card;