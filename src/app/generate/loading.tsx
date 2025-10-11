'use client';

import { useEffect, useState } from 'react';
import styles from './loading.module.css';

import Spinner from '@/components/common/spinner/Spinner';

export default function Loading() {
    const message = '무무가 좋은 무드보드를 위해 고민하고 있어요.';
    const [displayedText, setDisplayedText] = useState('');

    useEffect(() => {
        let index = 0;
        const interval = setInterval(() => {
            if (index < message.length) {
                setDisplayedText(message.slice(0, index + 1));
                index++;
            } else {
                clearInterval(interval);
            }
        }, 100);

        return () => {
            clearInterval(interval);
        };
    }, []);

    return (
        <div className={styles.container}>
            <Spinner />
            <div className={styles.typingText}>{displayedText}</div>
            <div className={styles.fadeText}>잠시만 기다려주세요</div>
        </div>
    );
}