import styles from './Spinner.module.css';

export default function Spinner() {
    return (
        <div className={styles.spinner}>
            <svg className={styles.spinnerSvg} viewBox="0 0 50 50">
                {[...Array(12)].map((_, i) => (
                    <rect
                        key={i}
                        x="23.5"
                        y="1"
                        width="3"
                        height="10"
                        rx="2"
                        ry="2"
                        transform={`rotate(${i * 30} 25 25)`}
                        opacity={i / 12}
                        fill="#000"
                    />
                ))}
            </svg>
        </div>
    );
}
