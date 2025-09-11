'use client';

import React from 'react';
import styles from './MoodboardPreview.module.css';

const MoodboardPreview: React.FC = () => {
    return (
        <div className={styles.container}>
        <div className={styles.content}>
            {/* 여기에 추후 미리보기 이미지나 요소가 들어갑니다 */}
            <p className={styles.placeholder}></p>
        </div>
        </div>
    );
};

export default MoodboardPreview;
