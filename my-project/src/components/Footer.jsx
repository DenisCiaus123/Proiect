import styles from './footerStyle.module.css';

export const Footer = () => {
    const currentYear = new Date().getFullYear();
    return (
        <footer>
            <ul className={styles["footer-list"]}>
                <li><a className={styles["footer-link"]} href="https://opentdb.com/api_config.php" target="_blank" rel="noopener noreferrer">Open Trivia</a></li>
                <li><a className={styles["footer-link"]} href="https://coolors.co" target="_blank" rel="noopener noreferrer">Coolors</a></li>
                <li className={styles.copyright}>Copyright {currentYear}</li>
            </ul>
        </footer>
    );
};