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
if (gen === "all") {
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
    <div className="filterbox">
      <h3>Filters:</h3>
      <Button
          key={98}
          label={"primary"}
          callback={handleTypeToggleClick}
          id={1}
          highlighted={typeToggle === "primary"}
          />
          <Button
          key={99}
          label={"secondary"}
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
                      label={type}
                      callback={handlePTypeClick}
                      id={i}
                      highlighted={filter.primaryType === type}
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
                      label={type}
                      callback={handleSTypeClick}
                      id={i}
                      highlighted={filter.secondaryType === type}
                    />
                  );
                })}
          </div>
        }
        </div>
        
        <div className="gen-container">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, "all"].map((gen) => (
            <Button
              key={gen+36}
              label={gen}
              callback={handleGenClick}
              highlighted={filter.genRange.includes(gen)}
            />
          ))}
        </div>

        <div className="stat-container">
          {[
            "hp",
            "attack",
            "defense",
            "s-attack",
            "s-defense",
            "speed",
          ].map((statName) => (
            <Button
              key={statName}
              label={statName.includes("special") ? statName.replace("special", "s") : statName}
              callback={handleStatClick}
              highlighted={filter.stats.includes(statName)}
            />
          ))}
        </div>

        <div className="other-container">
          <Button
            key={100}
            label={"height"}
            callback={handleOtherClick}
            highlighted={filter.height}
          />
          <Button
            key={101}
            label={"weight"}
            callback={handleOtherClick}
            highlighted={filter.weight}
          />
        </div>

        <div className="direction-container">
          <Button
            key={102}
            label={filter.toggle ? "Ascending" : "Descending"}
            callback={handleSortToggle}
            highlighted={filter.toggle}
          />
        </div>
      </div>
    </div>
  );
}

export default FilterBox;
