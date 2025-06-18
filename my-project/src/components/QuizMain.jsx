import { useEffect, useState } from "react";
import styles from "./QuizMain.module.css";
import shared from "./styles/Shared.module.css";
import { categorySymbols } from "./CategorySymbols";

import { decodeHtml, addPoints, shuffle, applyDifficultyStyle } from "./utils";

export const QuizMain = ({ entity, setEntityIndex, score, setScore }) => {
    const [answers, setAnswers] = useState([]);

    useEffect(() => {
        if (entity) {
            const allAnswers = shuffle([...entity.incorrect_answers, entity.correct_answer]);
            setAnswers(allAnswers.map(decodeHtml));
        }
    }, [entity]);

    const checkAnswer = (e) => {
        const answerText = e.target.textContent;
        if (entity.correct_answer === answerText) {
            setScore(prev => prev + addPoints(entity.type, entity.difficulty));
        }
        setEntityIndex(prev => prev + 1);
    };

    const symbolSrc = categorySymbols[decodeHtml(entity.category)] || "src/images/categories/symbol_any.png";

    return (
        <>
            <div className={`${styles.card} ${styles[applyDifficultyStyle(entity.difficulty)]}`}>
                <div className={styles.questionContainer}>
                    <img src={symbolSrc} alt="Category Symbol" className={styles.categorySymbol}/>
                    <div className={styles.bar}/>
                    <h3 className={shared.quizQuestion}>{decodeHtml(entity.question)}</h3>
                </div>

                <div className={entity.type === "multiple" ? styles.multipleChoiceGrid : styles.booleanChoiceGrid}>
                    {answers.map((answer, index) => (
                        <button
                            key={index}
                            className={styles.answerButton}
                            onClick={checkAnswer}
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
