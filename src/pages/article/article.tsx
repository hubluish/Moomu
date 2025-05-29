"use client";
import React, { useState } from "react";
import Tab from "@/components/section/article/tab/tab";
import Home from "@/components/section/article/homeRecommend/home";
import SearchField from "@/components/common/searchField/SearchField";
import ImageSlider from "@/components/section/article/pagenationCard/pagenationCard";
import styles from "./article.module.css";

const TAB_LABELS = ["전체", "UI", "카드뉴스", "포스터", "용어사전", "트렌드"];

export default function Article() {
  const [activeTab, setActiveTab] = useState(0);
  const [search, setSearch] = useState("");

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Article</h1>
      <SearchField value={search} onChange={e => setSearch(e.target.value)} />
      <Tab activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab === 0 ? (
        <>
          <ImageSlider />
          <Home/>
        </>
      ) : (
        <div className={styles.centerMessage}>
          {TAB_LABELS[activeTab]} 페이지 입니다~
        </div>
      )}
    </div>
  );
}
