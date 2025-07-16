// ConceptBox.tsx
'use client';

import React, { useState } from 'react';

interface GeminiSet {
  color_keywords: string[];
  image_keyword: string;
  font_keyword: string;
  sentences: string[];
}

interface ConceptBoxProps {
  geminiResult: GeminiSet[] | null;
}

export default function ConceptBox({ geminiResult }: ConceptBoxProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!geminiResult || geminiResult.length === 0) {
    return (
      <div style={styles.container}>
        <div style={styles.title}>Concepts</div>
        <div style={styles.content}>
          <p style={styles.text}>컨셉 정보를 불러올 수 없습니다.</p>
        </div>
      </div>
    );
  }

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => Math.max(0, prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => Math.min(geminiResult.length - 1, prevIndex + 1));
  };

  const currentSentences = geminiResult[currentIndex].sentences;

  return (
    <div style={styles.container}>
      <div style={styles.title}>Concepts</div>
      {currentIndex > 0 && (
        <button style={{ ...styles.arrow, ...styles.left }} onClick={handlePrev}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="40" viewBox="0 0 20 40" fill="none">
            <path opacity="0.25" d="M0 20L17.3077 40L20 36.6667L5.76923 20L20 3.33333L17.3077 0L0 20Z" fill="black" />
          </svg>
        </button>
      )}
      {currentIndex < geminiResult.length - 1 && (
        <button style={{ ...styles.arrow, ...styles.right }} onClick={handleNext}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="40" viewBox="0 0 20 40" fill="none">
            <path opacity="0.25" d="M2.69231 0L0 3.33333L14.2308 20L0 36.6667L2.69231 40L20 20L2.69231 0Z" fill="black" />
          </svg>
        </button>
      )}
      <div style={styles.content}>
        {currentSentences.map((sentence, index) => (
          <p key={index} style={styles.text}>- {sentence}</p>
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
    lineHeight: '15px',
    },
    content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '16px',
    textAlign: 'left',
    padding: '0 40px',
    },
    text: {
    fontFamily: 'Pretendard',
    fontSize: '24px',
    color: '#000',
    margin: 0,
    lineHeight: '24px',
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
        left: '10px',
    },
    right: {
        right: '10px',
    },
};