"use client";
import React, { useRef, useState } from "react";
import axios from "axios";
import styles from "./big.module.css";
import { useRouter } from "next/navigation";

interface ArticleCardProps {
  _id: string; // MongoDB의 ObjectId는 string으로 처리
  imageUrl: string;
  title: string;
  description: string;
  category: string;
  date: string;
  onDelete: (_id: string) => void;
}

export default function ArticleCard({
  _id,
  imageUrl,
  title,
  description,
  category,
  date,
  onDelete,
}: ArticleCardProps) {
  const router = useRouter();
  const [hovered, setHovered] = useState(false);
  const qCount = useRef(0);

  // 카드 클릭 시 이동
  const handleClick = async () => {
    // 조회수 증가 요청
    await fetch(`/api/articles/${_id}`, { method: "POST" });
    // 상세 페이지로 이동
    router.push(`/article/${_id}`);
  };

  React.useEffect(() => {
    if (!hovered) return;
    const onKeyDown = async (e: KeyboardEvent) => {
      if (e.key === "q" || e.key === "Q") {
        qCount.current += 1;
        if (qCount.current === 3) {
          // 1. DB에서 삭제
          await axios.delete(`/api/articles/${_id}`);
          // 2. UI에서 제거
          onDelete(_id);
          qCount.current = 0;
        }
      } else {
        qCount.current = 0;
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      qCount.current = 0;
    };
  }, [hovered, _id, onDelete]);

  return (
    // 카드 전체 컨테이너 (hover, click 이벤트)
    <div
      onClick={handleClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={styles.card}
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