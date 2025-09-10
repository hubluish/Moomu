'use client';

import React, { useCallback, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import styles from './KeywordBox.module.css';

interface KeywordBoxProps {
    tags: string[];
}

const KeywordBox: React.FC<KeywordBoxProps> = ({ tags }) => {
  const [isToastVisible, setToastVisible] = useState(false);
  const hideTimer = useRef<number | null>(null);

  const showToast = () => {
    setToastVisible(true);
    if (hideTimer.current) window.clearTimeout(hideTimer.current);
    // hide after 1.2s
    hideTimer.current = window.setTimeout(() => setToastVisible(false), 1200);
  };

  const copyToClipboard = useCallback(async (text: string) => {
    let ok = false;
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
        ok = true;
      }
    } catch {}
    if (!ok) {
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
        ok = true;
      } catch {
        ok = false;
      }
    }
    if (ok) showToast();
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
      {typeof window !== 'undefined' &&
        createPortal(
          <div
            className={`${styles.toast} ${isToastVisible ? styles.show : ''}`}
            role="status"
            aria-live="polite"
          >
            복사됨
          </div>,
          document.body
        )}
    </div>
  );
};

export default KeywordBox;
