import { useState, useCallback, useRef } from "react";
import QUIESTIONS from "../questions";
import QuestionTimer from "./QuestionTimer";
import Answers from "./Answers";
import Question from "./Question";
import Summary from "./Sumarry";
export default function Quiz() {
  // try to manage as little state as possible
  // the active question can be derived from answer state
  //   const [answerState, setAnswerState] = useState("");
  const [answer, setAnswer] = useState([]);
  const [quizStarted, setQuizStarted] = useState(false);

  const activeQuestion = answer.length;
  function handleRestart() {
    setAnswer([]), setQuizStarted(true);
  }

  const quizIsComplete = activeQuestion === QUIESTIONS.length; // check if the active questions has the same length of quiestions array

  //get the selected answer as a paramater to update the state, the onclick event should be a function pointing to to handleSelectAnswer
  const handleSelectAnswer = useCallback(function handleSelectAnswer(
    selectedAnswer
  ) {
    //   setAnswerState("answered");
    //to not lose the previous answers use a function on the setUpdatedstate to get the previous answers
    setAnswer((prevUserAnswers) => {
      return [...prevUserAnswers, selectedAnswer]; //returns an array of previous answers and appends the new answer
    });
    // create a new state
    // check if the selected answer is correct
    // answer at position [0] is correct for all questions in the dataset
    //   setTimeout(() => {
    //     if (selectedAnswer === QUIESTIONS[activeQuestion].answers[0]) {
    //       //whenever activeQuestion changes we have to re-render the function. add as dependency array
    //       setAnswerState("correct");
    //     } else {
    //       setAnswerState("wrong");
    //     }
    //     setTimeout(() => {
    //       setAnswerState("");
    //     }, 2000);
    //   }, 1000);
  },
  []);
  //empty array = function is created only once and reused
  // useCallback
  //  Normally, functions inside a component get recreated every time the component re-renders
  //  This can cause problems if we pass the function to child components (like QuestionTimer)
  //   because React will think it's a "new function" on every render and may reset things like timers
  // useCallback "remembers" the function between renders, unless its dependencies change
  //  In short: useCallback = memoized (cached) function → improves performance + avoids bugs

  const handleSkipAnswer = useCallback(
    () =>
      // if no answer is chosen in time, just push null into the array

      handleSelectAnswer(null),
    //  handleSkipAnswer depends on handleSelectAnswer,
    // so we add it in the dependency array. This way React knows:
    // "if handleSelectAnswer changes, update handleSkipAnswer too"
    [handleSelectAnswer]
  );
  if (!quizStarted) {
    return (
      <div id="start-screen">
        <h2>Welcome to the Quiz!</h2>
        <button onClick={() => setQuizStarted(true)}>Start Quiz</button>
      </div>
    );
  }
  if (quizIsComplete) {
    return (
      <div className="restart-container">
        <Summary userAnswers={answer} />
        <button id="restart-btn" onClick={handleRestart}>
          Restart Quiz
        </button>
      </div>
    );
  }

  return (
    <div id="quiz">
      <Question
        key={activeQuestion}
        index={activeQuestion}
        onSelectAnswer={handleSelectAnswer}
        onSkipAnswer={handleSkipAnswer}
      />
        <div className="restart-container">
        <button id="restart-btn" onClick={handleRestart}>
          Restart Quiz
        </button>
      </div>
    </div>
  );
}
