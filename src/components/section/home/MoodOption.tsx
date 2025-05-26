import React, {useState} from 'react';
import styles from './MoodOption.module.css';

type MoodOptionProps = {
    title: string;
    subtitle: string;
    isSelected?: boolean;
    onClick?: () => void;
};

export default function MoodOption({ title, subtitle, isSelected, onClick }: MoodOptionProps) {

    return (
        <div className={`${styles.container} ${isSelected ? styles.selected : ''}`} onClick={onClick}>
        <div className={styles.imageArea}></div>

        <div className={styles.textArea}>
            <div className={`${styles.title} ${isSelected ? styles.selectedText : ''}`}>{title}</div>
            <div className={`${styles.subtitle} ${isSelected ? styles.selectedText : ''}`}>{subtitle}</div>
        </div>
        </div>
    );
}
