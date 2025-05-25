// components/common/ColorOption.tsx

import styles from './ColorOption.module.css';

type ColorOptionProps = {
    title: string;
    description: string;
};

export default function ColorOption({ title, description }: ColorOptionProps) {
    return (
        <div className={styles.container}>
        <div className={styles.imageArea}></div>

        <div className={styles.infoArea}>
            <div className={styles.title}>{title}</div>

            <div className={styles.colorPreview}>
            {Array.from({ length: 4 }).map((_, index) => (
                <svg
                key={index}
                xmlns="http://www.w3.org/2000/svg"
                width="42"
                height="42"
                viewBox="0 0 42 42"
                fill="none"
                >
                <circle cx="21" cy="21" r="21" fill="#D9D9D9" />
                </svg>
            ))}
            </div>

            <div className={styles.description}>{description}</div>
        </div>
        </div>
    );
}
