import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./MainContent.module.css";
import { QuizStart } from "./QuizStart";
import { QuizMain } from "./QuizMain";
import { QuizEnd } from "./QuizEnd";

export const MainContent = () => {
    const [loading, setLoading] = useState(false);
    const [fetchedEntities, setfetchedEntities] = useState([]);
    const [entity, setEntity] = useState(null);
    const [entityIndex, setEntityIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [category, setCategory] = useState("");
    const [difficulty, setDifficulty] = useState("");

    const resetQuiz = () => {
        setfetchedEntities([]);
        setEntity(null);
        setEntityIndex(0);
        setScore(0);
    };


    const fetchData = async () => {
        if (loading) return;
        setLoading(true);
        try {
            let url = `https://opentdb.com/api.php?amount=10`;
            if (category) {
                url += `&category=${category}`;
            }
            if (difficulty && difficulty !== "mixed") {
                url += `&difficulty=${difficulty}`;
            }

            setEntityIndex(0);
            setScore(0);
            const response = await axios.get(url);
            setfetchedEntities(response.data.results);
            setEntity(response.data.results[0]);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (fetchedEntities.length > 0 && entityIndex < fetchedEntities.length) {
            setEntity(fetchedEntities[entityIndex]);
        } else if (entityIndex >= fetchedEntities.length) {
            setEntity(null);
        }
    }, [entityIndex]);

    return (
        <div className={styles.layout}>
            {entityIndex >= fetchedEntities.length && fetchedEntities.length > 0 ? (
                <QuizEnd
                    resetQuiz={resetQuiz}
                    score={score} />
            ) : (
                <div>
                    <>
                        {!entity ? (
                            <QuizStart
                                category={category}
                                setCategory={setCategory}
                                difficulty={difficulty}
                                setDifficulty={setDifficulty}
                                fetchData={fetchData}
                                loading={loading}
                            />
                        ) : (
                            <QuizMain
                                entity={entity}
                                setEntityIndex={setEntityIndex}
                                score={score}
                                setScore={setScore}
                                category={category}
                            />
                        )}
                    </>
                </div>
            )}
        </div>
    );
}