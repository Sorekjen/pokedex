
import typeColors from "../helpers/typeColors.js";



function Card({pokemonData, id}) {
  const primaryType = pokemonData.types[0].type.name;
  const secondaryType = pokemonData.types.length === 2 ? pokemonData.types[1].type.name : primaryType;

  return (
    <div className={"card-container"}>
    <div className={"card-background"} 
    style={{background: `linear-gradient(160deg, ${typeColors[primaryType]} 0%, ${typeColors[primaryType]} 65%, ${typeColors[secondaryType]} 65%, ${typeColors[secondaryType]} 100%`}} >
    <div className={`card`}>

        <div className="card-image">
          <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonData.id}.png`} alt={pokemonData.name} />
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