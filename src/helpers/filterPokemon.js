import genRangeFromGeneration from "./genRangeFromGeneration.js";
function filterPokemon(pokemonList, filters) {
  function equals(str1, str2) {
    if (typeof str2 !== "string") return false;
    if (typeof str1 !== "string") return false;
    if (str1.length !== str2.length) {
      return false;
    }
    for (let i = 0; i < str1.length; i++) {
      if (str1[i] !== str2[i]) {
        return false;
      }
    }
    return true;
  }

  // Create a new array to hold the filtered Pokemon
  console.log(
    "filter called:" +
      pokemonList.length +
      " filters: " +
      filters.genRange +
      " " +
      filters.height +
      " " +
      filters.weight +
      " " +
      filters.primaryType +
      " " +
      filters.secondaryType
  );

  if (!pokemonList) return;

  let filteredPokemon = pokemonList.filter((pokemon) => {
    if (
      filters.genRange &&
      !filters.genRange.includes(genRangeFromGeneration(pokemon.id))
    ) {
      return false;
    }
    if (
      filters.primaryType &&
      !equals(filters.primaryType, pokemon.types[0].type.name)
    ) {
      return false;
    }
    if (
      filters.secondaryType &&
      !equals(filters.secondaryType, pokemon.types.length === 2 ? pokemon.types[1].type.name : pokemon.types[0].type.name)
    ) {
      return false;
    }
    return true;
  });

  console.log("filter function return list size:" + filteredPokemon.length);

  if (filters.stats && filters.stats.length > 0) {
    filteredPokemon = filteredPokemon.sort((a, b) => {
      const aTotal = a.stats
        .map((stat) =>
          filters.stats.includes(stat.stat.name) ? stat.base_stat : 0
        )
        .filter((stat) => stat !== undefined)
        .reduce((accumulator, current) => accumulator + current, 0);
      const bTotal = b.stats
        .map((stat) =>
          filters.stats.includes(stat.stat.name) ? stat.base_stat : 0
        )
        .filter((stat) => stat !== undefined)
        .reduce((accumulator, current) => accumulator + current, 0);
      return filters.toggle ? aTotal - bTotal : bTotal - aTotal;
    });
  } else if(filters.height) {
    filteredPokemon = filteredPokemon.sort((a, b) => {
      return filters.toggle ?  a.height - b.height : b.height - a.height;
    });
  } else if (filters.weight) {
    filteredPokemon = filteredPokemon.sort((a, b) => {
      return filters.toggle ?  a.weight - b.weight : b.weight - a.weight;
    });
  } else {
    filteredPokemon = filteredPokemon.sort((a, b) => {
      return filters.toggle ? b.id - a.id : a.id - b.id;
    });
  }

  console.log("filter function return list size:" + filteredPokemon.length);

  return filteredPokemon;
}
export default filterPokemon;
