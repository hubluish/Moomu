"use client";
import React, { useState } from "react";
import styles from "./tabPage.module.css";
import ArticleCard from "../bigCard/big";
import Dropdown from "@/components/common/dropdown/dropdown";

const TAB_INFO = [
  { label: "UI", title: "UI 디자인 🔍", desc: "Exploring the latest trends and innovations in user interface design." },
  { label: "카드뉴스", title: "카드뉴스 🔍", desc: "Exploring the latest trends and innovations in card news." },
  { label: "포스터", title: "포스터 🔍", desc: "Exploring the latest trends and innovations in posters." },
  { label: "용어사전", title: "디자인 용어 사전 🔍", desc: "Exploring the latest trends and innovations in user interface design." },
  { label: "트렌드", title: "트렌드 🔍", desc: "Exploring the latest trends and innovations in design trends." },
];

export default function TabPage({ tabIdx, articles }) {
  // tabIdx: 1~5 (0은 전체)
  const [showAll, setShowAll] = useState(false);
  const [sort, setSort] = useState("추천순");

  // 예시: 탭별 더미 데이터 필터링
  const filtered = articles.filter(a => a.category === TAB_INFO[tabIdx - 1].label);

  // 3개씩 묶어서 보여주기
  const chunked = [];
  for (let i = 0; i < filtered.length; i += 4) {
    chunked.push(filtered.slice(i, i + 4));
  }
  const visibleChunks = showAll ? chunked : chunked.slice(0, 4);

  return (
    <div className={styles.wrapper}>
      {/* 1. Title 영역 */}
      <div className={styles.titleRow}>
        <div className={styles.titleCol}>
          <div className={styles.bigTitle}>{TAB_INFO[tabIdx - 1].title}</div>
          <div className={styles.desc}>{TAB_INFO[tabIdx - 1].desc}</div>
        </div>
        {/* 2. Line */}
      <div className={styles.line} />
      </div>
      
      {/* 3. Field */}
      <div className={styles.field}>
        {/* 3-1. 드롭다운 */}
        <Dropdown value={sort} onChange={setSort} />
        {/* 3-2~3-4. big카드 3개씩 묶음 */}
        {visibleChunks.map((chunk, idx) => (
          <div className={styles.cardRow} key={idx}>
            {chunk.map((article, i) => (
              <ArticleCard key={i} {...article} />
            ))}
          </div>
        ))}
        {/* 3-5. 더보기 버튼 */}
        {!showAll && chunked.length > 3 && (
          <div className={styles.moreBtnWrap}>
            <button className={styles.moreBtn} onClick={() => setShowAll(true)}>
              <span className={styles.moreBtnText}>더보기</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}