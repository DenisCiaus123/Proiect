import styles from './Footer.module.css';

export const Footer = () => {
    const currentYear = new Date().getFullYear();
    return (
        <footer>
            <ul className={styles.footerList}>
                <li><a className={styles.footerLink} href="https://opentdb.com/api_config.php" target="_blank" rel="noopener noreferrer">Open Trivia</a></li>
                <li><a className={styles.footerLink} href="https://coolors.co" target="_blank" rel="noopener noreferrer">Coolors</a></li>
                <li className={styles.copyright}>Copyright {currentYear}</li>
            </ul>
        </footer>
    );
};