import React from "react";
import buttonColors from "../helpers/buttonColors.js";

function Button({label, callback, highlighted, value, halfhighlight, color}) {
  const handleClick = () => {
    console.log("button clicked: " + label)
    callback(value);
  }
  let  colorOfButton;
  if (typeof color === "undefined" || color === null || color === "") {
    colorOfButton = buttonColors[value];
  } else {
    colorOfButton = buttonColors[color];
  }

  return (
    <button
        className={`${value} ${highlighted ? "highlighted" : "" } ${halfhighlight ? "halfhighlight" : ""}`}
        onClick={()=> handleClick(value)}
        style={{background: `${colorOfButton}`}}
      
    >
      {label}
    </button>
  );
} export default Button;