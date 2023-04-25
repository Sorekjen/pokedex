import { useCallback, useEffect, useState } from "react";
import Card from "../components/card";
import "../css/frontpage.css";
import Pagination from "../components/Pagination";
import FilterBox from "../components/FilterBox";
import filterPokemon from "../helpers/filterPokemon.js";
import { Link } from "react-router-dom";
import { useLocation } from "react-router";



function getIDFromPokemon(pokemon) {
  return parseInt(pokemon.url
    .replace(pokemon.url.includes("pokemon-species") ? 'https://pokeapi.co/api/v2/pokemon-species/' : 'https://pokeapi.co/api/v2/pokemon/', "")
    .replace("/", ""));
}


function FrontPage(props) {
  const [generationsCached, setGenerationsCached] = useState([]);
  const [filterProperties, setFilterProperties] = useState([{ stats: [], height: 0, weight: 0, genRange: [], primaryType: "", secondaryType: "", toggle: false }]);
  const [generation, setGeneration] = useState([]);
  const [max, setMax] = useState(0);
  const [pokemonList, setPokemonList] = useState([]);
  const [filteredPokemonList, setFilteredPokemonList] = useState([]);
  const [currentPokemonList, setCurrentPokemonList] = useState([]);
  const [offset, setOffset] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [limit, setLimit] = useState(60);
  const [shouldRender, setShouldRender] = useState(false);


  const state = useLocation().state;

  useEffect(() => {
    if (state)
    {
      console.log(state);
      setPokemonList(state.lastPage.pokemonList);
      setGenerationsCached(state.lastPage.generationsCached);
      setMax(state.lastPage.max);
      setOffset(state.lastPage.offset);
      setLimit(state.lastPage.limit);
      setMax(state.lastPage.max);
      setFilterProperties(state.lastPage.filterProperties);
      setFilteredPokemonList(state.lastPage.pokemonList);
      setShouldRender(true);
    }
  }, [])
  

  async function getGeneration(generationNum) {
    console.log("CALLING API")
    let pokemonArray = [];
    const promise = await fetch(`https://pokeapi.co/api/v2/generation/${generationNum}`)
      .then(response => response.json())

    const promises = promise.pokemon_species.map(pokemon => fetch(`https://pokeapi.co/api/v2/pokemon/${getIDFromPokemon(pokemon)}/`).then(response => response.json()));
    pokemonArray = await Promise.all(promises);

    setPokemonList(prevList => [...prevList, ...pokemonArray]); // spread the array of pokemon into the state array
  }

  const onFilterChange = useCallback((newFilter) => {
    setFilterProperties(newFilter);
    setOffset(0)
    setShouldRender(true);

  }, [filterProperties]);

  useEffect(() => {
    if (!generation || generation.length === 0) return;
    setIsLoading(true);
    for (let i = 0; i < generation.length; i++) {
      if (!generationsCached.includes(generation[i])) {
        getGeneration(generation[i]);
        setGenerationsCached(x => [...x, generation[i]]);
      };
      setIsLoading(false);
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
    console.log("currentPokemonList" + currentPokemonList);
  }, [currentPokemonList]);

  useEffect(() => {
    console.log("pokemonList" + pokemonList);
  }, [pokemonList]);



  useEffect(() => {
    setGeneration(filterProperties.genRange);
    setFilteredPokemonList(filterPokemon(pokemonList, filterProperties));
    console.log("filterProperties: [" + filterProperties.genRange + "] " + filterProperties.height + " " + filterProperties.weight + " " + filterProperties.primaryType + " " + filterProperties.secondaryType);
  }, [filterProperties,pokemonList]);

  useEffect(() => {
    console.log("filteredPokemonList: " + filteredPokemonList.map(x => x.name));
    if (filteredPokemonList === undefined) return;
    setMax(filteredPokemonList.length);
  }, [filteredPokemonList]);

  return (
    <div className="App">
      <div className="filtercontainer">
        <FilterBox callback={onFilterChange} />
      </div>
      <div className="container-wrapper">
      {shouldRender ? (
        <div className="container">
          {Array.from(currentPokemonList).map((pokemon, index) => {
            return (
              <Link 
                to={{
                  pathname: "/about"
                }}
                state= {{
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
      : <></>}
      </div>

      {isLoading ? (
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      ) : <div className="paginationcontainer">
        <Pagination
          limit={limit}
          offset={offset}
          max={max}
          setOffset={setOffset}
          setLimit={setLimit}
        />
      </div>}

    </div>
  );
}
export default FrontPage;