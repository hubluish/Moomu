"use client";
import React, { useState } from "react";
import Tab from "@/components/section/article/tab/tab";
import Home from "@/components/section/article/homeRecommend/home";
import SearchField from "@/components/common/searchField/SearchField";
import ImageSlider from "@/components/section/article/pagenationCard/pagenationCard";
import TabPage from "@/components/section/article/tabPage/tabPage";
import styles from "./article.module.css";

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

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Article</h1>
      <SearchField value={search} onChange={e => setSearch(e.target.value)} />
      <Tab activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab === 0 ? (
        <>
          <ImageSlider />
          <Home />
        </>
      ) : (
        <TabPage tabIdx={activeTab} articles={articles} />
      )}
    </div>
  );
}