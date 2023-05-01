import { React, useState } from "react";
import buttonColors from "../helpers/buttonColors.js";
import GenSellector from "./GenSellector.js";
import DifficultySelector from "./DifficultySelector.js";
import { useEffect } from "react";

function QuizSettings({callback}) {
    const [selectedGens, setSelectedGens] = useState([]);
    const [selectedDifficulty, setSelectedDifficulty] = useState("easy");

    useEffect   (() => {
        callback({gens: selectedGens, difficulty: selectedDifficulty});
        console.log("settings changed" + selectedGens + selectedDifficulty)
    }, [selectedGens, selectedDifficulty])
        

    return (
        <div className="quizSettings">
            <div className="quizSettingsContainer">
                <GenSellector
                    callback={setSelectedGens}
                />
                <DifficultySelector 
                    onChange={setSelectedDifficulty}
                />
            </div>
        </div>
    );
} export default QuizSettings;