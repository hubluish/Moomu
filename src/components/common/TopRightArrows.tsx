'use client';

import React from 'react';
import styles from './TopRightArrows.module.css';

interface TopRightArrowsProps {
  onPrev?: () => void;
  onNext?: () => void;
  disablePrev?: boolean;
  disableNext?: boolean;
}

const TopRightArrows: React.FC<TopRightArrowsProps> = ({ onPrev, onNext, disablePrev, disableNext }) => {
  return (
    <div className={styles.container}>
      <button
        type="button"
        className={styles.btn}
        onClick={onPrev}
        disabled={disablePrev}
        aria-label="이전"
        title="이전"
      >
        <svg className={styles.icon} xmlns="http://www.w3.org/2000/svg" width="10" height="16" viewBox="0 0 10 15" fill="none">
          <path d="M8.33203 0.833496L1.66536 7.50016L8.33203 14.1668" stroke="#F1F3F5" strokeOpacity="0.5" strokeWidth="2.28571"/>
        </svg>
      </button>
      <button
        type="button"
        className={styles.btn}
        onClick={onNext}
        disabled={disableNext}
        aria-label="다음"
        title="다음"
      >
        <svg className={styles.icon} xmlns="http://www.w3.org/2000/svg" width="10" height="16" viewBox="0 0 10 15" fill="none">
          <path d="M1.6665 0.833374L8.33317 7.50004L1.6665 14.1667" stroke="#F1F3F5" strokeOpacity="0.5" strokeWidth="2.28571"/>
        </svg>
      </button>
    </div>
  );
};

export default TopRightArrows;
