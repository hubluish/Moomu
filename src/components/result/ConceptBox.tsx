'use client';

import React, { useState } from 'react';
import styles from './ConceptBox.module.css';

interface GeminiSet {
  colors: string[];
  image: string;
  font: string;
  sentences: string[];
}

interface ConceptBoxProps {
  geminiResult: GeminiSet[] | null;
}

export default function ConceptBox({ geminiResult }: ConceptBoxProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!geminiResult || geminiResult.length === 0) {
    return (
      <div className={styles.container}>
        <div className={styles.title}>CONCEPT</div>
        <div className={styles.content}>
          <p className={styles.text}>컨셉 정보를 불러올 수 없습니다.</p>
        </div>
      </div>
    );
  }

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => Math.max(0, prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => Math.min(geminiResult.length - 1, prevIndex + 1));
  };

  const currentSentences = geminiResult[currentIndex].sentences;

  return (
    <div className={styles.container}>
      <div className={styles.title}>CONCEPT</div>
      {currentIndex > 0 && (
        <button className={`${styles.arrow} ${styles.left}`} onClick={handlePrev} aria-label="previous concept">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="40" viewBox="0 0 20 40" fill="none">
            <path opacity="0.25" d="M0 20L17.3077 40L20 36.6667L5.76923 20L20 3.33333L17.3077 0L0 20Z" fill="black" />
          </svg>
        </button>
      )}
      {currentIndex < geminiResult.length - 1 && (
        <button className={`${styles.arrow} ${styles.right}`} onClick={handleNext} aria-label="next concept">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="40" viewBox="0 0 20 40" fill="none">
            <path opacity="0.25" d="M2.69231 0L0 3.33333L14.2308 20L0 36.6667L2.69231 40L20 20L2.69231 0Z" fill="black" />
          </svg>
        </button>
      )}
      <div className={styles.content}>
        {currentSentences.map((sentence, index) => (
          <p key={index} className={styles.text}>- {sentence}</p>
        ))}
      </div>
    </div>
  );
}
