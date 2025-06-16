import styles from './bodyStyle.module.css';

export const Body = () => {
    return (
        <div className={styles.main_content}>
            <div>
                <div className={styles.score_container}>
                    <span> score: </span>
                    <span> 125_ph</span>
                </div>
                <div>
                    <h3 className={styles.question}>question</h3>
                </div>
                <div className={styles.container_answers}>
                    {/* button grid */}
                    <button className={styles.button_answer}>Button PH</button>
                    <button className={styles.button_answer}>Button PH</button>
                    <button className={styles.button_answer}>Button PH</button>
                    <button className={styles.button_answer}>Button PH</button>
                    <p> Correct/wrong</p>
                {/* 2 new classes placeholder rasp corect-gresit div*/}
                </div>
                <input type="text" placeholder="text PH" className={styles.body_input}></input>
                <div>
                    <button className={styles.button_search}>Search</button>
                </div>
            </div>
        </div>
    );
};
