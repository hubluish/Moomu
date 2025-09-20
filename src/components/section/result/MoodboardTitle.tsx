'use client';

import { useState, useRef } from 'react';
import styles from './MoodboardTitle.module.css';

export default function MoodboardTitle() {
    const [editing, setEditing] = useState(false);
    const [title, setTitle] = useState('New Moodboard');
    const inputRef = useRef<HTMLInputElement>(null);

    const handleEditClick = () => {
        setEditing(true);
        setTimeout(() => {
        inputRef.current?.focus();
        }, 0);
    };

    const handleBlurOrEnter = () => {
        if (title.trim() === '') {
        setTitle('New Moodboard');
        }
        setEditing(false);
    };

    return (
        <div className={styles.wrapper}>
        {editing ? (
            <input
            ref={inputRef}
            className={styles.input}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onBlur={handleBlurOrEnter}
            onKeyDown={(e) => {
                if (e.key === 'Enter') handleBlurOrEnter();
            }}
            />
        ) : (
            <div className={styles.titleBox}>
            <span className={styles.titleText}>{title}</span>
            <button onClick={handleEditClick} className={styles.iconButton}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M0 20V15.2778L14.6667 0.638889C14.8889 0.435185 15.1344 0.277778 15.4033 0.166667C15.6722 0.0555557 15.9544 0 16.25 0C16.5455 0 16.8326 0.0555557 17.1111 0.166667C17.3896 0.277778 17.6304 0.444444 17.8333 0.666667L19.3611 2.22222C19.5833 2.42593 19.7455 2.66667 19.8478 2.94444C19.95 3.22222 20.0007 3.5 20 3.77778C20 4.07407 19.9493 4.35667 19.8478 4.62556C19.7463 4.89444 19.5841 5.13963 19.3611 5.36111L4.72222 20H0ZM16.2222 5.33333L17.7778 3.77778L16.2222 2.22222L14.6667 3.77778L16.2222 5.33333Z" fill="#B1B1B1"/>
                </svg>
            </button>
            </div>
        )}
        </div>
    );
}
