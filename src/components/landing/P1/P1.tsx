import React, { useRef, useState, useEffect } from 'react';
interface P1Props {
  openLoginModal?: () => void;
}
import './P1.css';

const P1 = ({ openLoginModal }: P1Props) => {
  const images = [
    '/assets/carousel/img1.png',
    '/assets/carousel/img2.png',
    '/assets/carousel/img3.png',
    '/assets/carousel/img4.png',
    '/assets/carousel/img5.png',
    '/assets/carousel/img6.png',
    '/assets/carousel/img7.png',
    '/assets/carousel/img8.png'
  ];
  const visibleCount = 6;
  const slideWidth = 300;
  const gap = 10;

  const loopImages = [...images, ...images, ...images];

  const [offset, setOffset] = useState(0);
  const rafRef = useRef<number | null>(null);
  const lastTsRef = useRef<number | null>(null);
  const speedPxPerSec = 120;

  useEffect(() => {
    const track = images.length * (slideWidth + gap);
    const loop = (ts: number) => {
      if (lastTsRef.current == null) lastTsRef.current = ts;
      const dt = (ts - lastTsRef.current) / 1000;
      lastTsRef.current = ts;
      setOffset(prev => {
        let next = prev + speedPxPerSec * dt;
        if (next >= track) next -= track;
        return next;
      });
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      lastTsRef.current = null;
    };
  }, [images.length, slideWidth, gap]);

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
            transition: 'none',
            transform: `translateX(-${offset}px)`,
            height: '100%',
            willChange: 'transform',
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




