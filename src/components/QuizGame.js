import React, { useState, useEffect } from 'react';
import Question from './Question.js';
import FinishScreen from './FinishScreen.js';
import QuizImage from './QuizImage.js';

const QuizGame = ({ questions, difficulty, setGameStart }) => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [reveal, setReveal] = useState(false);
    const [showFinishScreen, setShowFinishScreen] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [showInput, setShowInput] = useState(difficulty !== 'easy');

    const handleAnswerSelect = (answerIndex) => {
        console.log("asdadsa")
        setSelectedAnswer(answerIndex);
        setReveal(true);
        if (questions[currentQuestion].correctAnswerIndex === answerIndex) {
            setScore(score + 1);
        }
    };

    const handleNextQuestion = () => {
        if (currentQuestion === questions.length - 1) {
            setShowFinishScreen(true);
        } else {
            setReveal(false);
            setCurrentQuestion(currentQuestion + 1);
            setSelectedAnswer(null);
        }
    };

    const onAnswer = (answer) => {
        setReveal(true);
        if (questions[currentQuestion].options[questions[currentQuestion].correctAnswerIndex] === answer.toLowerCase()  ) {
            setScore(score + 1);
        }
        console.log(answer + ":" + questions[currentQuestion].options[questions[currentQuestion].correctAnswerIndex])
    };


    useEffect(() => {
        setShowInput(difficulty !== 'easy');
    }, [difficulty]);

    return (
        <div>
            {showFinishScreen ? (
                <FinishScreen score={score} setGameStart={setGameStart} />
            ) : (
                <>
                    <div className="quiz-header">
                        <button className="end-quiz-button" onClick={() => setShowFinishScreen(true)}>
                            &lt;
                        </button>
                        <h1>Who's that Pokémon!</h1>
                    </div>
                    <Question
                        question={questions[currentQuestion]}
                        selectedAnswer={selectedAnswer}
                        difficulty={difficulty}
                        reveal={reveal}
                        onAnswer={onAnswer}
                        onAnswerSelect={handleAnswerSelect}
                        handleNextQuestion={handleNextQuestion}
                    />
                </>
            )}
        </div>
    );
};

export default QuizGame;
