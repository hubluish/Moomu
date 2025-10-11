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
            // 한글은 11, 그 외 문자는 9로 가중치를 주어 계산합니다. (한글 18자, 영어 22자)
            const charWidth = /[\uac00-\ud7a3]|[\u1100-\u11ff]|[\u3130-\u318f]/.test(char) ? 11 : 9;
            if (currentWidth + charWidth > 198) {
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
                <div key={idx} className={styles.title}>{line || '\u00A0'}</div>
            ))}
            </div>
        )}
        </div>
    );
}