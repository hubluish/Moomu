// ConceptBox.tsx
'use client';

import React from 'react';

export default function ConceptBox() {
    return (
        <div style={styles.container}>
        <div style={styles.title}>Concepts</div>
        <div style={styles.content}>
            <p style={styles.text}>- 불필요한 장식을 덜어내 감정에 집중할 여백을 제공</p>
            <p style={styles.text}>- 미니멀한 요소로 환상적인 분위기 속에서 시선을 정돈하는 균형감 제공</p>
            <p style={styles.text}>- 미니멀하고 깨끗한 구조 위에 핸드드로잉과 파스텔이 조화를 이룸</p>
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
    gap: '16px',
    textAlign: 'center',
    padding: '0 24px',
    },
    text: {
    fontFamily: 'Pretendard',
    fontSize: '20px',
    color: '#000',
    margin: 0,
    lineHeight: '24px',
    },
};
