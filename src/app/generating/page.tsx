'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './loading.module.css';

export default function LoadingPage() {
    const message = '무무가 좋은 무드보드를 위해 고민하고 있어요.';
    const [displayedText, setDisplayedText] = useState('');
    const router = useRouter();

    useEffect(() => {
        let index = 0;
        const interval = setInterval(() => {
            setDisplayedText((prev) => {
                if (index < message.length) {
                    const nextChar = message[index];
                    index++;
                    return prev + nextChar;
                } else {
                    clearInterval(interval); 
                    return prev;
                }
            });
        }, 100);

        // 3초 후에 결과 페이지로 이동
        const timer = setTimeout(() => {
            if (typeof window === 'undefined') return;

            const sp = new URLSearchParams(window.location.search);
            const rid = sp.get('rid');

            if (rid) {
                // 결과 페이지로 rid를 전달하며 이동
                router.push(`/result/result?rid=${encodeURIComponent(rid)}`);
            } else {
                console.error('Loading page: No request_id (rid) found in URL. Redirecting to home.');
                alert('오류가 발생했습니다. 홈으로 이동합니다.');
                router.push('/');
            }
        }, 3000);

        return () => {
            clearInterval(interval);
            clearTimeout(timer);
        };
    }, [router]);

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
