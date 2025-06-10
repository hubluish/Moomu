'use client';

import React from 'react';
import styles from './ProgressBar.module.css';

interface ProgressBarProps {
  step: number;
  totalSteps?: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ step, totalSteps = 4 }) => {
  return (
    <div className={styles.container}>
      <div className={styles.bars}>
        {Array.from({ length: totalSteps }).map((_, index) => (
          <div key={index} className={styles.stepBox}>
            <div
              className={styles.stepFill}
              style={{
                width: index < step ? '100%' : '0%',
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressBar;
