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
            const geminiResult = localStorage.getItem('gemini_result');
            if (geminiResult) {
                try {
                    const data = JSON.parse(geminiResult);
                    console.log('Gemini 결과:', data); // 디버깅용 로그

                    // 데이터가 배열이 아닌 경우 배열로 변환
                    const dataArray = Array.isArray(data) ? data : [data];
                    console.log('변환된 데이터:', dataArray);

                    // 각 세트에서 image 필드 추출
                    const imageKeywords = dataArray.reduce((acc: string[], set) => {
                        if (set && typeof set === 'object') {
                            // image 필드가 있는지 확인
                            if ('image' in set && set.image) {
                                acc.push(set.image);
                            }
                        }
                        return acc;
                    }, []);

                    console.log('추출된 이미지 키워드:', imageKeywords); // 디버깅용 로그

                    if (imageKeywords.length > 0) {
                        localStorage.setItem('image_keywords', JSON.stringify(imageKeywords));
                        router.push('/result/result');
                    } else {
                        console.error('이미지 키워드를 찾을 수 없습니다.');
                        // 디버깅을 위해 전체 데이터 구조 출력
                        console.log('전체 데이터 구조:', JSON.stringify(dataArray, null, 2));
                    }
                } catch (error) {
                    console.error('Gemini 결과 파싱 에러:', error);
                }
            } else {
                console.error('Gemini 결과가 없습니다.');
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
