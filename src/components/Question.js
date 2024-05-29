import React, { useState, useEffect } from "react";

function Question({ question, onAnswered }) {
  const [timeRemaining, setTimeRemaining] = useState(10);
  let timer = null;

  useEffect(() => {
    timer = setTimeout(() => {
      onAnswered(false); // Call onAnswered with false after 10 seconds
    }, 10000);

    const interval = setInterval(() => {
      setTimeRemaining((prevTime) => prevTime - 1);
    }, 1000);

    return () => {
      clearTimeout(timer); // Clear the timeout on component unmount
      clearInterval(interval); // Clear the interval on component unmount
    };
  }, []); // Empty dependency array ensures the effect only runs once

  const { id, prompt, answers, correctIndex } = question;

  function handleAnswer(isCorrect) {
    setTimeRemaining(10); // Reset the time remaining to 10 seconds
    onAnswered(isCorrect); // Call onAnswered with the answer result
    clearTimeout(timer); // Clear the timeout when an answer is selected
  }

  return (
    <>
      <h1>Question {id}</h1>
      <h3>{prompt}</h3>
      {answers.map((answer, index) => {
        const isCorrect = index === correctIndex;
        return (
          <button key={answer} onClick={() => handleAnswer(isCorrect)}>
            {answer}
          </button>
        );
      })}
      <h5>{timeRemaining} seconds remaining</h5>
    </>
  );
}

export default Question;