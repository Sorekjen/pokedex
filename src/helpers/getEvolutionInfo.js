function getEvolutionInfo(chain, visited = new Set(), evolvesFrom, evolution_level = 0) {

    console.log("evolutionInfo called:")
    console.log(visited)
    if(chain.length === 0 || chain === undefined || chain === null || chain?.chain === undefined || chain?.chain === null) 
    {
        console.log("chain.length === 0")
        return;
    }
    console.log(chain.length)
    let evolutionInfo = [];
    let evolutionChain = chain.chain;
  
    // Check if this species has already been visited
    if (visited.has(evolutionChain.species.url)) {
      return evolutionInfo;
    }
    visited.add(evolutionChain.species.url);
  
    let evolutionDetails = evolutionChain.evolution_details?.[0];
    evolutionInfo.push({
      evolutionDetails: evolutionDetails,
      evolution_level: evolution_level,
      species_name: evolutionChain.species.name,
      species: evolutionChain.species,
      min_level: !evolutionDetails ? null : evolutionDetails.min_level,
      trigger_name: !evolutionDetails ? null : evolutionDetails.trigger.name,
      item: !evolutionDetails ? null : evolutionDetails.item,
      url: evolutionChain.species.url,
      evolves_to: evolutionChain.evolves_to.map((evolveTo) => (evolveTo)),
      evolves_from: !evolvesFrom ? null : evolvesFrom
    });
    console.log("evolutionInfo:")
    evolvesFrom = evolutionChain.species;
    evolution_level++;
    // Check if there are multiple evolves_to paths
    if (evolutionChain.evolves_to.length > 1) {
      for (const evolution of evolutionChain.evolves_to) {
        // Recursively call the function to handle each path
        const subEvolutionInfo = getEvolutionInfo({chain: evolution}, visited, evolvesFrom, evolution_level);
        if (subEvolutionInfo.length > 0) {
          evolutionInfo.push(...subEvolutionInfo);
        }
      }
    }
  
    // Check if there is a single evolves_to path
    else if (evolutionChain.evolves_to.length === 1) {
      const subEvolutionInfo = getEvolutionInfo({chain: evolutionChain.evolves_to[0]}, visited, evolvesFrom, evolution_level);
      if (subEvolutionInfo.length > 0) {
        evolutionInfo.push(...subEvolutionInfo);
      }
    }
    console.log("evolutionInfo returned:")
    console.log(evolutionInfo)
    return evolutionInfo;
  }
  
  export default getEvolutionInfo;
  