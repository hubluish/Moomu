"use client";
import React, { useState, useRef } from "react";
import Tab from "@/components/section/article/tab/tab";
import Articlehome from "@/components/section/article/homeRecommend/home";
import SearchField from "@/components/common/searchField/SearchField";
import ImageSlider from "@/components/section/article/pagenationCard/pagenationCard";
import TabPage from "@/components/section/article/tabPage/tabPage";
import styles from "./article.module.css";
import confetti from "canvas-confetti";

// 예시 데이터
const initialArticles = [
  {
    id: 1,
    title: "Get the latest updates",
    content: "Card News Template",
    category: "카드뉴스",
    date: "25.05.28",
    imageUrl: "",
    description: "Card News Template",
  },
  {
    id: 2,
    title: "Get the latest updates",
    content: "Card News Template",
    category: "카드뉴스",
    date: "25.05.30",
    imageUrl: "",
    description: "Card News Template",
  },
  {
    id: 3,
    title: "Get the latest updates",
    content: "Card News Template",
    category: "UI",
    date: "25.05.25",
    imageUrl: "",
    description: "Card News Template",
  },
  {
    id: 4,
    title: "Get the latest updates",
    content: "Card News Template",
    category: "용어사전",
    date: "25.05.25",
    imageUrl: "",
    description: "Card News Template",
  },
  {
    id: 5,
    title: "Get the latest updates",
    content: "Card News Template",
    category: "카드뉴스",
    date: "25.05.28",
    imageUrl: "",
    description: "Card News Template",
  },
  {
    id: 6,
    title: "Get the latest updates",
    content: "Card News Template",
    category: "카드뉴스",
    date: "25.05.30",
    imageUrl: "",
    description: "Card News Template",
  },
  
  // ...더 추가 가능
];

export default function Article() {
  const [activeTab, setActiveTab] = useState(0);
  const [search, setSearch] = useState("");
  const [articles, setArticles] = useState(initialArticles);
  const titleRef = useRef(null);

  // Article 텍스트 호버 시 콘페티
  const handleTitleHover = () => {
    if (titleRef.current) {
      const rect = titleRef.current.getBoundingClientRect();
      // 화면 내에서 글씨의 중앙 좌표를 구함
      const x = (rect.left + rect.width / 2 -500) / window.innerWidth;
      const y = (rect.top + rect.height / 2) / window.innerHeight;
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { x, y },
        shapes: ["circle", "square", "triangle"],
      });
    }
  };

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
          <h1
            className={styles.title}
            ref={titleRef}
            onMouseEnter={handleTitleHover}
          >
            Article
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
          <TabPage tabIdx={activeTab} articles={articles} />
        )}
      </div>
    </div>
  );
}