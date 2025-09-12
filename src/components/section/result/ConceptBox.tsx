'use client';

import React, { useState } from 'react';
import styles from './ConceptBox.module.css';
import TopRightArrows from '@/components/common/TopRightArrows';
import type { GeminiSet } from '@/types/result';

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
      <TopRightArrows
        onPrev={handlePrev}
        onNext={handleNext}
        disablePrev={currentIndex <= 0}
        disableNext={currentIndex >= geminiResult.length - 1}
      />
      <div className={styles.content}>
        {currentSentences.map((sentence, index) => (
          <p key={index} className={styles.text}>- {sentence}</p>
        ))}
      </div>
    </div>
  );
}
