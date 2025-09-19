
import React, { useRef, useState, useEffect } from 'react';
interface P1Props {
  openLoginModal?: () => void;
}
import './P1.css';
// import gsap from 'gsap';

const P1 = ({ openLoginModal }: P1Props) => {
  // 8占??占쏙옙?吏 諛곗뿴
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
  const slideWidth = 300; // ?占쏙옙?吏 ???占쎌쓽 ?占쎈퉬(px)
  const gap = 10; // ?占쏙옙?吏 ?占쎌씠 媛꾧꺽(px)
  const totalWidth = visibleCount * slideWidth + (visibleCount - 1) * gap;
  // 臾댄븳 ?占쏀솚???占쏀빐 ?占쎈낯 諛곗뿴??2諛곕줈 ?占쎌옣
  const loopImages = [...images, ...images, ...images];

  // ?占쎌냽 ?占쏀겕濡ㅼ쓣 ?占쏀븳 ?占쏙옙? ?占쎌쐞 ?占쏀봽?占쎄낵 RAF 猷⑦봽
  const [offset, setOffset] = useState(0);
  const rafRef = useRef<number | null>(null);
  const lastTsRef = useRef<number | null>(null);
  const speedPxPerSec = 120; // ?占쎈룄(px/s)

  useEffect(() => {
    const track = images.length * (slideWidth + gap); // ?占쎈낯 ???占쏀듃 湲몄씠(px)
    const wrapAt = Math.max(0, track - totalWidth + 1); // 遺꾧린?占쎌쓣 理쒙옙????占쎈Ⅸ占?酉고룷??占??占쎈줈
    const loop = (ts: number) => {
      if (lastTsRef.current == null) lastTsRef.current = ts;
      const dt = (ts - lastTsRef.current) / 1000; // sec
      lastTsRef.current = ts;
      setOffset(prev => {
        let next = prev + speedPxPerSec * dt;
        if (next >= track) next -= track; // seam??蹂댁씠占??占쎌뿉 ?占쎄컧占?        return next;
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



  // ?占쏙옙?吏 移대뱶 ?占쎈뜑占?(怨좎젙 8占?
  const renderImageCards = () => {
    // ?占쎌슜?占쏙옙? ?占쎌쓬 (?占쎈씪?占쎈뱶 諛⑹떇?占쎈줈 蹂占?
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




