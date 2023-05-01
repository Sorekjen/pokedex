import { useEffect, useState } from "react";
import React from "react";
import "../css/info.css"
import typeColors from "../helpers/typeColors";
import { Link } from "react-router-dom";
import getIdFromUrl from "../helpers/getIdFromUrl";
import groupEvolutionInfo from "../helpers/groupEvolutionInfo";
import getEvolutionInfo from "../helpers/getEvolutionInfo";
import EvolutionChart from "./EvolutionChart";
import ProgressBar from "./Progressbar";

function Info(props) {
  const [pokemon, setPokemon] = useState({});
  const [pokemonSpecies, setPokemonSpecies] = useState({});
  const [pokemonEvolutionChain, setPokemonEvolutionChain] = useState({});
  const [evolutionInfo, setEvolutionInfo] = useState({});
  const [shouldRender, setShouldRender] = useState(false);


  function isIterable(obj) {
    // checks for null and undefined
    if (obj == null) {
      return false;
    }
    return typeof obj[Symbol.iterator] === 'function';
  }

  useEffect(() => {

    async function fetchPokemon() {
      await fetch(`https://pokeapi.co/api/v2/pokemon-species/${props.id}`)
        .then((response) => {
          return response.json();
        })
        .then((json) => {
          console.log(json)
          setPokemonSpecies(json);
          fetch(json.varieties[0].pokemon.url).then((response) => { return response.json(); }).then((json) => {
            console.log(json)
            setPokemon(json);
          })
          fetch(json.evolution_chain.url).then((response) => { return response.json(); }).then((json) => {
            console.log("uE - json")
            console.log(json)
            setPokemonEvolutionChain(json);
          })
        })

    };
    fetchPokemon();
  }, []);

  useEffect(() => {
    console.log("uE - pokemonEvolutionChain")
    console.log("uE - pokemonEvolutionChain")

    console.log("uE - pokemonEvolutionChain")
    console.log(pokemonEvolutionChain)

    if (pokemonEvolutionChain?.chain?.length) {


      const evolutionInfo = getEvolutionInfo(pokemonEvolutionChain);
      console.log("uE - evolutionInfo")
      console.log(evolutionInfo)
      setEvolutionInfo(evolutionInfo);
    }
  }, [pokemonEvolutionChain]);


  useEffect(() => {
    console.log("shouldRender:" + shouldRender)
  }, [shouldRender]);


  useEffect(() => {
    console.log("-----------------")
    console.log("evolutionInfo")
    console.log(evolutionInfo)
    console.log("pokemonEvolutionChain")
    console.log(pokemonEvolutionChain)
    console.log("pokemon")
    console.log(pokemon)
    console.log("pokemonSpecies")
    console.log(pokemonSpecies)
    console.log("-----------------")
    if (pokemon?.species?.name && pokemonEvolutionChain) {
      console.log("CALLING GETEVOLUTIONINFO with: ")
      console.log(pokemonEvolutionChain)
      console.log("CALLING GETEVOLUTIONINFO with: ")

      setEvolutionInfo(getEvolutionInfo(pokemonEvolutionChain))
    }


  }, [pokemon, pokemonEvolutionChain, pokemonSpecies]);


  useEffect(() => {
    if (isIterable(evolutionInfo)) {
      console.log("isIterable(evolutionInfo)")
      setShouldRender(true);
      console.log("pokemonEvolutionChain")
      console.log(pokemonEvolutionChain)
    }

  }, [evolutionInfo]);

  const primaryType = pokemon.types && pokemon.types[0].type.name;
  const secondaryType = pokemon.types && pokemon.types.length === 2 ? pokemon.types[1].type.name : primaryType;

  return (
    (shouldRender ? (
      <div className={`info-container`} style={{ background: `linear-gradient(160deg, ${typeColors[primaryType]} 0%, ${typeColors[primaryType]} 65%, ${typeColors[secondaryType]} 65%, ${typeColors[secondaryType]} 100%` }}>
        <div className="img-container">
          <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${props.id}.png`} className="card-img-top pokemon-img" alt="..." />
        </div>
        <div className="card-body aboutcontainer">
          <div className="about-card">
            <h3 className="card-title">About</h3>
            <p className="flaver-text">{pokemonSpecies?.flavor_text_entries[0]?.flavor_text}</p>
            <p className="card-text">Weight: {pokemon.weight}</p>
            <p className="card-text">Height: {pokemon.height}</p>
          </div>

          <div className="base-stat">
                            {
                                pokemon.stats.map(stat => {
                                    return (
                                        <div className="statBarsDiv" key={stat.stat.url}>
                                            <ProgressBar bgcolor="orange" progress={stat.base_stat} height={20} label={stat.stat.name} />
                                        </div>
                                    )
                                })
                            }
                        </div>

{/*
          <div className="abilities-card"></div>
          {pokemon.abilities && pokemon.abilities.map((ability) => (
            <div className="ability" key={ability.ability.name}>
              <div className="ability-name">{ability.ability.name}:</div>
              <div className="ability-value">{ability.is_hidden}</div>
            </div>
          ))}

          <div className="moves-card"></div>
          {pokemon.moves && pokemon.moves.map((move) => (
            <div className="move" key={move.move.name}>
              <div className="move-name">{move.move.name}:</div>
              <div className="move-value">{move.version_group_details[0].level_learned_at}</div>
            </div>
          ))}
*/}
<div className="evolution-chart aboutcontainer">
        {evolutionInfo && <EvolutionChart  evolutionInfo= {evolutionInfo}/>}
        </div>
          



          <div className="types-card">
            <ul>
              {pokemon.types &&
                pokemon.types.map((type, index) => (
                  <li
                    style={{ background: `${typeColors[pokemon.types[index].type.name]}` }}
                    key={index}>{type.type.name}</li>
                ))}
            </ul>
          </div>
        </div>
      </div>


    ) : <></>)
  )
} export default Info;
