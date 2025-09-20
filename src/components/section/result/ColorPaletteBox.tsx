'use client';

import React, { useMemo, useState } from 'react';
import styles from './ColorPaletteBox.module.css';
import TopRightArrows from '@/components/common/TopRightArrows';
import ColorPalette from './ColorPalette';
import type { GeminiSet } from '@/types/result';

interface ColorPaletteBoxProps {
  geminiSet?: GeminiSet | null;
  title?: string;
  onPrev?: () => void;
  onNext?: () => void;
  disablePrev?: boolean;
  disableNext?: boolean;
}

export default function ColorPaletteBox({ geminiSet, title = 'COLOR', onPrev, onNext, disablePrev, disableNext }: ColorPaletteBoxProps) {
  const colors = useMemo(() => {
    if (geminiSet) {
      return geminiSet?.colors ?? [];
    }
    // fallback
    return ['#333333', '#555555', '#777777', '#999999'];
  }, [geminiSet]);

  return (
    <div className={styles.container}>
      <div className={styles.title}>{title}</div>
      <TopRightArrows
        onPrev={onPrev}
        onNext={onNext}
        disablePrev={disablePrev}
        disableNext={disableNext}
      />
      <div className={styles.content}>
        <ColorPalette colors={colors} />
      </div>
    </div>
  );
}
