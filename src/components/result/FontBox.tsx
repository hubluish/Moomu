// ConceptBox.tsx
'use client';

import React, {useEffect, useState} from 'react';
import Image from 'next/image';

interface FontData {
    font_link: string;
    image_link: string;
    image_alt: string;
}

export default function FontBox() {
    const [fonts, setFonts] = useState<FontData[]>([]);
    const [page, setPage] = useState(0);
    const fontsPerPage = 3;

    useEffect(() => {
        fetch('/data/noonnu_fonts.json')
        .then(res => res.json())
        .then(data => setFonts(data))
        .catch(err => console.error('폰트 데이터 로드 실패:', err));
    }, []);

    const startIdx = page * fontsPerPage;
    const currentFonts = fonts.slice(startIdx, startIdx + fontsPerPage);
    const hasPrev = page > 0;
    const hasNext = startIdx + fontsPerPage < fonts.length;

    return (
        <div style={styles.container}>
        <div style={styles.title}>Fonts</div>
        {hasPrev && (
        <button style={{ ...styles.arrow, ...styles.left }} onClick={() => setPage(page - 1)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="40" viewBox="0 0 20 40" fill="none">
                <path opacity="0.25" d="M0 20L17.3077 40L20 36.6667L5.76923 20L20 3.33333L17.3077 0L0 20Z" fill="black" />
            </svg>
            </button>
        )}

        {hasNext && (
            <button style={{ ...styles.arrow, ...styles.right }} onClick={() => setPage(page + 1)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="40" viewBox="0 0 20 40" fill="none">
                <path opacity="0.25" d="M2.69231 0L0 3.33333L14.2308 20L0 36.6667L2.69231 40L20 20L2.69231 0Z" fill="black" />
            </svg>
            </button>
        )}

        <div style={styles.content}>
            {currentFonts.map((font, idx) => (
            <a key={idx} href={font.font_link} target="_blank" rel="noopener noreferrer">
                <Image src={font.image_link} alt={font.image_alt} width={150} height={50} style={styles.image} />
            </a>
            ))}
        </div>
        </div>
    );
}

const styles: { [key: string]: React.CSSProperties } = {
    container: {
    borderRadius: '30px',
    border: '2px solid #E6E8EC',
    background: '#FFF',
    boxShadow: '0px 4px 10px 0px rgba(0, 0, 0, 0.25)',
    width: '384px',
    height: '313px',
    flexShrink: 0,
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    boxSizing: 'border-box',
    },
    title: {
    position: 'absolute',
    top: '20px',
    left: '20px',
    color: '#000',
    fontFamily: 'Pretendard',
    fontSize: '32px',
    fontStyle: 'normal',
    fontWeight: 500,
    lineHeight: '15px', // 46.875% of what? This seems off but kept as you specified
    },
    content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '20px',
    textAlign: 'center',
    padding: '0 24px',
    },
    image: {
    width: '150px',
    height: 'auto',
    cursor: 'pointer',
    borderRadius: '10px',
    },
    arrow: {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    background: 'transparent',
    border: 'none',
    padding: 0,
    cursor: 'pointer',
    },
    left: {
        left: '0px',
    },
    right: {
        right: '0px',
    },
};
