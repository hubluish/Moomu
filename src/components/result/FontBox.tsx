// ConceptBox.tsx
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
}

export default function FontBox({ fontKeyword }: FontBoxProps) {
    const [fonts, setFonts] = useState<FontData[]>([]);
    const [page, setPage] = useState(0);
    const fontsPerPage = 3;

    useEffect(() => {
        fetch('/data/noonnu_fonts.json')
        .then(res => res.json())
        .then(data => {
        const matched = data[fontKeyword] || [];
        setFonts(matched);
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
