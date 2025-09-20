'use client';

import React, { useEffect, useState } from 'react';
import styles from './TitleBox.module.css';

interface TitleBoxProps {
    value?: string;
    onChangeTitle?: (v: string) => void;
    readOnly?: boolean;
    compact?: boolean; // smaller style for modal preview
}

export default function TitleBox({ value = 'NEW\nMOODBOARD', onChangeTitle, readOnly = false, compact = false }: TitleBoxProps) {
    const [editing, setEditing] = useState(false);
    const [localTitle, setLocalTitle] = useState(value.split('\n'));

    useEffect(() => {
        setLocalTitle(value.split('\n'));
    }, [value]);
    const handleClick = () => {
        if (!readOnly) setEditing(true);
    };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const lines = e.target.value.split('\n');
    const newLines = lines.map(line => {
        let currentWidth = 0;
        let limitedLine = '';
        for (let i = 0; i < line.length; i++) {
            const char = line[i];
            // 한글 음절(가-힣)을 2, 그 외 문자를 1로 계산합니다.
            const charWidth = (char.charCodeAt(0) >= 0xAC00 && char.charCodeAt(0) <= 0xD7A3) ? 2 : 1;
            if (currentWidth + charWidth > 28) {
                break;
            }
            currentWidth += charWidth;
            limitedLine += char;
        }
        return limitedLine;
    });
    setLocalTitle(newLines);
    onChangeTitle?.(newLines.join('\n'));
  };

  const handleBlur = () => setEditing(false);

    return (
        <div className={`${styles.container} ${compact ? styles.compact : ''}`} onClick={handleClick}>
        {editing && !readOnly ? (
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