import React from "react";
import "../css/genButton.css";

function GenButton({callback, highlighted, value, halfhighlight, color, starterIdOffset}) {
  
    const handleClick = (e) => {
        e.preventDefault();
    console.log("button clicked: " + "gen: " + value)
    callback(value);
    return false;
  }

  const romanNumerals = [ "", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"];

  return (





 <a href='#' onClick={(e)=> handleClick(e)}>
    <div className={`gen-card-background ${highlighted ? "highlighted" : "" } ${halfhighlight ? "halfhighlight" : ""}`}>
    <div className={`gen-card`}>
        <div className="gen-image-box">
        <div className="gencard-pokemon one">
          <img style={{opacity: `${highlighted ? 1 : 0}`}} src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${starterIdOffset +1}.png`} alt={"pokemon"} />
          <img id="gen-silhouette" src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${starterIdOffset +1}.png`}/>
        </div>
        <div className="gencard-pokemon two">
          <img style={{opacity: `${highlighted ? 1 : 0}`}} src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${starterIdOffset +4}.png`} alt={"pokemon"} />
          <img id="gen-silhouette" src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${starterIdOffset +4}.png`}/>
        </div>
        <div className="gencard-pokemon three">
          <img className={`${highlighted ? "highlighted" : "notHighLighted"}`} src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${starterIdOffset + 7}.png`} alt={"pokemon"} />
          <img id="gen-silhouette" src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${starterIdOffset + 7}.png`}/>
        </div>
        </div>
        <div className="gen-card-content">
          <h3>{`Generation ${romanNumerals[value]}`}</h3>
        </div>
    </div>
    </div></a>
  );
} export default GenButton;