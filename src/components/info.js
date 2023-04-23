import { useEffect, useState } from "react";
import "../css/info.css"

function setTypeColor(typeToCheck) {
  const typeColors = {
    bug: 'pokemon--bug',
    dark: 'pokemon--dark',
    dragon: 'pokemon--dragon',
    electric: 'pokemon--electric',
    fairy: 'pokemon--fairy',
    fighting: 'pokemon--fighting',
    fire: 'pokemon--fire',
    flying: 'pokemon--flying',
    ghost: 'pokemon--ghost',
    grass: 'pokemon--grass',
    ground: 'pokemon--ground',
    ice: 'pokemon--ice',
    normal: 'pokemon--normal',
    poison: 'pokemon--poison',
    psychic: 'pokemon--psychic',
    rock: 'pokemon--rock',
    steel: 'pokemon--steel',
    water: 'pokemon--water'
  };

  return typeColors[typeToCheck?.toLowerCase()] || '';
}

function Info(props) {
  const [pokemon, setPokemon] = useState({});

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${props.id}`)
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        setPokemon(json);
      });
  }, [props.id]);

  return (
    <div className={`${setTypeColor(pokemon.types?.[0]?.type.name)} info-container`}>
      <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${props.id}.png`} className="card-img-top pokemon-img" alt="..." />
      <div className="card-body">
        <h1 className="card-title">{pokemon.name}</h1>
        <h1 className="card-title">Types:</h1>
        <ul className="type-list">
          {pokemon.types &&
            pokemon.types.map((type, index) => (
              <li key={index}>{type.type.name}</li>
            ))}
        </ul>
        <h1 className="card-title">Stats:</h1>
        <div className="stats-container">
          {pokemon.stats &&
            pokemon.stats.map((stat) => (
              <div className="stat" key={stat.stat.name}>
                <div className="stat-name">{stat.stat.name}:</div>
                <div className="stat-value">{stat.base_stat}</div>
              </div>
            ))}
        </div>
        <h1 className="card-title">Abilities:</h1>
        <ul className="abilities-list">
          {pokemon.abilities &&
            pokemon.abilities.map((ability, index) => (
              <li key={index}>{ability.ability.name}</li>
            ))}
        </ul>
        <p className="card-text">Weight: {pokemon.weight}</p>
        <p className="card-text">Height: {pokemon.height}</p>
      </div>
    </div>
  );
}

export default Info;
