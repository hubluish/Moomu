'use client';

import React, { useCallback } from 'react';
import styles from './KeywordBox.module.css';

interface KeywordBoxProps {
    tags: string[];
}

const KeywordBox: React.FC<KeywordBoxProps> = ({ tags }) => {
  const copyToClipboard = useCallback(async (text: string) => {
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
        return;
      }
    } catch {}
    try {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
    } catch {
      // no-op fallback failure
    }
  }, []);

  const onKeyCopy = (e: React.KeyboardEvent<HTMLDivElement>, tag: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      copyToClipboard(tag);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>KEYWORD</div>
      <div className={styles.chipContainer}>
        {tags.map((tag, index) => (
          <div
            key={index}
            className={styles.chip}
            role="button"
            tabIndex={0}
            aria-label={`${tag} 복사`}
            title="클릭하여 복사"
            onClick={() => copyToClipboard(tag)}
            onKeyDown={(e) => onKeyCopy(e, tag)}
          >
            <span className={styles.chipText}>{tag}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KeywordBox;
