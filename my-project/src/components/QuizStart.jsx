import styles from "./QuizStart.module.css";

export const QuizStart = ({ category, setCategory, difficulty, setDifficulty, fetchData }) => {
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
                <option value="26">Celebrities</option>
                <option value="27">Animals</option>
            </select>

            <button className={styles.startQuizButton} onClick={fetchData}>Start Quiz</button>
        </div>
    );
};
