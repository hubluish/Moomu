'use client';

import React, { useEffect, useState } from 'react';
import styles from './TitleBox.module.css';

interface TitleBoxProps {
    value?: string;                          
    onChangeTitle?: (v: string) => void;
}

export default function TitleBox({ value = 'NEW\nMOODBOARD', onChangeTitle }: TitleBoxProps) {
    const [editing, setEditing] = useState(false);
    const [localTitle, setLocalTitle] = useState(value.split('\n'));

    useEffect(() => {
        setLocalTitle(value.split('\n'));
    }, [value]);
    const handleClick = () => setEditing(true);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const lines = e.target.value.split('\n');
    setLocalTitle(lines);
    onChangeTitle?.(e.target.value); // 부모에 전체 문자열 전달
  };

  const handleBlur = () => setEditing(false);

    return (
        <div className={styles.container} onClick={handleClick}>
        {editing ? (
            <textarea
            className={styles.textarea}
            value={localTitle.join('\n')}
            onChange={handleChange}
            onBlur={handleBlur}
            autoFocus
            />
        ) : (
            <div className={styles.titleWrapper}>
            {localTitle.map((line, idx) => (
                <div key={idx} className={styles.title}>{line}</div>
            ))}
            </div>
        )}
        </div>
    );
}
