"use client";

import React, { useCallback, useRef, useState } from 'react';
import styles from './ColorPalette.module.css';
import { createPortal } from 'react-dom';

const dummyColors = ['#333333', '#555555', '#777777', '#999999'];

export default function ColorPalette() {
  const [isToastVisible, setToastVisible] = useState(false);
  const hideTimer = useRef<number | null>(null);

  const showToast = () => {
    setToastVisible(true);
    if (hideTimer.current) window.clearTimeout(hideTimer.current);
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
      } catch {}
    }
    if (ok) showToast();
  }, []);

  const onKeyCopy = (e: React.KeyboardEvent<HTMLDivElement>, hex: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      copyToClipboard(hex);
    }
  };

  return (
    <div className={styles.container}>
      {dummyColors.map((color) => (
        <div
          key={color}
          className={styles.colorItem}
          role="button"
          tabIndex={0}
          aria-label={`${color} 복사`}
          title="클릭하여 복사"
          onClick={() => copyToClipboard(color)}
          onKeyDown={(e) => onKeyCopy(e, color)}
        >
          <div className={styles.colorBlock} style={{ backgroundColor: color }} />
          <span className={styles.colorCode}>{color}</span>
        </div>
      ))}

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
}
