import React, { useState, useRef } from "react";
import QuizImage from "./QuizImage.js";
import "../css/question.css";
import { useEffect } from "react";
import { useHref } from "react-router-dom";
const Question = ({question, reveal, onAnswerSelect, onAnswer, handleNextQuestion, difficulty}) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const inputRef = useRef(null);
  const [finalAnswer, setFinalAnswer] = useState("");

  useEffect(() => {
    setFinalAnswer("");
    setSelectedAnswer(null);
    if (inputRef && inputRef?.current) {
      inputRef.current.value = "";
    }
  }, [question]);

  const handleAnswerSelect = (answerIndex) => {
    setSelectedAnswer(answerIndex);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      if (inputRef?.current?.value) {
        setFinalAnswer(inputRef.current.value);
      }
    }
  };



  const submit = () => {
    if (selectedAnswer !== null) {
      onAnswerSelect(selectedAnswer);
    }
    if (inputRef?.current?.value) {
      console.log(inputRef.current.value.toLowerCase())
      setFinalAnswer(inputRef.current.value.toLowerCase());
    }
  }
  useEffect(() => {
    if (finalAnswer) {
      console.log(finalAnswer)
      onAnswer(finalAnswer);
      if (finalAnswer !== question.options[question.correctAnswerIndex]) {
        
      }
    }
  }, [finalAnswer]);



  const handleInputAnswerChange = (event) => {
    inputRef.current.value = event.target.value;
  };

  return (
    <div className="question">
      <QuizImage reveal={reveal} id={question.id} difficulty={difficulty} />
      {reveal ? <h1>{question.options[question.correctAnswerIndex]}</h1> : <></>}
      <div className="question-options">
        <ul>
          {difficulty === "easy" || difficulty === 'medium' ?

            (question.options.map((option, index) => (<li key={index}>
              <button key={index} className={(reveal && index === question.correctAnswerIndex ? `correct ` : ``)+` `+(reveal && index === selectedAnswer && selectedAnswer !== question.correctAnswerIndex ? `incorrect ` : ``) + ` ` + (!reveal && selectedAnswer === index ? "highligthed " : "")} onClick={() => handleAnswerSelect(index)} disabled={reveal}>
                {option}
              </button>
            </li>
            )))
            : (<input
              type="text"
              onKeyDown={(e) => handleKeyDown(e)}
              className={(reveal && finalAnswer.toLowerCase() !== question.options[question.correctAnswerIndex] ? "incorrect" : "") + (reveal && finalAnswer.toLowerCase() === question.options[question.correctAnswerIndex] ? "correct" : "")}
              disabled={reveal}
              onChange={(e) => handleInputAnswerChange(e)}

              ref={inputRef}
            />)}
          <li>
            {reveal ? <button onClick={() => handleNextQuestion()} disabled={!reveal}>Next</button> : <button onClick={() => submit()} disabled={reveal}>Submit</button>}

          </li>
        </ul>
      </div>
    </div>
  );
};

export default Question;