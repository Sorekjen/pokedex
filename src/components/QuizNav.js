import GenSelector from "./GenSellector";
import { useEffect, useState } from "react";
import "../css/quizNav.css";
import DifficultySelector from "./DifficultySelector";

function QuizNav({ callback }) {
    const [selectedGens, setSelectedGens] = useState([]);
    const [selectedDifficulty, setSelectedDifficulty] = useState("easy");
    const [menuStatus, setMenuStatus] = useState({ gen: false, diff: false });


    useEffect   (() => {
        callback({gens: selectedGens, difficulty: selectedDifficulty});
        console.log("settings changed" + selectedGens + selectedDifficulty)
    }, [selectedGens, selectedDifficulty])

    function toggleGen() {
        console.log("gentoggle" + menuStatus.gen)
        if (menuStatus.gen) {
            setMenuStatus({ gen: false, diff: false });
        } else {
            setMenuStatus({ gen: true, diff: false });
        }
    }

    function toggleDifficulty() {
        if (menuStatus.diff) {
            setMenuStatus({ gen: false, diff: false });
        } else {
            setMenuStatus({ gen: false, diff: true });
        }
    }


    return (
        <>
            <div className={`menu gen  ${menuStatus.gen ? `show` : `` }`} >
            <GenSelector 
               
                    callback = {setSelectedGens}/>
            </div>
            <div className={`menu difficulty  ${menuStatus.diff ? `show` : `` }`} >
            <DifficultySelector 
                    callback = {setSelectedDifficulty}/>
            </div>

        <div className="navbar">
            <button className="menu-btn" onClick={()=> toggleGen()}>Generation</button>
            <button className="menu-btn" onClick={()=> toggleDifficulty()}>Difficulty</button>
        </div>
        </>
    )
} export default QuizNav;