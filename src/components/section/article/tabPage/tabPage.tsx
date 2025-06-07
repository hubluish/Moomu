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

interface ArticleCardProps {
  _id: string;
  imageUrl: string;
  title: string;
  description: string;
  date: string;
  category: string;
}

type Article = ArticleCardProps;

interface TabPageProps {
  tabIdx: number;
  articles: Article[];
  search?: string; // 추가
}

export default function TabPage({ tabIdx, articles, search = "" }: TabPageProps) {
  const [showAll, setShowAll] = useState(false);
  const [sort, setSort] = useState("추천순");

  // 1. 탭 필터
  let filtered = articles;
  if (tabIdx > 0) {
    filtered = filtered.filter(a => a.category === TAB_INFO[tabIdx - 1].label);
  }

  // 2. 검색어 필터
  const searchLower = search.trim().toLowerCase();
  if (searchLower) {
    filtered = filtered.filter(a => a.title.toLowerCase().includes(searchLower));
  }

  // 3. 4개씩 묶기
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
        <div className={styles.line} />
      </div>
      
      {/* 3. Field */}
      <div className={styles.field}>
        {/* 3-1. 드롭다운 */}
        <Dropdown value={sort} onChange={setSort} />
        {/* 3-2~3-4. big카드 3개씩 묶음 */}
        {visibleChunks.map((chunk, idx) => (
          <div className={styles.cardRow} key={idx}>
            {chunk.map((article: Article, i: number) => (
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