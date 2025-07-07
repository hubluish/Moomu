'use client';

import React from 'react';

const SeeMoreButton = ({ onClick }: { onClick?: () => void }) => {
    return (
        <button
        onClick={onClick}
        style={{
            margin: '50px auto',
            display: 'flex',
            width: '130px',
            height: '30px',
            padding: '6.3px',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            aspectRatio: '13 / 3',
            borderRadius: '4.2px',
            background: 'var(--notice, #F1F3F5)',
            color: 'var(--sub-text, #6B7280)',
            fontFamily: 'Pretendard, sans-serif',
            fontSize: '16px',
            fontStyle: 'normal',
            fontWeight: 700,
            lineHeight: 'normal',
            border: 'none',
            cursor: 'pointer',
        }}
        >
        더보기
        </button>
    );
};

export default SeeMoreButton;
