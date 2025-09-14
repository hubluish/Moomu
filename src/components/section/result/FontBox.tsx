'use client';

import React, {useEffect, useState} from 'react';
import Image from 'next/image';
import styles from './FontBox.module.css';
import TopRightArrows from '@/components/common/TopRightArrows';

interface FontData {
    font_link: string;
    image_link: string;
    image_alt: string;
}

interface FontBoxProps {
    fontKeyword: string;
    onResolved?: (font: { name?: string; link?: string; image_link?: string }) => void; // <-- 추가
}

export default function FontBox({ fontKeyword, onResolved }: FontBoxProps) {
    const [fonts, setFonts] = useState<FontData[]>([]);
    const [page, setPage] = useState(0);
    const fontsPerPage = 3;

    useEffect(() => {
        fetch('/data/noonnu_fonts.json')
            .then(res => res.json())
            .then(data => {
                const matched: FontData[] = data[fontKeyword] || [];
                if (matched.length > 0) {
                const picked = matched[Math.floor(Math.random() * matched.length)];
                setFonts([picked]);
                // 부모에게 보고
                onResolved?.({
                    name: fontKeyword,
                    link: picked.font_link,
                    image_link: picked.image_link,
                });
                } else {
                setFonts([]);
                onResolved?.({ name: fontKeyword }); // 링크 없을 때도 이름만
                }
            })
            .catch(err => console.error('폰트 데이터 로드 실패:', err));
    }, [fontKeyword]);

    const startIdx = page * fontsPerPage;
    const currentFonts = fonts.slice(startIdx, startIdx + fontsPerPage);
    const hasPrev = page > 0;
    const hasNext = startIdx + fontsPerPage < fonts.length;

    return (
        <div className={styles.container}>
            <div className={styles.title}>FONT</div>
            <TopRightArrows
                onPrev={() => setPage(Math.max(0, page - 1))}
                onNext={() => setPage(hasNext ? page + 1 : page)}
                disablePrev={!hasPrev}
                disableNext={!hasNext}
            />

        <div className={styles.content}>
            {currentFonts.map((font, idx) => (
            <a key={idx} href={font.font_link} target="_blank" rel="noopener noreferrer">
                <Image src={font.image_link} alt={font.image_alt} width={150} height={50} className={styles.image} />
            </a>
            ))}
        </div>
        </div>
    );
}
