import styles from './footerStyle.module.css';

export const Footer = () => {
    const currentYear = new Date().getFullYear();
    return (
        <footer>
            <ul className={styles.footer_list}>
                {/* remove bullets
                custom colors links
                copyright size*/}
                <li className={styles.footer_link}><a href="">Link 1 PH</a></li>
                <li className={styles.footer_link}><a href="">Link 2 PH</a></li>
                <li className={styles.copyright}>Copyright {currentYear}</li>
            </ul>
        </footer>
    );
};