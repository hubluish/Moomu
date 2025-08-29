'use client';

import React, { useState } from 'react';
import styles from './TitleBox.module.css';

export default function TitleBox() {
    const [editing, setEditing] = useState(false);
    const [title, setTitle] = useState(['NEW', 'MOODBOARD']);

    const handleClick = () => setEditing(true);
    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setTitle(e.target.value.split('\n'));
    };
    const handleBlur = () => setEditing(false);

    return (
        <div className={styles.container} onClick={handleClick}>
        {editing ? (
            <textarea
            className={styles.textarea}
            value={title.join('\n')}
            onChange={handleChange}
            onBlur={handleBlur}
            autoFocus
            />
        ) : (
            <div className={styles.titleWrapper}>
            {title.map((line, idx) => (
                <div key={idx} className={styles.title}>{line}</div>
            ))}
            </div>
        )}
        </div>
    );
}
