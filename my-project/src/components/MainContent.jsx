import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./MainContent.module.css";
import { QuizStart } from "./QuizStart";
import { QuizMain } from "./QuizMain";
import { QuizEnd } from "./QuizEnd";
import { ErrorBanner } from "./ErrorBanner";
import loadingDot from "../images/loadingDot.gif";
import {
  stopBackgroundSound,
  startBackgroundSound,
  decodeBase64Fields,
} from "./utils/utils";

export const MainContent = () => {
  const [loading, setLoading] = useState(false);
  const [fetchedEntities, setfetchedEntities] = useState([]);
  const [entity, setEntity] = useState(null);
  const [entityIndex, setEntityIndex] = useState(null);
  const [score, setScore] = useState(0);
  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [amount, setAmount] = useState(15);
  const [catchedError, setCatchedError] = useState(null);
  const [showLoader, setShowLoader] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const toggleMute = () => setIsMuted((m) => !m);

  const resetQuiz = () => {
    setfetchedEntities([]);
    setEntity(null);
    setEntityIndex(0);
    setScore(0);
  };

  const restartQuizSameSettings = () => {
    setEntityIndex(0);
    setScore(0);
    setfetchedEntities([]);
    setEntity(null);
    fetchData();
  };

  const fetchData = async () => {
    if (loading) return;
    setLoading(true);
    try {
      let url = `https://opentdb.com/api.php?&encode=base64&`;
      if (amount) {
        url += `amount=${amount}`;
      }
      if (category) {
        url += `&category=${category}`;
      }
      if (difficulty && difficulty !== "mixed") {
        url += `&difficulty=${difficulty}`;
      }

      setEntityIndex(0);
      setScore(0);
      const response = await axios.get(url);
      const decodeResults = decodeBase64Fields(response.data.results);
      setfetchedEntities(decodeResults);
      setEntity(decodeResults[0]);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 429) {
        setCatchedError("Too many requests! Try in few seconds!");
      } else {
        setCatchedError("Ups! Something went wrong!");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const quizActive =
      entity && entityIndex !== null && entityIndex < fetchedEntities.length;
    if (quizActive && !isMuted) {
      startBackgroundSound();
    } else {
      stopBackgroundSound();
    }
    return () => stopBackgroundSound();
  }, [entity, entityIndex, fetchedEntities.length, isMuted]);

  useEffect(() => {
    if (catchedError) {
      setTimeout(() => {
        setCatchedError(null);
      }, 3000);
    }
  }, [catchedError]);

  useEffect(() => {
    if (loading) {
      setShowLoader(true);
    } else {
      const timeout = setTimeout(() => setShowLoader(false), 500);
      return () => clearTimeout(timeout);
    }
  }, [loading]);

  useEffect(() => {
    if (fetchedEntities.length > 0 && entityIndex < fetchedEntities.length) {
      setEntity(fetchedEntities[entityIndex]);
    } else if (entityIndex >= fetchedEntities.length) {
      setEntity(null);
    }
  }, [entityIndex]);

  return (
    <div className={styles.layout}>
      {showLoader && (
        <div
          className={`${styles.loadingScreen} ${
            loading ? styles.visible : styles.hidden
          }`}
        >
          <span style={{ margin: "16px 0" }}>Loading</span>
          <img src={loadingDot} alt="..." className={styles.dot} />
        </div>
      )}
      {entityIndex >= fetchedEntities.length && fetchedEntities.length > 0 ? (
        <QuizEnd resetQuiz={resetQuiz} score={score} />
      ) : (
        <div>
          <>
            {!entity ? (
              <QuizStart
                amount={amount}
                setAmount={setAmount}
                category={category}
                setCategory={setCategory}
                difficulty={difficulty}
                setDifficulty={setDifficulty}
                fetchData={fetchData}
                loading={loading}
                resetQuiz={resetQuiz}
                isMuted={isMuted}
              />
            ) : (
              <QuizMain
                entity={entity}
                setEntityIndex={setEntityIndex}
                score={score}
                setScore={setScore}
                entityIndex={entityIndex}
                totalQuestions={fetchedEntities.length}
                restartQuizSameSettings={restartQuizSameSettings}
                isMuted={isMuted}
                toggleMute={toggleMute}
              />
            )}
          </>
        </div>
      )}
      <>{catchedError && <ErrorBanner catchedError={catchedError} />}</>
    </div>
  );
};
