function groupEvolutionInfo(evolutionInfo) {
    const groupedInfo = {};
    for (const info of evolutionInfo) {
      let key = info.evolution_level;
      if (groupedInfo[key]) {
        groupedInfo[key].push(info);
      } else {
        groupedInfo[key] = [info];
      }
    }
    console.log("groupedInfo:")
    console.log(groupedInfo)
    return groupedInfo;
  }  export default groupEvolutionInfo;