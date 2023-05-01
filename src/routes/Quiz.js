import { Link, useParams } from "react-router-dom";
import { useLocation } from "react-router";
import { React, useEffect, useState } from "react";
import QuizNav from "../components/QuizNav.js";
import fetchPokemonGenerations from "../helpers/fetchPokemonGenerations.js";
import QuizImage from "../components/QuizImage.js";
import QuizGame from "../components/QuizGame.js";
import "../css/quiz.css"

function Quiz() {
  const [pokemonToGuess, setPokemonToGuess] = useState(null);
  const [pokemonList, setPokemonList] = useState(null);
  const [settings, setSettings] = useState({ gens: [], difficulty: "easy" });
  const [questions, setQuestions] = useState([]);
  const [gameStart, setGameStart] = useState(false);

  async function fetchPokemonToGuess() {
    console.log("fetching" + settings.gens);
    fetchPokemonForQuestions(await fetchPokemonGenerations(settings.gens));
  }


    async function fetchPokemonForQuestions(pokemonList) {
      console.log("pokemonList changed" + pokemonList);
      if (!pokemonList || pokemonList.length === 0) return;

      let tempId = 0;
      let pokemonIdArray = [];

      console.log(pokemonList);
      for (let i = 0; i < 10; i++) {
        tempId = Math.floor(Math.random() * pokemonList.length);
        while (pokemonIdArray.includes(tempId)) {
          tempId = Math.floor(Math.random() * pokemonList.length);
        }
        pokemonIdArray.push(pokemonList[tempId]);
        console.log(pokemonList[tempId]);
      }
      setPokemonToGuess(pokemonIdArray);
    }




  useEffect(() => {
    console.log("---------" + pokemonToGuess)
    if(pokemonToGuess === "" || !pokemonToGuess || !pokemonList || !pokemonToGuess[0] ||typeof pokemonToGuess[0] === undefined) {return};
    console.log("handleQuiz: " + pokemonToGuess.map((pokemon) => pokemon))
    console.log("quiz pokemonList filtered to show pokemontoGuess" + pokemonList.filter((pokemon) => pokemonToGuess.includes(pokemon.name)))

    if (!pokemonToGuess) return;

    let newQuestions = [];

    for (let i = 0; i < pokemonToGuess.length; i++) {
      let op = setOptions(pokemonToGuess[i]);
      console.log("op: " + op.options + " " + op.correctAnswerIndex + " " + op.options[op.correctAnswerIndex] + " " + pokemonToGuess[i])

      newQuestions.push({
        question: pokemonToGuess[i].name,
        id: pokemonToGuess[i].id,
        options: op.options,
        correctAnswerIndex: op.correctAnswerIndex
      })
    }

    setQuestions(newQuestions);

    function setOptions(pokemonToGuess) {
      let newOptions = [];
      for (let i = 0; i < 4; i++) {
        let tempName = "";
        while (tempName === "" || newOptions.includes(tempName) || tempName === pokemonToGuess.name) {
          tempName = pokemonList[Math.floor(Math.random() * pokemonList.length)].name;
        }
        newOptions.push(tempName);
        console.log("tempName" + tempName)
      }
      console.log("newOptions: " + newOptions.map((pokemon) => pokemon))
      newOptions[Math.floor(Math.random() * 4)] = pokemonToGuess.name;
      console.log("newOptions: " + newOptions.map((pokemon) => pokemon))

      let answerIndex = newOptions.indexOf(pokemonToGuess.name);
      return {options: newOptions, correctAnswerIndex: answerIndex};
    }
  }, [pokemonToGuess])


  useEffect(() => {
    if (!questions) return;
    if (questions.length === 0) return;
    console.log("questions changed");
    console.log(questions);
    setGameStart(true);
  }, [questions])


  return (<>
    {gameStart ? <QuizGame questions={questions} difficulty={settings.difficulty} setGameStart={setGameStart} /> :
      <div className="quiz-start">
                    <h1>Choose at least 1 gen:</h1>

        <QuizNav callback={setSettings} />
        <button className="startbutton" onClick={() => fetchPokemonToGuess(10)}>Start Quiz</button>
      </div>
    }
  </>)
} export default Quiz;