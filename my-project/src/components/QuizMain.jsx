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
  timer = 10000,
}) => {
  const [answers, setAnswers] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [timeLeft, setTimeLeft] = useState(timer);

  useEffect(() => {
    if (!showResult && timer) {
      setTimeLeft(timer);
      const interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1000) {
            playSounds("/sounds/timesUp.mp3", isMuted);
            clearInterval(interval);
            setSelectedAnswer(null);
            setShowResult(true);
            setTimeout(() => {
              setEntityIndex((prev) => prev + 1);
            }, 2000);
            return 0;
          }
          return prev - 1000;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [entity, showResult, timer, isMuted]);

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
    if (selectedAnswer === null) return styles.answerButton;
    return `${styles.answerButton} ${styles.incorrect}`;
  };

  const symbolSrc =
    categorySymbols[decodeHtml(entity.category)] ||
    "src/images/categories/symbol_any.png";
  return (
    <>
      {" "}
      <div>
        <button onClick={toggleMute} className={styles.muteButton}>
          <img
            src={isMuted ? volumeOff : volumeOn}
            alt={isMuted ? "Unmute" : "Mute"}
            width={40}
            height={40}
          />
        </button>
      </div>
      <div className={styles.timerContainer}>
        <span className={styles.timerValue}>
          {timer && timeLeft > 999
            ? `Time Remaining: ${Math.ceil(timeLeft / 1000)} seconds`
            : `Time's up!`}
        </span>
      </div>
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
