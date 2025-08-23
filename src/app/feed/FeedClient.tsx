// FeedClient.tsx

"use client";
import React, { useState } from "react";
import Image from "next/image";
import SearchBar from "@/components/common/searchBar/SearchBar";
import styles from "./feed.module.css";

// --- 인터페이스와 목업 데이터 (변경 없음) ---
interface FeedItem {
  id: string;
  creator: string;
  imageUrl: string;
  title: string;
  likes: number;
  liked: boolean;
  categories: string[];
}
const mockFeedItems: FeedItem[] = [
    { id: "1", creator: "Moomu", imageUrl: "/assets/carousel/1.jpg", title: "첫 번째 피드", likes: 10, liked: false, categories: ["인테리어", "디자인", "소품"] },
    { id: "2", creator: "Gemini", imageUrl: "/assets/carousel/2.jpg", title: "두 번째 피드", likes: 25, liked: true, categories: ["패션", "의류"] },
    { id: "3", creator: "Google", imageUrl: "/assets/carousel/3.jpg", title: "세 번째 피드", likes: 5, liked: false, categories: ["디자인", "UI/UX"] },
    { id: "4", creator: "Moomu", imageUrl: "/assets/carousel/4.jpg", title: "네 번째 피드", likes: 12, liked: false, categories: ["인테리어", "가구"] },
    { id: "5", creator: "Gemini", imageUrl: "/assets/carousel/5.jpg", title: "다섯 번째 피드", likes: 30, liked: true, categories: ["패션", "신발"] },
    { id: "6", creator: "Google", imageUrl: "/assets/carousel/6.jpg", title: "여섯 번째 피드", likes: 8, liked: false, categories: ["디자인", "그래픽"] },
    { id: "7", creator: "Moomu", imageUrl: "/assets/carousel/7.jpg", title: "일곱 번째 피드", likes: 15, liked: false, categories: ["여행", "풍경"] },
    { id: "8", creator: "Gemini", imageUrl: "/assets/carousel/8.jpg", title: "여덟 번째 피드", likes: 28, liked: true, categories: ["음식", "레시피"] },
    { id: "9", creator: "Google", imageUrl: "/assets/carousel/1.jpg", title: "아홉 번째 피드", likes: 3, liked: false, categories: ["인테리어", "소품"] },
];


export default function FeedClient() {
  const [search, setSearch] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [feedItems, setFeedItems] = useState<FeedItem[]>(mockFeedItems);

  // --- 핸들러 함수들 (변경 없음) ---
  const handleSearch = () => setSearch(inputValue);
  const handleLike = (id: string) => {
    setFeedItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, liked: !item.liked, likes: item.liked ? item.likes - 1 : item.likes + 1 } : item
      )
    );
  };
  const handleSave = (id: string) => console.log(`Saved item ${id}`);

  const filteredItems = feedItems.filter(item =>
    item.title.toLowerCase().includes(search.toLowerCase()) ||
    item.creator.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={styles.feedContainer}>
      <div className={styles.container}>
        {/* --- 페이지 헤더, 검색창 (변경 없음) --- */}
        <header className={styles.feedHeader}>
          <h1 className={styles.feedTitle}>Moomu's feed page</h1>
          <p className={styles.feedSubtitle}>
            Select the color tones that resonate with your style.
          </p>
        </header>
        <div className={styles.searchContainer}>
            <SearchBar
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              onSearch={handleSearch}
              placeholder="관심있는 콘텐츠를 검색해보세요!"
            />
        </div>
        
        <div className={styles.feedGrid}>
          {filteredItems.map(item => (
            <div key={item.id} className={styles.feedItem}>
              <Image
                src={item.imageUrl}
                alt={item.title}
                width={500}
                height={300}
                className={styles.itemImage}
              />
              <div className={styles.categoryContainer}>
                {item.categories.map((category, index) => (
                  <div key={index} className={styles.categoryBar}>
                    {category}
                  </div>
                ))}
              </div>
              <div className={styles.hoverOverlay}>
                <div className={styles.overlayFooter}>
                  <span className={styles.overlayUsername}>by {item.creator}</span>
                  <div className={styles.overlayLikeButton}>
                    <button onClick={() => handleLike(item.id)} className={`${styles.likeButton} ${item.liked ? styles.liked : ''}`}>
                      <Image src={item.liked ? "/assets/icons/fill-star-active.svg" : "/assets/icons/star.svg"} alt="좋아요" width={40} height={40} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}