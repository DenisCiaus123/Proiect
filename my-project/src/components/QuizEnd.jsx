import styles from "./QuizEnd.module.css";

export const QuizEnd = ({score, fetchData}) => {
    return (
        <div className={styles.quizEndScreen}>
            <h2>Quiz Complete!</h2>
            <p>Your final score is: <strong>{score}</strong></p>
            <button onClick={fetchData} className={styles.startQuizButton}>Play Again</button>
        </div>
    );
};