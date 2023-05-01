import "../css/difficultySelector.css"

import {React, useState} from 'react';

const DifficultySelector = ({ callback }) => {
  const [selectedDifficulty, setSelectedDifficulty] = useState("easy");

  const handleDifficultyChange = (event) => {
    console.log("changed difficulty to: " + event.target.value)
    setSelectedDifficulty(event.target.value);
    callback(event.target.value);
  };

  return (
    <div className="difficulty-selector">
      <button
        className={`difficulty-btn ${selectedDifficulty === "easy" ? "selected" : ""}`}
        id="easy"
        value="easy"
        onClick={handleDifficultyChange}
      >
        Easy
      </button>
      <button
        className={`difficulty-btn ${selectedDifficulty === "medium" ? "selected" : ""}`}
        id="medium"
        value="medium"
        onClick={handleDifficultyChange}
      >
        Medium
      </button>
      <button
        className={`difficulty-btn ${selectedDifficulty === "hard" ? "selected" : ""}`}
        id="hard"
        value="hard"
        onClick={handleDifficultyChange}
      >
        Hard
      </button>
      <button
        className={`difficulty-btn ${selectedDifficulty === "expert" ? "selected" : ""}`}
        id="expert"
        value="expert"
        onClick={handleDifficultyChange}
      >
        Expert
      </button>
    </div>
  );
};

export default DifficultySelector;
