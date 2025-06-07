"use client";
import React from "react";
import styles from "./big.module.css";
import { useRouter } from "next/navigation";

interface ArticleCardProps {
  _id : string; // MongoDB의 ObjectId는 string으로 처리
  imageUrl: string;
  title: string;
  description: string;
  category: string;
  date: string;
}

export default function ArticleCard({
  _id,
  imageUrl,
  title,
  description,
  category,
  date,
}: ArticleCardProps) {
  const router = useRouter();

  // 카드 클릭 시 이동
  const handleClick = () => {
    router.push(`/article/${_id}`);
  };

  return (
    // 카드 전체 컨테이너 (hover, click 이벤트)
    <div
      className={styles.card}
      onClick={handleClick}
      style={{ cursor: "pointer" }}
    >
      {/* 이미지 컨테이너 */}
      <div className={styles.imageContainer}>
        {/* 이미지 */}
        <div
          className={styles.image}
          style={{
            background: `url(${imageUrl}) center/cover, rgba(217, 217, 217, 0.50)`,
          }}
        >
          {/* 태그 (필요시 내용 추가) */}
          <div className={styles.tag}></div>
        </div>
      </div>
      {/* 텍스트 컨테이너 */}
      <div className={styles.textContainer}>
        {/* 카테고리/날짜 row */}
        <div className={styles.row}>
          <span className={styles.category}>{category}</span>
          <span className={styles.date}>{date}</span>
        </div>
        {/* 타이틀 */}
        <div className={styles.title}>{title}</div>
        {/* 설명 */}
        <div className={styles.description}>{description}</div>
      </div>
    </div>
  );
}