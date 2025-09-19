
import React, { useRef, useState, useEffect } from 'react';
interface P1Props {
  openLoginModal?: () => void;
}
import './P1.css';
// import gsap from 'gsap';

const P1 = ({ openLoginModal }: P1Props) => {
  // 8개 이미지 배열
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
  const visibleCount = 6;
  const slideWidth = 120; // 이미지 한 장의 너비(px)
  const gap = 10; // 이미지 사이 간격(px)
  const totalWidth = visibleCount * slideWidth + (visibleCount - 1) * gap;
  // 무한 반복을 위해 이미지 배열을 2번 이어붙임
  const loopImages = [...images, ...images];
  const [index, setIndex] = useState(0);
  const [transitioning, setTransitioning] = useState(false);

  // 자동 슬라이드 (한 번에 3칸씩, 더 빠른 속도)
  const slideStep = 3;
  const slideInterval = 1200; // 1.2초마다 이동
  const slideDuration = 400; // transition 0.4초
  useEffect(() => {
    const timer = setInterval(() => {
      setTransitioning(true);
      setIndex(prev => prev + slideStep);
    }, slideInterval);
    return () => clearInterval(timer);
  }, []);

  // 슬라이드가 끝에 도달하면 처음 위치로 자연스럽게 이동
  useEffect(() => {
    if (index >= images.length) {
      // 마지막 복제 이미지까지 이동 후, transition 없이 처음 위치로 점프
      const timeout = setTimeout(() => {
        setTransitioning(false);
        setIndex(index % images.length);
      }, slideDuration); // transition 시간과 맞춤
      return () => clearTimeout(timeout);
    } else {
      setTransitioning(true);
    }
  }, [index, images.length, slideDuration]);



  // 이미지 카드 렌더링 (고정 8개)
  const renderImageCards = () => {
    // 사용하지 않음 (슬라이드 방식으로 변경)
    return null;
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


      <div
        className="image-gallery"
        style={{
          position: 'relative',
          // width: `${totalWidth}px`,
          height: '180px',
          margin: '0 auto',
          overflow: 'hidden',
          borderRadius: '16px',
        }}
      >
        <div
          style={{
            display: 'flex',
            gap: `${gap}px`,
            transition: transitioning ? `transform ${slideDuration}ms` : 'none',
            transform: `translateX(-${index * (slideWidth + gap)}px)`,
            height: '100%',
          }}
        >
          {loopImages.map((src, idx) => (
            <div
              key={idx}
              style={{
                width: `${slideWidth}px`,
                height: '100%',
                flexShrink: 0,
                borderRadius: '12px',
                overflow: 'hidden',
                background: '#ddd',
              }}
            >
              <img
                src={src}
                alt={`image${(idx % images.length) + 1}`}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                draggable={false}
              />
            </div>
          ))}
        </div>
      </div>

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
