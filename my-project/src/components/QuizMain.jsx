import { useEffect, useState } from "react";
import styles from "./QuizMain.module.css";
import shared from "./styles/Shared.module.css";
import { categorySymbols } from "./CategorySymbols";
import { playSounds } from "./utils/utils";
import volumeOn from "../images/volumeOn.png";
import volumeOff from "../images/volumeOff.png";

import {
  decodeHtml,
  addPoints,
  shuffle,
  applyDifficultyStyle,
} from "./utils/utils";

export const QuizMain = ({
  entity,
  setEntityIndex,
  score,
  setScore,
  entityIndex,
  totalQuestions,
  restartQuizSameSettings,
  isMuted,
  toggleMute,
}) => {
  const [answers, setAnswers] = useState([]);
  const [, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    if (entity) {
      const allAnswers = shuffle([
        ...entity.incorrect_answers,
        entity.correct_answer,
      ]);
      setAnswers(allAnswers.map(decodeHtml));
      setSelectedAnswer(null);
      setShowResult(false);
    }
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  }, [entity]);
  const checkAnswer = (e) => {
    if (showResult) return;
    const answerText = e.target.textContent;
    setSelectedAnswer(answerText);
    setShowResult(true);
    if (entity.correct_answer === answerText) {
      playSounds("/sounds/correct.mp3", isMuted);
      setScore((prev) => prev + addPoints(entity.type, entity.difficulty));
    } else {
      playSounds("/sounds/wrong.mp3", isMuted);
    }
    setTimeout(() => {
      setEntityIndex((prev) => prev + 1);
    }, 1500);
  };
  const getButtonClass = (answer) => {
    if (!showResult) return styles.answerButton;
    if (answer === decodeHtml(entity.correct_answer))
      return `${styles.answerButton} ${styles.correct}`;
    return `${styles.answerButton} ${styles.incorrect}`;
  };

  const symbolSrc =
    categorySymbols[decodeHtml(entity.category)] ||
    "src/images/categories/symbol_any.png";
  return (
    <>
      <button onClick={toggleMute} className={styles.muteButton}>
        <img
          src={isMuted ? volumeOff : volumeOn}
          alt={isMuted ? "Unmute" : "Mute"}
          width={40}
          height={40}
        />
      </button>
      <div
        className={`${styles.card} ${
          styles[applyDifficultyStyle(entity.difficulty)]
        }`}
      >
        <span className={styles.questionNumber}>
          {`Remaining questions: ${totalQuestions - entityIndex}`}
        </span>
        <div className={styles.questionContainer}>
          <img
            src={symbolSrc}
            alt="Category Symbol"
            className={styles.categorySymbol}
          />
          <div className={styles.bar} />
          <h3 className={shared.quizQuestion}>{decodeHtml(entity.question)}</h3>
        </div>

        <div
          className={
            entity.type === "multiple"
              ? styles.multipleChoiceGrid
              : styles.booleanChoiceGrid
          }
        >
          {answers.map((answer, index) => (
            <button
              key={index}
              className={getButtonClass(answer)}
              onClick={checkAnswer}
              disabled={showResult}
            >
              {answer}
            </button>
          ))}
        </div>

        <div className={styles.scorePanel}>
          <span>Score: {score}</span>
        </div>
        <div>
          <button
            className={styles.resetQuizButton}
            onClick={restartQuizSameSettings}
          >
            Restart Quiz
          </button>
        </div>
      </div>
    </>
  );
};
