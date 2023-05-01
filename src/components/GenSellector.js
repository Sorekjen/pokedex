import {React, useState, } from "react";
import buttonColors from "../helpers/buttonColors.js";
import GenButton from "./GenButton.js";
import { useEffect } from "react";

function GenSelector({callback, value}) {

const [genRange, setGenRange] = useState([]);

  const handleClick = (gen) => {
    console.log("button clicked: " + gen + "GENSELECTOR QUIZ")
    setGenRange((prevState) => {
        if (prevState.includes(gen)) {
          return prevState.filter((x) => x !== gen)
        } else {
          return [...prevState, gen]
        }
      });
  }

useEffect (() => {
    callback(genRange);
}, [genRange])

return (
<div className="genSellector">
{[[1,0], [2,151], [3, 251], [4, 386], [5, 494], [6,649], [7, 721], [8, 809], [9, 905]].map((gen) => {
    return(
    <GenButton
      key={gen[0]+36}
      value={gen[0]}
      callback={handleClick}
      highlighted={genRange.includes(gen[0])}
      starterIdOffset={gen[1]}
    />
 ) })}
</div>
)} export default GenSelector;