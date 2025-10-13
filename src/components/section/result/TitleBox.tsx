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

    // character width constants - extracted from inline magic numbers
    const HANGUL_CHAR_WIDTH = 11;
    const OTHER_CHAR_WIDTH = 9;
    const MAX_TITLE_WIDTH = 198;

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
            const charWidth = /[\uac00-\ud7a3]|[\u1100-\u11ff]|[\u3130-\u318f]/.test(char) ? HANGUL_CHAR_WIDTH : OTHER_CHAR_WIDTH;
            if (currentWidth + charWidth > MAX_TITLE_WIDTH) {
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