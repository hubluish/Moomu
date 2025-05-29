"use client";

import React, { useState } from "react";
import Pagenation from "../../../common/pagenation";
import styles from "./pagenation.module.css";


const SLIDES = [
  {
    imageUrl: "https://i.pinimg.com/736x/ad/5c/e8/ad5ce8a1990f789e86bfc9d67129990e.jpg",
    title1: "신뢰도 있는 기업 UI 디자인",
    title2: "이렇게해보세요!",
    desc1: "Lorem Ipsum Dolor Sit Amet Ipsum",
    desc2: "Consectetur. Lorem Ipsum",
  },
  {
    imageUrl: "https://i.pinimg.com/736x/61/4a/8a/614a8a38d0202ab842c5823c91234f78.jpg",
    title1: "혁신적인 UI 트렌드",
    title2: "지금 확인하세요!",
    desc1: "최신 디자인 적용",
    desc2: "사용자 경험 향상",
  },
  {
    imageUrl: "https://i.pinimg.com/736x/2c/5c/ea/2c5cea1edd154001b9d3c78dc638e0c7.jpg",
    title1: "신뢰도 있는 기업 카드뉴스 디자인",
    title2: "이렇게해보세요!",
    desc1: "Lorem Ipsum Dolor Sit Amet Ipsum",
    desc2: "Consectetur. Lorem Ipsum",
  },
  {
    imageUrl: "https://i.pinimg.com/736x/84/ad/22/84ad220a3eb0f5e0e35ff7e03736857c.jpg",
    title1: "혁신적인 UI 트렌드",
    title2: "지금 확인하세요!",
    desc1: "최신 디자인 적용",
    desc2: "사용자 경험 향상",
  },
];

export default function ImageSlider() {
  const [current, setCurrent] = useState(0);
  const slide = SLIDES[current];
  const lastIdx = SLIDES.length - 1;

  // 오른쪽(다음)으로 이동
  const goNext = () => setCurrent(current === lastIdx ? 0 : current + 1);
  // 왼쪽(이전)으로 이동
  const goPrev = () => setCurrent(current === 0 ? lastIdx : current - 1);

  return (
    <div className={styles.frame}>
      <div className={styles.imageFrame}>
        {/* 왼쪽 화살표 버튼 */}
        <button className={styles.arrowLeft} onClick={goPrev} aria-label="이전 슬라이드">
          &lt;
        </button>
        <div className={styles.imageWrap}>
          <img src={slide.imageUrl} alt={slide.title1} className={styles.image} />
          <div className={styles.gradient1} />
          <div className={styles.gradient2} />
        </div>
        {/* 오른쪽 화살표 버튼 */}
        <button className={styles.arrowRight} onClick={goNext} aria-label="다음 슬라이드">
          &gt;
        </button>
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
      </div>
      <Pagenation
        pageCount={SLIDES.length}
        current={current}
        onChange={setCurrent}
      />
    </div>
  );
}