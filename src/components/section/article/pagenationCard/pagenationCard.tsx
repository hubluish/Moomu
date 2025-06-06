"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Pagenation from "../../../common/pagenation";
import styles from "./pagenation.module.css";
import Image from "next/image";


const SLIDES = [
  {
    imageUrl: "https://i.pinimg.com/736x/ad/5c/e8/ad5ce8a1990f789e86bfc9d67129990e.jpg",
    title1: "신뢰도 있는 기업 UI 디자인",
    title2: "이렇게해보세요!",
    desc1: "Lorem Ipsum Dolor Sit Amet Ipsum",
    desc2: "Consectetur. Lorem Ipsum",
    category: "UI", // 추가
    title: "신뢰도 있는 기업 UI 디자인", // 추가 (URL에 쓸 title)
  },
  {
    imageUrl: "https://i.pinimg.com/736x/61/4a/8a/614a8a38d0202ab842c5823c91234f78.jpg",
    title1: "혁신적인 UI 트렌드",
    title2: "지금 확인하세요!",
    desc1: "최신 디자인 적용",
    desc2: "사용자 경험 향상",
    category: "UI", // 추가
    title: "혁신적인 UI 트렌드", // 추가 (URL에 쓸 title)
  },
  {
    imageUrl: "https://i.pinimg.com/736x/2c/5c/ea/2c5cea1edd154001b9d3c78dc638e0c7.jpg",
    title1: "신뢰도 있는 기업 카드뉴스 디자인",
    title2: "이렇게해보세요!",
    desc1: "Lorem Ipsum Dolor Sit Amet Ipsum",
    desc2: "Consectetur. Lorem Ipsum",
    category: "Card News", // 추가
    title: "신뢰도 있는 기업 카드뉴스 디자인", // 추가 (URL에 쓸 title)
  },
  {
    imageUrl: "https://i.pinimg.com/736x/84/ad/22/84ad220a3eb0f5e0e35ff7e03736857c.jpg",
    title1: "혁신적인 UI 트렌드",
    title2: "지금 확인하세요!",
    desc1: "최신 디자인 적용",
    desc2: "사용자 경험 향상",
    category: "UI", // 추가
    title: "혁신적인 UI 트렌드", // 추가 (URL에 쓸 title)
  },
];

export default function ImageSlider() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const [fade, setFade] = useState(true);
  const lastIdx = SLIDES.length - 1;
  const router = useRouter();

  // 자동 슬라이드 (3초)
  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrent((prev) => (prev === lastIdx ? 0 : prev + 1));
        setFade(true);
      }, 200); // 페이드 아웃 후 이미지 변경
    }, 2000);
    return () => clearInterval(timer);
  }, [lastIdx, paused]);

  // 페이지네이션 클릭 시 페이드 인
  const handleChange = (idx: number) => {
    setFade(false);
    setTimeout(() => {
      setCurrent(idx);
      setFade(true);
    }, 200);
  };

  const slide = SLIDES[current];

  // 카드 클릭 시 이동
  const handleCardClick = () => {
    // encodeURIComponent로 안전하게 변환
    router.push(`/article/${encodeURIComponent(slide.category)}/${encodeURIComponent(slide.title)}`);
  };

  return (
    <div className={styles.frame}>
      <div
        className={styles.imageFrame}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        style={{ overflow: "hidden", position: "relative" }}
        onClick={handleCardClick}
      >
        <div
          className={styles.imageWrap}
          style={{
            opacity: fade ? 1 : 0,
            transition: "opacity 0.3s var(--anim-ease-default)",
            width: "100%",
            height: "100%",
            position: "relative",
          }}
        >
          <Image
            src={slide.imageUrl}
            alt={slide.title1}
            className={styles.image}
            draggable={false}
            width={1200}
            height={400} 
            style={{
              userSelect: "none",
              pointerEvents: "none",
              
              objectFit: "cover",
              borderRadius: "16px",
            }}
          />
          <div className={styles.gradient1} />
          <div className={styles.gradient2} />
          <div className={styles.textFrame}>
            <div className={styles.text1}>
              <div className={styles.text1_1}>{slide.title1}</div>
              <div className={styles.text1_2}>{slide.title2}</div>
            </div>
            <div className={styles.text2}>
              <div className={styles.text2_1}>{slide.desc1}</div>
              <div className={styles.text2_2}>{slide.desc2}</div>
            </div>
          </div>
          {/* 페이지네이션을 이미지 하단 위에 겹치게 */}
          <div className={styles.pagenationOverlay}>
            <Pagenation
              pageCount={SLIDES.length}
              current={current}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
}