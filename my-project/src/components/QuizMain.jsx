import { useEffect, useState } from "react";
import styles from "./QuizMain.module.css";
import shared from "./styles/Shared.module.css";
import { categorySymbols } from "./CategorySymbols";

import { decodeHtml, addPoints, shuffle, applyDifficultyStyle } from "./utils";

export const QuizMain = ({ entity, setEntityIndex, score, setScore }) => {
  const [answers, setAnswers] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
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
  }, [entity]);

  const checkAnswer = (e) => {
    if (showResult) return;
    const answerText = e.target.textContent;
    setSelectedAnswer(answerText);
    setShowResult(true);
    if (entity.correct_answer === answerText) {
      setScore((prev) => prev + addPoints(entity.type, entity.difficulty));
    }
    setTimeout(() => {
      setEntityIndex((prev) => prev + 1);
    }, 3000);
  };
  const getButtonClass = (answer) => {
    if (!showResult) return styles.answerButton;
    if (answer === decodeHtml(entity.correct_answer))
      return `${styles.answerButton} ${styles.correct}`;
    if (answer === selectedAnswer)
      return `${styles.answerButton} ${styles.incorrect}`;
    return `${styles.answerButton} ${styles.restButtons}`;
  };
  const symbolSrc =
    categorySymbols[decodeHtml(entity.category)] ||
    "src/images/categories/symbol_any.png";

  return (
    <>
      <div
        className={`${styles.card} ${
          styles[applyDifficultyStyle(entity.difficulty)]
        }`}
      >
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
          <span>Score: </span>
          <span>{score}</span>
        </div>
      </div>
    </>
  );
};
