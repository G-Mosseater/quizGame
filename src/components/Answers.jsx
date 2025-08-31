import { useRef } from "react";

export default function Answers({ answers, selectedAnswer, answerState, onSelect }) {

        const shuffledAnswers =  useRef()

  if (!shuffledAnswers.current) {
    shuffledAnswers.current = [...answers]; //create a new array
    shuffledAnswers.current.sort(() => Math.random() - 0.5); //shuffles answers
  }

  return (
    <ul id="answers">
      {shuffledAnswers.current.map((ansr) => {
        const isSelected = selectedAnswer === ansr;
        let cssClass = "";

        if (answerState === "answered" && isSelected) {
          cssClass = "selected";
        }
        if (
          (answerState === "correct" || answerState === "wrong") &&
          isSelected
        ) {
          cssClass = answerState;
        }

        return (
          <li key={ansr} className="answer">
            <button
              onClick={() => onSelect(ansr)}
              className={cssClass} disabled={answerState !== ''}
            >
              {ansr}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
