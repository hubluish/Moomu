'use client';

import React from 'react';
import styles from './MoodboardPreview.module.css';

type Props = {
    coverUrl?: string | null;
    loading?: boolean;
};

const MoodboardPreview: React.FC<Props> = ({ coverUrl, loading }) => {
    return (
        <div className={styles.container}>
        <div className={styles.content}>
            {loading ? (
            <p className={styles.placeholder}>미리보기를 불러오는 중...</p>
            ) : coverUrl ? (
            <img
                src={coverUrl}
                alt="Moodboard cover"
                className={styles.coverImage}
            />
            ) : (
            <p className={styles.placeholder}>커버 이미지가 아직 없어요.</p>
            )}
        </div>
        </div>
    );
};

export default MoodboardPreview;
