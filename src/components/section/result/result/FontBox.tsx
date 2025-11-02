'use client';

import React, {useEffect, useState} from 'react';
import Image from 'next/image';
import styles from './FontBox.module.css';
import TopRightArrows from '@/components/common/TopRightArrows';
import type { GeminiSet } from '@/types/result';

interface FontData {
    font_link: string;
    image_link: string;
    image_alt: string;
}

interface FontBoxProps {
    geminiSet: GeminiSet;
    onResolved?: (font: { name?: string; link?: string; image_link?: string }) => void;
    onPrev?: () => void;
    onNext?: () => void;
    disablePrev?: boolean;
    disableNext?: boolean;
    fontIndex?: number;
}

export default function FontBox({ geminiSet, onResolved, onPrev, onNext, disablePrev, disableNext, fontIndex = 0 }: FontBoxProps) {
    const [font, setFont] = useState<FontData | null>(null);
    const fontKeyword = geminiSet.font;

    useEffect(() => {
        if (!fontKeyword) {
            setFont(null);
            onResolved?.({ name: '' });
            return;
        }
        fetch('/data/noonnu_fonts.json')
            .then(res => res.json())
            .then(data => {
                const matched: FontData[] = data[fontKeyword] || [];
                if (matched.length > 0) {
                    const picked = matched[fontIndex % matched.length];
                    setFont(picked);
                    onResolved?.({
                        name: fontKeyword,
                        link: picked.font_link,
                        image_link: picked.image_link,
                    });
                } else {
                    setFont(null);
                    onResolved?.({ name: fontKeyword });
                }
            })
            .catch(err => {
                console.error('폰트 데이터 로드 실패:', err);
                setFont(null);
            });
    }, [fontKeyword, onResolved, fontIndex]);

    return (
        <div className={styles.container}>
            <div className={styles.title}>FONT</div>
            <TopRightArrows
                onPrev={onPrev}
                onNext={onNext}
                disablePrev={disablePrev}
                disableNext={disableNext}
            />

            <div className={styles.content}>
                {font ? (
                    <a href={font.font_link} target="_blank" rel="noopener noreferrer">
                        <Image src={font.image_link} alt={font.image_alt} width={150} height={50} className={styles.image} />
                    </a>
                ) : (
                    <div className={styles.notFound}>폰트 정보를 찾을 수 없습니다.</div>
                )}
            </div>
        </div>
    );
}
