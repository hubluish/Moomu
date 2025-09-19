'use client';

import React, { useState } from 'react';
import styles from './ConceptBox.module.css';
import TopRightArrows from '@/components/common/TopRightArrows';
import type { GeminiSet } from '@/types/result';

interface ConceptBoxProps {
  geminiSet: GeminiSet | null;
  onPrev?: () => void;
  onNext?: () => void;
  disablePrev?: boolean;
  disableNext?: boolean;
}

export default function ConceptBox({ geminiSet, onPrev, onNext, disablePrev, disableNext }: ConceptBoxProps) {
  if (!geminiSet) {
    return (
      <div className={styles.container}>
        <div className={styles.title}>CONCEPT</div>
        <div className={styles.content}>
          <p className={styles.text}>컨셉 정보를 불러올 수 없습니다.</p>
        </div>
      </div>
    );
  }

  const currentSentences = geminiSet.sentences;

  return (
    <div className={styles.container}>
      <div className={styles.title}>CONCEPT</div>
      <TopRightArrows
        onPrev={onPrev}
        onNext={onNext}
        disablePrev={disablePrev}
        disableNext={disableNext}
      />
      <div className={styles.content}>
        {currentSentences.map((sentence, index) => (
          <p key={index} className={styles.text}>- {sentence}</p>
        ))}
      </div>
    </div>
  );
}
