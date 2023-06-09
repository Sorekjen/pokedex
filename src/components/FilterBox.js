import React, { useCallback, useEffect, useState } from "react";
import "../css/filterbox.css";
import Button from "./Button.js";


function FilterBox({ callback }) {
  const types = [
    "bug",
    "dark",
    "dragon",
    "electric",
    "fairy",
    "fighting",
    "fire",
    "flying",
    "ghost",
    "grass",
    "ground",
    "ice",
    "normal",
    "poison",
    "psychic",
    "rock",
    "steel",
    "water",
  ];
  const [typeToggle, setTypeToggle] = useState("primary");
  const [filterToggle, setFilterToggle] = useState(true);


  const [filter, setFilter] = useState({
    stats: [],
    height: false,
    weight: false,
    genRange: [],
    primaryType: "",
    secondaryType: "",
    toggle: false,
  });

  useEffect(() => {
    callback(filter);
  }, [filter]);

  const handleTypeToggleClick = useCallback((toggle) => {
    setTypeToggle((prevTypeToggle) => {
      return toggle;
    });
  }, [typeToggle]);

  const handlePTypeClick = useCallback(
    (type) => {
      setFilter((prevFilter) => {
        return {
          ...prevFilter,
          primaryType: prevFilter.primaryType === type ? "" : type,
        };
      });
    },
    [filter]
  );

  const handleSTypeClick = useCallback(
    (type) => {
      setFilter((prevFilter) => {
        return {
          ...prevFilter,
          secondaryType: prevFilter.secondaryType === type ? "" : type,
        };
      });
    },
    [filter]
  );

  const handleStatClick = useCallback(
    (statName) => {



      setFilter((prevFilter) => {
        return {
          ...prevFilter, height: false, weight: false,
          stats: prevFilter.stats.includes(statName)
            ? prevFilter.stats.filter((x) => x !== statName)
            : prevFilter.stats.concat(statName),
        };
      });
    },
    [filter]
  );

  const handleOtherClick = useCallback((label) => {
    setFilter((prevFilter) => {
      if (label === "height") {
        return { ...prevFilter, stats: [], height: !prevFilter.height, weight: !prevFilter.height ? false : prevFilter.weight };
      }
      if (label === "weight") {
        return { ...prevFilter, stats: [], weight: !prevFilter.weight, height: !prevFilter.weight ? false : prevFilter.height};
      }
      if (label === "id") {
        return { ...prevFilter, stats: [], weight: "", height: ""};
      }
    });
    },[filter]
  );

  const handleSortToggle = useCallback((toggle) => {
    setFilter((prevFilter) => {
      
        return { ...prevFilter, toggle: !prevFilter.toggle };
      
    });
    },[filter]
  );

  const handleGenClick = useCallback(
    (gen) => {
if (gen === 0) {
  setFilter((prevState) => {
    return {
      ...prevState,
      genRange: prevState.genRange.length > 0 ? [] : [1, 2, 3, 4, 5, 6, 7, 8, 9]
    };
  });
  return;
}

      setFilter((prevState) => {
        if (prevState.genRange.includes(gen)) {
          return {
            ...prevState,
            genRange: prevState.genRange.filter((x) => x !== gen),
          };
        } else {
          return {
            ...prevState,
            genRange: [gen, ...prevState.genRange],
          };
        }
      });
    },
    [filter]
  );

  return (
    <div id="filterbox" className="filterbox">
    <button onClick={()=> {setFilterToggle((prevState) => !prevState )}}>Filter</button>

    <div id="dropdown" style={{display: filterToggle ?  'none' : ""}}>
      <h3>Generation</h3>
      <div className="gen-container">
          {[[1, "kanto (1)"], [2, "johto (2)"], [3, "Hoenn (3)"], [4, "sinnoh (4)"], [5, "unova (5)"], [6, "kalos (6)"], [7, "Alola (7)"], [8, "Galar (8)"], [9, " T_T (9)"]].map((gen) => (
            <Button
              key={gen+36}
              value={gen[0]}
              label={gen[1]}
              callback={handleGenClick}
              highlighted={filter.genRange.includes(gen[0])}
              halfhighlight={filter.genRange.length === 0}
            />
          ))}
          <Button
              key={10+36}
              value={0}
              label={"test"} //filter.genRange.length === 0 ? "all" : "clear"}
              callback={()=>{}}//handleGenClick
              highlighted={false}
              halfhighlight={true}
            />
        </div>
        <h3>Type</h3>

      <Button
          key={98}
          value={"primary"}
          color={filter.primaryType}
          label={filter.primaryType === "" ? "primary" : filter.primaryType}
          callback={handleTypeToggleClick}
          id={1}
          highlighted={typeToggle === "primary"}
          />
          <Button
          key={99}
          value={"secondary"}
          color={filter.secondaryType}
          label={filter.secondaryType === "" ? "secondary" : filter.secondaryType}
          callback={handleTypeToggleClick}
          id={1}
          highlighted={typeToggle === "secondary"}
          />
      <div>
        <div className="type-container">
         
          {typeToggle === "primary" && 
          <div className="primaryTypeContainer">
          {types.map((type, i) => {
                  return (
                    <Button
                      key={i}
                      value={type}
                      label={type}
                      callback={handlePTypeClick}
                      id={i}
                      highlighted={filter.primaryType === type}
                      halfhighlight={filter.primaryType === ""}
                    />
                  );
                })}
          </div>
          }
          {typeToggle === "secondary" &&
          <div className="secondaryTypeContainer">
          {types.map((type, i) => {
                  return (
                    <Button
                      key={i+18}
                      value={type}
                      label={type}
                      callback={handleSTypeClick}
                      id={i}
                      highlighted={filter.secondaryType === type}
                      halfhighlight={filter.secondaryType === ""}
                    />
                  );
                })}
          </div>
        }
        </div>
        
        <h3>Sort by:</h3>

        <div className="stat-container">
          {[
            ["hp", "hp"],
            ["special-attack", "sp. atk"],
            ["attack", "attack"],
            ["special-defense", "sp. def"],
            ["defense", "defense"],
            ["speed", "speed"],
          ].map((statName) => (
            <Button
              key={statName}
              value={statName[0]}
              label={statName[1]}
              callback={handleStatClick}
              halfhighlight={filter.stats.length === 0}
              highlighted={filter.stats.includes(statName[0])}
            />
          ))}
        </div>

        <div className="other-container">
          <Button
            key={100}
            value={"height"}
            label={"height"}
            callback={handleOtherClick}
            highlighted={filter.height}
            halfhighlight={!filter.height && !filter.weight}
          />
          <Button
            key={101}
            value={"weight"}
            label={"weight"}
            callback={handleOtherClick}
            highlighted={filter.weight}
            halfhighlight={!filter.height && !filter.weight}
          />
            <Button
            key={102}
            value={"id"}
            label={"id"}
            callback={handleOtherClick}
            highlighted={false}
            halfhighlight={true}
          />
        </div>

        <div className="direction-container">
          <Button
            key={102}
            value={filter.toggle ? "Ascending" : "Descending"}
            label={filter.toggle ? "Ascending" : "Descending"}
            callback={handleSortToggle}
            highlighted={filter.toggle}
          />
        </div>
      </div>
    </div>
    </div>
  );
}

export default FilterBox;
