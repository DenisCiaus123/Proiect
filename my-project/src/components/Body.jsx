import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./bodyStyle.module.css";

export const Body = () => {
    const [loading, setLoading] = useState(false);
    const [fetchedEntries, setFetchedEntries] = useState([]);
    const [entry, setEntry] = useState(null);
    const [entryIndex, setEntryIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [category, setCategory] = useState("");
    const [difficulty, setDifficulty] = useState("");

    function decodeHtml(htmlCode) {
        const txt = document.createElement("textarea");
        txt.innerHTML = htmlCode;
        return txt.value;
    }

    const addPoints = (type, difficulty) => {
        let points = 0;

        if (type === "multiple") {
            points += 2;
        }

        if (difficulty === "easy") points += 1;
        else if (difficulty === "medium") points += 2;
        else points += 3;

        return points;
    };

    const checkAnswer = (e, entry) => {
        const answerText = e.target.textContent;
        if (entry.correct_answer === answerText) {
            setScore(prev => prev + addPoints(entry.type, entry.difficulty));
        }
        setEntryIndex(prev => prev + 1);
    };

    const fetchData = async () => {
        if (loading) return;
        setLoading(true);
        try {
            let url = `https://opentdb.com/api.php?amount=50`;
            if (category) {
                url += `&category=${category}`;
            }
            if (difficulty && difficulty !== "mixed") {
                url += `&difficulty=${difficulty}`;
            }

            setEntryIndex(0);
            setScore(0);
            const response = await axios.get(url);
            setFetchedEntries(response.data.results);
            setEntry(response.data.results[0]);
            console.log(url);
            setEntryIndex(0);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };

    const shuffle = (array) => {
        let currentIndex = array.length;
        while (currentIndex !== 0) {
            let randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            [array[currentIndex], array[randomIndex]] = [
                array[randomIndex], array[currentIndex]
            ];
        }
        return array;
    };

    useEffect(() => {
        if (entry) {
            const allAnswers = shuffle([...entry.incorrect_answers, entry.correct_answer]);
            setAnswers(allAnswers.map(decodeHtml));
        }
    }, [entry]);

    useEffect(() => {
        if (fetchedEntries.length > 0 && entryIndex < fetchedEntries.length) {
            setEntry(fetchedEntries[entryIndex]);
        } else if (entryIndex >= fetchedEntries.length) {
            setEntry(null);
        }
    }, [entryIndex]);

    return (
        <div className={styles["main-content"]}>
            {entryIndex >= fetchedEntries.length && fetchedEntries.length > 0 ? (
                <div className={styles["end-screen"]}>
                    <h2>Quiz Complete!</h2>
                    <p>Your final score: <strong>{score}</strong></p>
                    <button onClick={fetchData} className={styles["button-start"]}>Play Again</button>
                </div>
            ) : (
                <div>
                    <h3 className={styles.question}>
                        {entry
                            ? decodeHtml(entry.question)
                            : (<>
                                <select
                                    className={styles["category-select"]}
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                >
                                    <option value="">Any Category</option>
                                    <option value="9">General Knowledge</option>
                                    <option value="10">Entertainment: Books</option>
                                    <option value="11">Entertainment: Film</option>
                                    <option value="12">Entertainment: Music</option>
                                    <option value="13">Entertainment: Musicals & Theatres</option>
                                    <option value="14">Entertainment: Television</option>
                                    <option value="15">Entertainment: Video Games</option>
                                    <option value="16">Entertainment: Board Games</option>
                                    <option value="17">Science & Nature</option>
                                    <option value="18">Science: Computers</option>
                                    <option value="19">Science: Mathematics</option>
                                    <option value="20">Mythology</option>
                                    <option value="21">Sports</option>
                                    <option value="22">Geography</option>
                                    <option value="23">History</option>
                                    <option value="24">Politics</option>
                                    <option value="25">Art</option>
                                    <option value="25">Celebrities</option>
                                    <option value="27">Animals</option>

                                </select>
                                <div className={styles["difficulty-container"]}>
                                    <span className={styles["difficulty-text"]}>Difficulty:</span>
                                    <label>
                                        <input
                                            type="radio"
                                            name="difficulty"
                                            value="mixed"
                                            checked={difficulty === ""}
                                            onChange={(e) => setDifficulty(e.target.value)}
                                        />
                                        Mixed
                                    </label>
                                    <label>
                                        <input
                                            type="radio"
                                            name="difficulty"
                                            value="easy"
                                            checked={difficulty === "easy"}
                                            onChange={(e) => setDifficulty(e.target.value)}
                                        />
                                        Easy
                                    </label>
                                    <label>
                                        <input
                                            type="radio"
                                            name="difficulty"
                                            value="medium"
                                            checked={difficulty === "medium"}
                                            onChange={(e) => setDifficulty(e.target.value)}
                                        />
                                        Medium
                                    </label>
                                    <label>
                                        <input
                                            type="radio"
                                            name="difficulty"
                                            value="hard"
                                            checked={difficulty === "hard"}
                                            onChange={(e) => setDifficulty(e.target.value)}
                                        />
                                        Hard
                                    </label>
                                </div>
                                <button className={styles["button-start"]} onClick={fetchData}>Start Quiz</button>
                            </>)

                        }
                    </h3>
                </div>)};
            {entry ? (<>
                {entry.type === "multiple" ?
                    (<>
                        <div className={styles["container-multi-answer"]}>
                            <button className={styles["button-answer"]} onClick={(e) => checkAnswer(e, entry)}>{answers[0]}</button>
                            <button className={styles["button-answer"]} onClick={(e) => checkAnswer(e, entry)}>{answers[1]}</button>
                            <button className={styles["button-answer"]} onClick={(e) => checkAnswer(e, entry)}>{answers[2]}</button>
                            <button className={styles["button-answer"]} onClick={(e) => checkAnswer(e, entry)}>{answers[3]}</button>
                        </div>
                    </>) :
                    (<>
                        <div className={styles["container-bool-answer"]}>
                            <button className={styles["button-answer"]} onClick={(e) => checkAnswer(e, entry)}>{answers[0]}</button>
                            <button className={styles["button-answer"]} onClick={(e) => checkAnswer(e, entry)}>{answers[1]}</button>
                        </div>
                    </>)

                }
                <div className={styles.score}>
                    <span>Score: </span>
                    <span>{score}</span>
                </div>
            </>) :
                (<></>)}

        </div>
    );
};
