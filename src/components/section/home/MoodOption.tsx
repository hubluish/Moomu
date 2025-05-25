import React from 'react';
import styles from './MoodOption.module.css';

type MoodOptionProps = {
    title: string;
    subtitle: string;
};

export default function MoodOption({ title, subtitle }: MoodOptionProps) {
    return (
        <div className={styles.container}>
        <div className={styles.imageArea}></div>

        <div className={styles.textArea}>
            <div className={styles.title}>{title}</div>
            <div className={styles.subtitle}>{subtitle}</div>
        </div>
        </div>
    );
}
