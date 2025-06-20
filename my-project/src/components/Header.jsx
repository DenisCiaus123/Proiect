import styles from "./Header.module.css";

export const Header = ({ title, subtitle, logo, onClick }) => {
  return (
    <nav
      className={styles.navbar}
      onClick={onClick}
      style={{ cursor: "pointer" }}
    >
      <div className={styles.navbarLogo}>
        <img src={logo} alt="Logo" className={styles.logoImg} />
      </div>
      <div className={styles.titleContainer}>
        <h1 className={styles.navbarTitle}>{title}</h1>
        <h2 className={styles.navbarSubtitle}>{subtitle}</h2>
      </div>
    </nav>
  );
};
