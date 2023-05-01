import { useEffect, useState, React } from "react";
import "../css/evolutionDetails.css";


function EvolutionDetail({evolutionDetails}){
    const [keys, setKeys] = useState([])
    const [values, setValues] = useState([])


    useEffect (() => {
        if (evolutionDetails)
        {

            console.log(evolutionDetails)
            setKeys(Object.keys(evolutionDetails))
        }
    }, [])



    return(<>
    <div className="evolution-detail-container">
    {keys.length > 0 && keys.map((key, index) => {
    let value = evolutionDetails[key];

    if (value == null || value === "" || value === false || value === 0) return null;
    
    if (typeof value === 'object' && value !== null && value.hasOwnProperty('name')) {
        value = value.name;
      }
      
    if 
    (key === "min_level") {
        key = "lvl"
    }
    if (key === "min_happiness") {
        key = "Happiness"

    }
    let string = "";
    if (key === "trigger" || key === "time_of_day" || key === "item")
    {
        string = value;
    } else {
    string = `${key}: ${value}`;
    }

    if (key === "known_move_type") {
        string = `Move Type: ${value}`;
    }
    if (key === "min_beauty") {
        string = `Beauty: ${value}`;
    }
    if (key === "min_affection") {
        string = `Affection: ${value}`;
    }
    if (key=== "gender")
    {
        if (value === 1) string = "female"
        if (value === 2) string = "male"
        if (value === 3) string = "genderless"
    }
    if (key === "relative_physical_stats") {
        if (value === 1) string = "Attack > Defense"
        if (value === 0) string = "Attack = Defense"
        if (value === -1) string = "Attack < Defense"
    }
    if (key === "needs_overworld_rain") {
        if (value === true) string = "Needs Rain"
        if (value === false) string = "Doesn't Need Rain"
    }
    if (key === "turn_upside_down") {
        if (value === true) string = "Turn Upside Down"
        if (value === false) string = "Doesn't Turn Upside Down"
    }
    if (key === "party_species") {
        string = `Party Species: ${value}`
    }




    if (key === "trigger") return null;
    
    return (
    <div key={index + key} className="evolution-detail">
        <p key={index + value + key + string}>{string}</p>
    </div>)


    })}
       {evolutionDetails && <p className="Arrow">→</p>}
        </div>
    </>)
} export default EvolutionDetail;
