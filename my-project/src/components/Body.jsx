import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./bodyStyle.module.css";

export const Body = () => {
    const [loading, setLoading] = useState(false);
    const [fetchedEntries, setFetchedEntries] = useState([]);
    const [entry, setEntry] = useState(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [answers, setAnswers] = useState([]);

    function decodeHtml(htmlCode) {
        const txt = document.createElement("textarea");
        txt.innerHTML = htmlCode;
        return txt.value;
    };

    const addPoints = (type, difficulty) => {
        let points = 0;

        if (type === "multiple") {
            points += 2;
        }
        else {
            points += 0;
        }

        if (difficulty === "easy") {
            points += 1;
        }
        else if (difficulty === "medium") {
            points += 2;
        }
        else {
            points += 3;
        }

        return points;
    }

    const checkAnswer = (e, entry) => {
        const answerText = e.target.textContent;
        if (entry.correct_answer === answerText) {
            setScore(prevScore => prevScore + addPoints(entry.type, entry.difficulty));
        }
        else setScore(1000000);
    };

    const fetchData = async () => {
        if (loading) return;
        setLoading(true);
        try {
            const response = await axios.get("https://opentdb.com/api.php?amount=50");
            setFetchedEntries(response.data.results);
            console.log("Fetched trivia data:", response.data.results);
            setEntry(response.data.results[0]);
        }
        catch (error) {
            console.error("Error fetching data:", error);
        }
        finally {
            setLoading(false);
        }
    };

    function shuffle(array) {
        let currentIndex = array.length;

        while (currentIndex != 0) {
            let randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            [array[currentIndex], array[randomIndex]] = [
                array[randomIndex], array[currentIndex]];
        }
        return array;
    }

    useEffect(() => {
        if (entry) {
            setAnswers(shuffle([...entry.incorrect_answers, entry.correct_answer]));
            console.log("Answers:", answers);
        }
    }, [entry]);

    return (
        <div className={styles.main_content}>
            <div>
                <h3 className={styles.question}>{entry ? decodeHtml(entry.question) : (<><button className={styles["button-start"]} onClick={fetchData}>Start Quizz</button></>)}</h3>
            </div>
            {entry ? (<>
                {entry.type === "multiple" ?
                    (<>
                        <div className={styles.container_multi_answer}>
                            <button className={styles["button-answer"]} onClick={(e) => checkAnswer(e, entry)}>{answers[0]}</button>
                            <button className={styles["button-answer"]} onClick={(e) => checkAnswer(e, entry)}>{answers[1]}</button>
                            <button className={styles["button-answer"]} onClick={(e) => checkAnswer(e, entry)}>{answers[2]}</button>
                            <button className={styles["button-answer"]} onClick={(e) => checkAnswer(e, entry)}>{answers[3]}</button>
                        </div>
                    </>) :
                    (<>
                        <div className={styles.container_bool_answer}>
                            <button className={styles["button-answer"]} onClick={(e) => checkAnswer(e, entry)}>{answers[0]}</button>
                            <button className={styles["button-answer"]} onClick={(e) => checkAnswer(e, entry)}>{answers[1]}</button>
                        </div>
                    </>)
                }</>) :
                (<></>)}

            <div className={styles.score}>
                <span>Score:</span>
                <span>{score}</span>
            </div>

            <input type="text" placeholder="text PH" className={styles["body-input"]} />
            <div>
                <button className={styles["button-search"]}>Search</button>
            </div>
        </div>
    );
};
