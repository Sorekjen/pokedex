async function fetchPokemonGenerations(generations) {

    let pokemonList = [];

    for (let i = 0; i < generations.length; i++) {
        pokemonList = await getGeneration(generations[i], pokemonList);
    };

    async function getGeneration(generationNum, pokemonArray) {
        const promise = await fetch(`https://pokeapi.co/api/v2/generation/${generationNum}`)
            .then(response => response.json())
        
        pokemonArray.push(...promise.pokemon_species); // spread the array of pokemon into the state array
        pokemonArray = pokemonArray.map(pokemon => {
            return { name: pokemon.name, id: pokemon.url.replace("https://pokeapi.co/api/v2/pokemon-species/", "").replace("/", "") }
        });
        return pokemonArray;
    }
    console.log(pokemonList.id + pokemonList.name+ "POKEMON LIST")
    return pokemonList;
}

export default fetchPokemonGenerations;
