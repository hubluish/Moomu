



import React, { useRef, useLayoutEffect, useState } from 'react';
interface P1Props {
  openLoginModal?: () => void;
}
import './P1.css';
import gsap from 'gsap';

const P1 = ({ openLoginModal }: P1Props) => {
  // 화면 중앙에 고정으로 보여줄 이미지 8개
  const images = [
    '/assets/images/img1.png',
    '/assets/images/img2.png',
    '/assets/images/img3.png',
    '/assets/images/img4.png',
    '/assets/images/img5.png',
    '/assets/images/img6.png',
    '/assets/images/img7.png',
    '/assets/images/img8.png'
  ];


  const galleryRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [hovered, setHovered] = useState<number | null>(null);


  // 이미지 카드 렌더링 (고정 8개)
  const renderImageCards = () => {
    return images.map((src, idx) => (
      <div
        key={idx}
        className={`image-card${hovered === idx ? ' hovered' : ''}`}
        onMouseEnter={() => handleMouseEnter(idx)}
        onMouseLeave={handleMouseLeave}
        style={{ marginRight: '8px', width: '120px' }}
      >
        <img
          className="image-placeholder"
          src={src}
          alt={`card-${idx + 1}`}
          draggable={false}
        />
      </div>
    ));
  };




  return (
    <section className="P1">
      <div className="P1-title-container">
        <div className="p1-subtitle">
          누구나 디자인을 쉽게
        </div>
        <div className="p1-title">
          Moomu
        </div>
      </div>


      {/* <div className="image-gallery">
        <div
          className="gallery-container"
          ref={galleryRef}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            width: '100%',
            maxWidth: '100%',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          {renderImageCards()}
        </div>
      </div> */}

      <div className="p1-description">
        <div className="p1-description-container">
          <p className="description">무한한 아이디어를 시각화하는 무드보드 제작 서비스, Moomu</p>
        </div>

        <div className="BtnContainer gradient-button">
          <button className="BtnText gradient-button" onClick={openLoginModal}>
            지금 바로 시작하기
          </button>
        </div>
      </div>
    </section>
  );
};

export default P1;
