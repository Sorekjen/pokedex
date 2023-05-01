import React, { useRef, useCallback, useEffect, useState } from "react";
import "../css/filterbox.css";
import Button from "./Button.js";
import SearchInput from "./SearchInput.js";
import GenButton from "./GenButton";


function FilterBox({ callback, filterProperties }) {
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
  const [searchToggle, setSearchToggle] = useState(false);

  const [dropToggle, setDropToggle] = useState({gen: filterProperties.genRange.length === 0, type: false, sort: false});
  const [filter, setFilter] = useState(filterProperties);

  


  useEffect(() => {
    console.log("------------------------" + filter.genRange);
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
        return { ...prevFilter, stats: [], weight: !prevFilter.weight, height: !prevFilter.weight ? false : prevFilter.height };
      }
      if (label === "id") {
        return { ...prevFilter, stats: [], weight: "", height: "" };
      }
    });
  }, [filter]
  );

  const handleSortToggle = useCallback((toggle) => {
    setFilter((prevFilter) => {

      return { ...prevFilter, toggle: !prevFilter.toggle };

    });
  }, [filter]
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

  const handleDropToggleClick = (nameOfClicked) => {
    setDropToggle((prevDropTable) => {
      if (nameOfClicked === "gen") {
        return {sort: false, gen: !prevDropTable.gen, type: false};
      }
      if (nameOfClicked === "type") {
        return {sort: false, type: !prevDropTable.type, gen: false};
      }
      if (nameOfClicked === "sort") {
        return {gen: false, sort: !prevDropTable.sort, type: false};
      }
})
};
  const handleSearch = (search) => {
    setDropToggle({gen: false, type: false, sort: false})
    setFilter((prevFilter) => {
      return { ...prevFilter, search: search, genRange: [1,2,3,4,5,6,7,8,9] };
    });
  };



  return ( 
    
      (<div className="filterbox">
        <div className="drop-list">
        <ul>
          <li>
            {dropToggle ? ["gen", "type", "sort"].map((drop, i) => {
              return (
                <a key={i} className={dropToggle[drop] ? 'active' : ''} onClick={() => handleDropToggleClick(drop)}>
                  {`${drop}   ${dropToggle[drop] ? "▽" : "△"}`}
                </a>
              );
            } ) : ""}
          </li>

        </ul>

        <div className="search-container">
        <SearchInput
            callback={handleSearch}/>
          </div>

        </div>
        <div className="gen-drop" style={{ display: dropToggle?.gen ? "" : 'none' }}>
          <div className="gen-container">

            {[[1,0], [2,151], [3, 251], [4, 386], [5, 494], [6,649], [7, 721], [8, 809], [9, 905]].map((gen) => {
              console.log(gen)
              return(
              <GenButton
                key={gen[0]+36}
                value={gen[0]}
                callback={handleGenClick}
                highlighted={filter.genRange.includes(gen[0])}
                halfhighlight={filter.genRange.length === 0}
                starterIdOffset={gen[1]}
              />
           ) })}
              {/*<Button
              key={10 + 36}
              value={"all-gens-button"}
              label={"test"} //filter.genRange.length === 0 ? "all" : "clear"}
              callback={() => { }}//handleGenClick
              highlighted={false}
              halfhighlight={true}
            /> */}
          </div>
          
        </div>
        <div className="type-drop" style={{ display: dropToggle?.type ? "" : 'none' }}>
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
                        key={i + 18}
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
          </div>
          </div>
        <div className="sort-drop" style={{ display: dropToggle?.sort ? "" : 'none' }}>
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
                halfhighlight={filter.stats?.length === 0}
                highlighted={filter.stats.includes(statName[0])}
              />
            ))}
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

          <div className="other-container">
          <Button
              key={102}
              value={filter.toggle ? "Ascending" : "Descending"}
              label={filter.toggle ? "⇄" : "⇆"}
              callback={handleSortToggle}
              highlighted={filter.toggle}
            />
          </div>
        </div>
        {dropToggle.gen || dropToggle.type || dropToggle.sort ? <a className="closeDrop" href="#" onClick={()=> setDropToggle({gen: false, type: false, sort: false})}>△</a> : null}
      <div id="dropdown"></div>
    </div>)
  )
}
export default FilterBox;
