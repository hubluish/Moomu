'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import styles from './TagGuideModal.module.css';

interface TagGuideModalProps {
    onClose: () => void;
    screenWidth: number;
}

export default function TagGuideModal({ onClose, screenWidth }: TagGuideModalProps) {
    const router = useRouter();

    const handleFeedClick = () => {
        onClose();
        router.push('/article');
    };

    const titleText = "태그를 선택하기 어렵나요?";
    const subText = screenWidth <= 480 ? "만들어진 무드보드를 참고해보아요!" : "피드에서 제작된 무드보드를 참고해 볼 수도 있어요!";

    return (
        <div className={styles.wrapper}>
        

        <div className={styles.content}>
            <div className={styles.icon}>
                <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" viewBox="0 0 64 64" fill="none" aria-hidden="true">
                <path d="M32 5.3335C17.296 5.3335 5.33337 17.2962 5.33337 32.0002C5.33337 46.7042 17.296 58.6668 32 58.6668C46.704 58.6668 58.6667 46.7042 58.6667 32.0002C58.6667 17.2962 46.704 5.3335 32 5.3335ZM32 53.3335C20.2374 53.3335 10.6667 43.7628 10.6667 32.0002C10.6667 20.2375 20.2374 10.6668 32 10.6668C43.7627 10.6668 53.3334 20.2375 53.3334 32.0002C53.3334 43.7628 43.7627 53.3335 32 53.3335Z" fill="black"/>
                <path d="M39.5413 39.5416C38.0683 41.0159 36.1956 42.0264 34.1547 42.4482C32.7324 42.7341 31.2675 42.7341 29.8453 42.4482C29.1609 42.3079 28.4919 42.1007 27.848 41.8296C27.2142 41.5616 26.6078 41.233 26.0373 40.8482C24.903 40.076 23.9242 39.0972 23.152 37.9629L18.7307 40.9416C19.304 41.7922 19.9627 42.5922 20.6853 43.3122C22.1689 44.8014 23.9318 45.9831 25.873 46.7895C27.8142 47.596 29.8955 48.0114 31.9975 48.0119C34.0996 48.0124 36.1811 47.598 38.1226 46.7924C40.0642 45.9869 41.8277 44.806 43.312 43.3176C44.0373 42.5949 44.6987 41.7949 45.2693 40.9416L40.848 37.9629C40.4658 38.5282 40.0302 39.0544 39.5413 39.5416Z" fill="black"/>
                <path d="M22.6667 32C24.8758 32 26.6667 30.2091 26.6667 28C26.6667 25.7909 24.8758 24 22.6667 24C20.4575 24 18.6667 25.7909 18.6667 28C18.6667 30.2091 20.4575 32 22.6667 32Z" fill="black"/>
                <path d="M41.3334 26.6665C36 26.6665 34.6667 31.9998 34.6667 31.9998H48C48 31.9998 46.664 26.6665 41.3334 26.6665Z" fill="black"/>
                </svg>
            </div>
            <div className={styles.textContainer}>
                <div className={styles.title}>{titleText}</div>
                <div className={styles.subtext}>{subText}</div>
            </div>
            <div className={styles.closeIconWrapper} role="button" aria-label="닫기" onClick={onClose}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 25 25" fill="none">
                <path d="M12.5 2.5C18.0137 2.5 22.5 6.98625 22.5 12.5C22.5 18.0137 18.0137 22.5 12.5 22.5C6.98625 22.5 2.5 18.0137 2.5 12.5C2.5 6.98625 6.98625 2.5 12.5 2.5ZM12.5 0C5.59625 0 0 5.59625 0 12.5C0 19.4037 5.59625 25 12.5 25C19.4037 25 25 19.4037 25 12.5C25 5.59625 19.4037 0 12.5 0ZM13.75 16.25H11.25V18.75H13.75V16.25ZM11.25 13.75H13.75L14.375 6.25H10.625L11.25 13.75Z" fill="black" fillOpacity="0.5"/>
                </svg>
            </div>
        </div>

        <div className={styles.buttonRow}>

            <button className={styles.leftButton} onClick={handleFeedClick}>피드 구경하기</button>
            <button className={styles.rightButton} onClick={onClose}>닫기</button>
        </div>
        </div>
    );
}
