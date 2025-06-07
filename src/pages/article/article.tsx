"use client";
import React, { useEffect, useState, useRef } from "react";
import Tab from "@/components/section/article/tab/tab";
import Articlehome from "@/components/section/article/homeRecommend/home";
import SearchField from "@/components/common/searchField/SearchField";
import ImageSlider from "@/components/section/article/pagenationCard/pagenationCard";
import TabPage from "@/components/section/article/tabPage/tabPage";
import ArticleCreate from "@/components/section/article/ArticleCreate";
import styles from "./article.module.css";
import confetti from "canvas-confetti";
import { useSearchParams } from "next/navigation";

interface Article {
  _id: string;
  title: string;
  content: string;
  category: string;
  date: string;
  imageUrl?: string;
  description?: string;
}

// // 예시 데이터
// const initialArticles = [
//   {
//     _id: 1, // id → _id로 변경
//     title: "Get the latest updates",
//     content: "Card News Template",
//     category: "카드뉴스",
//     date: "25.05.28",
//     imageUrl: "",
//     description: "Card News Template",
//   },
//   {
//     _id: 2,
//     title: "Get the latest updates",
//     content: "Card News Template",
//     category: "카드뉴스",
//     date: "25.05.30",
//     imageUrl: "",
//     description: "Card News Template",
//   },
//   {
//     _id: 3,
//     title: "Get the latest updates",
//     content: "Card News Template",
//     category: "UI",
//     date: "25.05.25",
//     imageUrl: "",
//     description: "Card News Template",
//   },
//   {
//     _id: 4,
//     title: "Get the latest updates",
//     content: "Card News Template",
//     category: "용어사전",
//     date: "25.05.25",
//     imageUrl: "",
//     description: "Card News Template",
//   },
//   {
//     _id: 5,
//     title: "Get the latest updates",
//     content: "Card News Template",
//     category: "카드뉴스",
//     date: "25.05.28",
//     imageUrl: "",
//     description: "Card News Template",
//   },
//   {
//     _id: 6,
//     title: "Get the latest updates",
//     content: "Card News Template",
//     category: "카드뉴스",
//     date: "25.05.30",
//     imageUrl: "",
//     description: "Card News Template",
//   },
  
//   // ...더 추가 가능
// ];

const CATEGORY_OPTIONS = ["전체", "UI", "카드뉴스", "포스터", "용어사전", "트렌드"];

// 예시: 탭 인덱스와 카테고리 매핑
const TAB_LABELS = ["전체", "UI", "카드뉴스", "포스터", "용어사전", "트렌드"];

export default function Article() {
  const [activeTab, setActiveTab] = useState(0);
  const [search, setSearch] = useState("");
  const [articles, setArticles] = useState<Article[]>([]);
  const [showCreate, setShowCreate] = useState(false);
  const titleRef = useRef<HTMLSpanElement | null>(null); // 타입 명시!
  const searchParams = useSearchParams();

  // Article 텍스트 호버 시 콘페티
  const handleTitleHover = () => {
    if (titleRef.current) {
      const rect = titleRef.current.getBoundingClientRect();
      // 화면 내에서 글씨의 중앙 좌표를 구함
      const x = (rect.left + rect.width / 2) / window.innerWidth;
      const y = (rect.top + rect.height / 2) / window.innerHeight;
      confetti({
        particleCount: 50,
        spread: 50,
        origin: { x, y },
        shapes: ["circle", "square"],
        startVelocity: 20, 
        gravity: 1.5,     
      });
    }
  };

  useEffect(() => {
    fetch("/api/articles")
      .then(res => res.json())
      .then(data => setArticles(data));
  }, []);

  useEffect(() => {
    if (!searchParams) return;
    const category = searchParams.get("category");
    if (category) {
      const idx = CATEGORY_OPTIONS.indexOf(category);
      if (idx !== -1) setActiveTab(idx);
    }
  }, [searchParams]);

  const filteredArticles = activeTab === 0
    ? articles
    : articles.filter(article => article.category === TAB_LABELS[activeTab]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
      }}
    >
      <div className={styles.container}>
        <button className={styles.button} onClick={() => setActiveTab(0)}>
          <h1 className={styles.title}>
            <span
              ref={titleRef}
              onMouseEnter={handleTitleHover}
              style={{ display: "inline-block" }}
            >
              Article
            </span>
          </h1>
        </button>
        <SearchField value={search} onChange={e => setSearch(e.target.value)} />
        <Tab activeTab={activeTab} setActiveTab={setActiveTab} />
        {activeTab === 0 ? (
          <>
            <ImageSlider />
            <Articlehome setActiveTab={setActiveTab} />
          </>
        ) : (
          <TabPage
            tabIdx={activeTab}
            articles={articles.map(article => ({
              ...article,
              imageUrl: article.imageUrl ?? "",
              description: article.description ?? "", // 이 부분 추가
            }))}
          />
        )}
        {activeTab !== 0 && filteredArticles.length === 0 ? (
          <div className={styles.centerMessage}>게시글이 없습니다.</div>
        ) : (
          <ul>
          </ul>
        )}
        <button onClick={() => setShowCreate(true)}>글쓰기</button>
        {showCreate && (
          <ArticleCreate
            onCreated={() => {
              setShowCreate(false);
              // 새 글 등록 후 목록 새로고침
              fetch("/api/articles")
                .then(res => res.json())
                .then(data => setArticles(data));
            }}
          />
        )}
      </div>
    </div>
  );
}