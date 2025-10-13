import styles from './PopCheer.module.css';

interface PopCheerProps {
    visible: boolean;
    message: React.ReactNode;
    top?: number;
    zIndex?: number;
}

export default function PopCheer({ visible, message, top=70, zIndex=1001 }: PopCheerProps) {
    return (
        <div
            className={`${styles.alertContainer} ${visible ? styles.alertVisible : styles.alertHidden}`}
            style={{ top, zIndex }}
            role="status"
            aria-live="polite"
        >
        <div className={styles.wrapper}>
            <div className={styles.icon}>
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none">
                <path fillRule="evenodd" clipRule="evenodd" d="M36.988 7.60207C41.178 10.0441 44.126 15.0021 43.996 20.7861C43.834 28.0061 38.216 34.3741 28.638 40.0621C27.218 40.9061 25.722 42.0001 24 42.0001C22.31 42.0001 20.75 40.8861 19.36 40.0601C9.78601 34.3741 4.16601 28.0041 4.00401 20.7861C3.87401 15.0021 6.82201 10.0461 11.012 7.60207C14.932 5.32007 19.856 5.30607 24 8.67607C28.144 5.30607 33.068 5.31807 36.988 7.60207ZM34.974 11.0601C32.186 9.43607 28.702 9.49407 25.686 12.5461C25.4649 12.768 25.2021 12.9441 24.9128 13.0642C24.6235 13.1844 24.3133 13.2462 24 13.2462C23.6867 13.2462 23.3765 13.1844 23.0872 13.0642C22.7979 12.9441 22.5351 12.768 22.314 12.5461C19.298 9.49407 15.814 9.43607 13.026 11.0601C10.138 12.7441 7.90601 16.3161 8.00401 20.7001C8.11601 25.7221 12.084 31.0881 21.404 36.6241C22.22 37.1101 23.072 37.7321 24 37.9901C24.928 37.7321 25.78 37.1101 26.596 36.6241C35.916 31.0881 39.884 25.7241 39.996 20.6981C40.096 16.3181 37.862 12.7441 34.974 11.0601Z" fill="#3D38F5"/>
            </svg>
            </div>
            <p className={styles.text}>{message}</p>
        </div>
        </div>
    );
}
