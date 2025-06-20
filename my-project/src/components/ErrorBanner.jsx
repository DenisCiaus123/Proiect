import styles from "./ErrorBanner.module.css";

export const ErrorBanner = ({ catchedError }) => {
    return (
        <>
            <div className={styles.errorBanner}>{catchedError}</div>
        </>
    );
};