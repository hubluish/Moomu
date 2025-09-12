'use client';

import React, { useMemo, useState } from 'react';
import styles from './ColorPaletteBox.module.css';
import TopRightArrows from '@/components/common/TopRightArrows';
import ColorPalette from './ColorPalette';
import type { GeminiSet } from '@/types/result';

interface ColorPaletteBoxProps {
  geminiResult?: GeminiSet[] | null;
  title?: string;
}

export default function ColorPaletteBox({ geminiResult, title = 'COLOR' }: ColorPaletteBoxProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const colors = useMemo(() => {
    if (geminiResult && geminiResult.length > 0) {
      const idx = Math.min(Math.max(0, currentIndex), geminiResult.length - 1);
      return geminiResult[idx]?.colors ?? [];
    }
    // fallback
    return ['#333333', '#555555', '#777777', '#999999'];
  }, [geminiResult, currentIndex]);

  const hasMultipleSets = (geminiResult?.length ?? 0) > 1;

  const handlePrev = () => {
    if (!geminiResult) return;
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    if (!geminiResult) return;
    setCurrentIndex((prev) => Math.min((geminiResult?.length ?? 1) - 1, prev + 1));
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>{title}</div>
      <TopRightArrows
        onPrev={hasMultipleSets ? handlePrev : undefined}
        onNext={hasMultipleSets ? handleNext : undefined}
        disablePrev={!hasMultipleSets || currentIndex <= 0}
        disableNext={!hasMultipleSets || currentIndex >= (geminiResult?.length ?? 1) - 1}
      />
      <div className={styles.content}>
        <ColorPalette colors={colors} />
      </div>
    </div>
  );
}
