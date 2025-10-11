'use client';

import { useEffect, useState } from 'react';
import styles from './loading.module.css';

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
            <div className={styles.spinner}>
                <svg className={styles.spinnerSvg} viewBox="0 0 50 50">
                    {[...Array(12)].map((_, i) => (
                        <rect
                            key={i}
                            x="23.5"
                            y="1"
                            width="3"
                            height="10"
                            rx="2"
                            ry="2"
                            transform={`rotate(${i * 30} 25 25)`}
                            opacity={i / 12}
                            fill="#000"
                        />
                    ))}
                </svg>
            </div>
            <div className={styles.typingText}>{displayedText}</div>
            <div className={styles.fadeText}>잠시만 기다려주세요</div>
        </div>
    );
}