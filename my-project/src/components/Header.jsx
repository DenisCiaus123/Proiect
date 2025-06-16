import styles from './headerStyle.module.css';

export const Header = ({ title, subtitle, logo }) => {
    return (
        <nav className={styles.navbar}>
            <div className={styles.navbar_logo}>
                <img src={logo} alt="Logo" className={styles.logo_img}/>
            </div>
            <div className={styles.title_container}>
                <h1 className={styles.navbar_title}>{title}</h1>
                <h2 className={styles.navbar_subtitle}>{subtitle}</h2>
            </div>
        </nav>
    );
};
