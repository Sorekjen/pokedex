import React, { useEffect, useState} from 'react';
import getIdFromUrl from '../helpers/getIdFromUrl.js';
import TypeIcon from './TypeIcon.js';
import '../css/evolution.css'

function EvolutionPokemon({evolution}) {
    const [pokemon, setPokemon] = useState({})

    useEffect(() => {
        async function fetchPokemon() {
            const response = await fetch(evolution.species.url)
            const data = await response.json()
            const response2 = await fetch(data.varieties[0].pokemon.url)
            const data2 = await response2.json()
            setPokemon(data2)
        }
        fetchPokemon()
    }, [])

    return (
        
        <div className="evolution" key={evolution.species.url}>
            <div className='evolution-img'>
            <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${getIdFromUrl(evolution.species.url)}.png`} alt={evolution.species.name} />
            </div>
            <div className='evolution-content'>
            <p>{evolution.species.name}</p>
            {pokemon?.types?.length && pokemon.types.map((type, index) => {
            return(
            <TypeIcon key ={index}
            type = {type.type.name}/>
            )})}
            </div>
        </div>
    )
} export default EvolutionPokemon;