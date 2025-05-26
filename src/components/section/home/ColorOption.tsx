import { useState } from 'react';
import styles from './ColorOption.module.css';
import { on } from 'events';

type ColorOptionProps = {
    title: string;
    description: string;
    isSelected?: boolean;
    onClick?: () => void;
};

export default function ColorOption({ title, description, isSelected, onClick }: ColorOptionProps) {
    return (
            <div
        className={`${styles.container} ${isSelected ? styles.selected : ''}`} onClick={onClick}>
        <div className={styles.imageArea}></div>

        <div className={styles.infoArea}>
            <div className={`${styles.title} ${isSelected ? styles.selectedText : ''}`}>{title}</div>

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

            <div className={`${styles.description} ${isSelected ? styles.selectedText : ''}`}>
                    {description}
            </div>
        </div>
        </div>
    );
}
