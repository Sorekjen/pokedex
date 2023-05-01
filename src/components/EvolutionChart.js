import React from 'react';
import EvolutionDetail from './EvolutionDetail';
import isIterable from '../helpers/isIterable.js';
import groupEvolutionInfo from '../helpers/groupEvolutionInfo';
import EvolutionPokemon from './EvolutionPokemon';

function EvolutionChart({ evolutionInfo }) {
    console.log("chart-----------")
    return (<>
        {Object.entries(groupEvolutionInfo(evolutionInfo)).map(([evolution_level, evolveList], index) => {
            console.log("evolveList")
            console.log(evolveList)
            return (
                <div key={index} className="evolutionlevel-column">
                    {evolveList.map((pokemon, index) => {
                        console.log("pokemon---------------")
                        console.log(pokemon)
                        console.log(index)
                        return(
                        <div key={index} className="evolution-row">
                              <EvolutionPokemon key={index+100}evolution={pokemon} />
                            <EvolutionDetail key={index+1000} evolutionDetails={pokemon.evolutionDetails} />
                          
                        </div>
                        )
                    })}

                </div>
            )
        })
        }</>)
} export default EvolutionChart;