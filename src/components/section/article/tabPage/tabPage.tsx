"use client";
import React, { useEffect, useState } from "react";
import styles from "./tabPage.module.css";
import ArticleCard from "../bigCard/big";
import Dropdown from "@/components/common/dropdown/dropdown";
import { Article } from "../types/article";

const TAB_INFO = [
  {
    label: "UI",
    title: "UI 디자인 🔍",
    desc: "Exploring the latest trends and innovations in user interface design.",
  },
  {
    label: "카드뉴스",
    title: "카드뉴스 🔍",
    desc: "Exploring the latest trends and innovations in card news.",
  },
  {
    label: "포스터",
    title: "포스터 🔍",
    desc: "Exploring the latest trends and innovations in posters.",
  },
  {
    label: "용어사전",
    title: "디자인 용어 사전 🔍",
    desc: "Exploring the latest trends and innovations in user interface design.",
  },
  {
    label: "트렌드",
    title: "트렌드 🔍",
    desc: "Exploring the latest trends and innovations in design trends.",
  },
];

interface TabPageProps {
  tabIdx: number;
  articles: Article[];
  search?: string;
}

export default function TabPage({
  tabIdx,
  articles,
  search = "",
}: TabPageProps) {
  const [showAll, setShowAll] = useState(false);
  const [sort, setSort] = useState("추천순");
  const [articleList, setArticleList] = useState(articles);

  useEffect(() => {
    setArticleList(articles);
    setShowAll(false);
  }, [articles, tabIdx]);

  const handleDelete = (id: string | number) => {
    setArticleList((prev) => prev.filter((a) => a.id !== id));
  };

  let filtered = articleList;
  if (tabIdx > 0) {
    filtered = filtered.filter(
      (a) => a.category === TAB_INFO[tabIdx - 1].label
    );
  }

  const searchLower = search.trim().toLowerCase();
  if (searchLower) {
    filtered = filtered.filter((a) =>
      a.title.toLowerCase().includes(searchLower)
    );
  }

  if (sort === "최신순") {
    filtered = [...filtered].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  } else if (sort === "인기순") {
    filtered = [...filtered].sort((a, b) => (b.views ?? 0) - (a.views ?? 0));
  } else if (sort === "추천순") {
    filtered = [...filtered].sort((a, b) => {
      if ((b.isRecommended ? 1 : 0) !== (a.isRecommended ? 1 : 0)) {
        return (b.isRecommended ? 1 : 0) - (a.isRecommended ? 1 : 0);
      }
      return (b.views ?? 0) - (a.views ?? 0);
    });
  }

  const initialItemCount = 12;
  const visibleArticles = showAll
    ? filtered
    : filtered.slice(0, initialItemCount);

  return (
    <div className={styles.wrapper}>
      <div className={styles.titleRow}>
        <div className={styles.titleCol}>
          <div className={styles.bigTitle}>{TAB_INFO[tabIdx - 1].title}</div>
          <div className={styles.desc}>{TAB_INFO[tabIdx - 1].desc}</div>
        </div>
        <div className={styles.line} />
      </div>

      <div className={styles.field}>
        <Dropdown value={sort} onChange={setSort} />

        <div className={styles.cardGrid}>
          {visibleArticles.map((article: Article) => (
            <ArticleCard
              key={article.id}
              {...article}
              slug={article.slug}
              onDelete={handleDelete}
              imageUrl={article.imageUrl ?? ""}
              description={article.description ?? ""}
            />
          ))}
        </div>

        {!showAll && filtered.length > initialItemCount && (
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
