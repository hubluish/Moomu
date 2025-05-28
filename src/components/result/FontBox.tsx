// ConceptBox.tsx
'use client';

import React from 'react';

export default function FontBox() {
    return (
        <div style={styles.container}>
        <div style={styles.title}>Fonts</div>
        <div style={styles.content}>
            <p style={styles.text}>다람쥐 헌 쳇바퀴에 타고파</p>
            <p style={styles.text}>다람쥐 헌 쳇바퀴에 타고파</p>
            <p style={styles.text}>다람쥐 헌 쳇바퀴에 타고파</p>
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
    gap: '50px',
    textAlign: 'center',
    padding: '0 24px',
    },
    text: {
    fontFamily: 'Pretendard',
    fontSize: '24px',
    color: '#000',
    margin: 0,
    lineHeight: '24px',
    },
};
