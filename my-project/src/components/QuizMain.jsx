import { useEffect, useState } from "react";
import styles from "./QuizMain.module.css";
import shared from "./styles/Shared.module.css";
import { decodeHtml, addPoints, shuffle, applyDifficultyStyle } from "./utils";

export const QuizMain = ({entity, setEntityIndex, score, setScore}) => {
    const [answers, setAnswers] = useState([]);

    const checkAnswer = (e, entity) => {
        const answerText = e.target.textContent;
        if (entity.correct_answer === answerText) {
            setScore(prev => prev + addPoints(entity.type, entity.difficulty));
        }
        setEntityIndex(prev => prev + 1);
    };

    useEffect(() => {
        if (entity) {
            const allAnswers = shuffle([...entity.incorrect_answers, entity.correct_answer]);
            setAnswers(allAnswers.map(decodeHtml));
        }
    }, [entity]);

    return (
        <>
            {entity.type === "multiple" ? (
                <div className={`${styles.multipleChoiceGrid} ${shared[applyDifficultyStyle(entity.difficulty)]}`}>
                    {answers.map((answer, index) => (
                        <button
                            key={index}
                            className={styles.answerButton}
                            onClick={(e) => checkAnswer(e, entity)}>{answer}</button>
                    ))}
                </div>
            ) : (
                <div className={`${styles.booleanChoiceGrid} ${shared[applyDifficultyStyle(entity.difficulty)]}`}>
                    {answers.map((answer, index) => (
                        <button
                            key={index}
                            className={styles.answerButton}
                            onClick={(e) => checkAnswer(e, entity)}
                        >
                            {answer}
                        </button>
                    ))}
                </div>
            )}

            <div className={styles.scorePanel}>
                <span>Score: </span>
                <span>{score}</span>
            </div>
        </>
    );
};