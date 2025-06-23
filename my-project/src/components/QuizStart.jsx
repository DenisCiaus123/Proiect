import styles from "./QuizStart.module.css";
import { useEffect, useState } from "react";
import axios from "axios";

export const QuizStart = ({
  category,
  setCategory,
  difficulty,
  setDifficulty,
  amount,
  setAmount,
  fetchData,
}) => {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    axios
      .get("https://opentdb.com/api_category.php")
      .then((res) => setCategories(res.data.trivia_categories))
      .catch(() => setCategories([]));
  }, []);

  return (
    <div className={styles.card}>
      <div className={styles.difficultySelector}>
        <span className={styles.difficultyLabel}>Difficulty:</span>

        <label className={styles.customRadio}>
          <input
            type="radio"
            name="difficulty"
            value=""
            checked={difficulty === ""}
            onChange={(e) => setDifficulty(e.target.value)}
          />
          <span className={styles.radioMark}></span>
          Mixed
        </label>

        <label className={styles.customRadio}>
          <input
            type="radio"
            name="difficulty"
            value="easy"
            checked={difficulty === "easy"}
            onChange={(e) => setDifficulty(e.target.value)}
          />
          <span className={styles.radioMark}></span>
          Easy
        </label>

        <label className={styles.customRadio}>
          <input
            type="radio"
            name="difficulty"
            value="medium"
            checked={difficulty === "medium"}
            onChange={(e) => setDifficulty(e.target.value)}
          />
          <span className={styles.radioMark}></span>
          Medium
        </label>

        <label className={styles.customRadio}>
          <input
            type="radio"
            name="difficulty"
            value="hard"
            checked={difficulty === "hard"}
            onChange={(e) => setDifficulty(e.target.value)}
          />
          <span className={styles.radioMark}></span>
          Hard
        </label>
      </div>

      <select
        name="category"
        id="category"
        className={styles.categoryDropdown}
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="">Any Category</option>
        {categories.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.name}
          </option>
        ))}
      </select>
      <div className="numberOfQuestionsContainer">
        <span className={styles.amountLabel}>Number of questions: </span>
        <input
          type="number"
          placeholder="15"
          value={amount}
          onChange={(e) => {
            const val = e.target.value;
            if (val === "") {
              setAmount("");
            } else {
              setAmount(Number(val));
            }
          }}
          onBlur={() => {
            if (amount === "" || amount < 5) setAmount(5);
            else if (amount > 25) setAmount(25);
          }}
          className={styles.amountInput}
        ></input>
        <span className={styles.amountLabel}> (5-25) </span>
      </div>
      <button
        className={styles.startQuizButton}
        onClick={() => {
          let validAmount = amount;
          if (amount === "" || amount < 5) validAmount = 5;
          if (amount > 25) validAmount = 25;
          setAmount(validAmount);
          fetchData();
        }}
      >
        Start Quiz
      </button>
    </div>
  );
};
