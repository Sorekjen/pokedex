import "../css/pokeballLoader.css";
import NoPokemonFound from "../components/NoPokemonFound";
import { useCallback, useEffect, useState } from "react";
import Card from "../components/card";
import "../css/frontpage.css";
import Pagination from "../components/Pagination";
import FilterBox from "../components/FilterBox";
import filterPokemon from "../helpers/filterPokemon.js";
import { Link } from "react-router-dom";
import { useLocation } from "react-router";

async function timeout(delay) {
  return new Promise(res => setTimeout(res, delay));
}

function getIDFromPokemon(pokemon) {
  return parseInt(pokemon.url
    .replace(pokemon.url.includes("pokemon-species") ? 'https://pokeapi.co/api/v2/pokemon-species/' : 'https://pokeapi.co/api/v2/pokemon/', "")
    .replace("/", ""));
}


function FrontPage(props) {
  const [generationsCached, setGenerationsCached] = useState([]);
  const [filterProperties, setFilterProperties] = useState(null);
  const [generation, setGeneration] = useState([]);
  const [max, setMax] = useState(0);
  const [pokemonList, setPokemonList] = useState([]);
  const [filteredPokemonList, setFilteredPokemonList] = useState([]);
  const [currentPokemonList, setCurrentPokemonList] = useState([]);
  const [offset, setOffset] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [limit, setLimit] = useState(60);
  const [shouldRender, setShouldRender] = useState(false);
  const [noPokemonFound, setNoPokemonFound] = useState(false);


  const state = useLocation().state;

  useEffect(() => {
    if (state) {
      console.log("+++++++++++++++++++++++++++" + state);
      console.log("+++++++++++++++++++++++++++" + state.lastPage.filterProperties.genRange)
      setPokemonList(state.lastPage.pokemonList);
      setGenerationsCached(state.lastPage.generationsCached);
      setMax(state.lastPage.max);
      setOffset(state.lastPage.offset);
      setLimit(state.lastPage.limit);
      setMax(state.lastPage.max);
      setFilterProperties(state.lastPage.filterProperties);
      setShouldRender(true);
    } else {
      console.log("+++++------------++++++++++++++" + state);
      setFilterProperties({ genRange: [], primaryType: "", secondaryType: "", toggle: false, height: false, weight: false, stats: [] });
    }
  }, [])


  async function getGeneration(generationNum) {
    setIsLoading(true)
    console.log("CALLING API")
    let pokemonArray = [];
    const promise = await fetch(`https://pokeapi.co/api/v2/generation/${generationNum}`)
      .then(response => response.json())

    const promises = promise.pokemon_species.map(pokemon => fetch(`https://pokeapi.co/api/v2/pokemon/${getIDFromPokemon(pokemon)}/`).then(response => response.json()));
    pokemonArray = await Promise.all(promises);
    let reducedPokemonArray = pokemonArray.map(pokemon => {
      return { name: pokemon.species.name, id: pokemon.id, height: pokemon.height, weight: pokemon.weight, types: pokemon.types, stats: pokemon.stats }
    });
    setPokemonList(prevList => [...prevList, ...reducedPokemonArray]); // spread the array of pokemon into the state array
  }

  const onFilterChange = useCallback((newFilter) => {
    if (!newFilter.genRange) return;
    console.log("onfilterchange, new filter: " + newFilter.genRange + " old filter: " + filterProperties?.genRange + "  primaryType: " + newFilter.primaryType + "  secondaryType: " + newFilter.secondaryType + "  toggle: " + newFilter.toggle + "  height: " + newFilter.height + "  weight: " + newFilter.weight + "  stats: " + newFilter.stats + " search: " + newFilter.search)
    setFilterProperties(newFilter);
    setOffset(0)
    setShouldRender(true);
    console.log("PLEASE")
  }, [filterProperties]);

  useEffect(() => {
    if (!generation || generation.length === 0) return;
    for (let i = 0; i < generation.length; i++) {
      if (!generationsCached.includes(generation[i])) {
        setIsLoading(true)
        console.log("calling api with gen: " + generation + " generationscached: " + generationsCached)
        getGeneration(generation[i]);
        setGenerationsCached(x => [...x, generation[i]]);
      };
    }


    console.log("generation: " + generation + " generationscached: " + generationsCached);
  }, [generation]);

  useEffect(() => {


    function fetchPokemon() {
      setCurrentPokemonList(filteredPokemonList ? filteredPokemonList.slice(offset, offset + limit) : []);
    }
    fetchPokemon();
    console.log("offset: " + offset);

  }, [offset, filteredPokemonList]);


  useEffect(() => {
    if (currentPokemonList.length >= 0 && pokemonList.length != 0) {
      setIsLoading(false)
    }
  }, [currentPokemonList]);

  useEffect(() => {
    console.log("currentPokemonList" + currentPokemonList);
    if (currentPokemonList.length === 0 && filterProperties?.genRange?.length !== 0 && !isLoading && shouldRender) {
      setNoPokemonFound(true);
    }
    else { setNoPokemonFound(false) }
  }, [currentPokemonList]);

  useEffect(() => {
    console.log("pokemonList" + pokemonList);
  }, [pokemonList]);



  useEffect(() => {
    if (filterProperties === null) return;
    setGeneration(filterProperties?.genRange);
    setFilteredPokemonList(filterPokemon(pokemonList, filterProperties));
    console.log("filterProperties: [" + filterProperties?.genRange + "] " + filterProperties?.height + " " + filterProperties?.weight + " " + filterProperties.primaryType + " " + filterProperties.secondaryType);
  }, [filterProperties, pokemonList]);

  useEffect(() => {
    console.log("filteredPokemonList: " + filteredPokemonList.map(x => x.name));
    if (filteredPokemonList === undefined) return;
    setMax(filteredPokemonList.length);
  }, [filteredPokemonList]);

  return (
    <div className="App">
      <div className="filtercontainer">
        {filterProperties !== null ? (<FilterBox key={1231312} callback={onFilterChange} filterProperties={filterProperties} />) : null}
      </div>
      <div className="container-wrapper">
        {noPokemonFound ? <NoPokemonFound
        filterProperties = {filterProperties}/>
          : (<>{shouldRender ? (
            <div className="container">
              {Array.from(currentPokemonList).map((pokemon, index) => {
                return (
                  <Link
                    to={{
                      pathname: `/about/${pokemon.id}`
                    }}
                    state={{
                      pokemonData: pokemon,
                      lastPage: {
                        pokemonList: pokemonList,
                        filterProperties: filterProperties,
                        filteredPokemonList: filteredPokemonList,
                        offset: offset,
                        limit: limit,
                        max: max,
                        generationsCached: generationsCached,
                      },
                    }}
                  >
                    <Card id={pokemon.id} pokemonData={pokemon} key={pokemon.id} />
                  </Link>
                );
              })}
            </div>)
            : <></>}</>)}

      </div>
      <div className="paginationcontainer">
        {isLoading ? (
          <div className="loader-wrapper">
            <div className="pokeball">
            </div>
          </div>
        ) :
          <Pagination
            limit={limit}
            offset={offset}
            max={max}
            setOffset={setOffset}
            setLimit={setLimit}
          />
        }
      </div>
    </div>
  );
}
export default FrontPage;