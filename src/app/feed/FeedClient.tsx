// FeedClient.tsx

"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import SearchBar from "@/components/common/searchBar/SearchBar";
import styles from "./feed.module.css";
import { supabase } from "@/utils/supabaseClient"; // Supabase 클라이언트 import
import Toast from "@/components/common/toast/Toast";

// --- 인터페이스 (userId 추가) ---
interface FeedItem {
  id: string;
  creator: string;
  imageUrl: string;
  title: string;
  likes: number;
  liked: boolean;
  categories: string[];
  userId: string; 
}

export default function FeedClient() {
  const [search, setSearch] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [feedItems, setFeedItems] = useState<FeedItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null); // 현재 사용자 ID 상태
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);

  // --- 데이터 로딩 및 사용자 정보 확인 useEffect ---
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // 1. 현재 사용자 정보 가져오기
        const { data: { user } } = await supabase.auth.getUser();
        setCurrentUserId(user?.id || null);

        // 2. 피드 아이템 가져오기
        const response = await fetch('/api/articles');
        if (!response.ok) {
          throw new Error('Failed to fetch feed items');
        }
        const items = await response.json();
        
        const itemsWithLikeState = items.map((item: any) => ({
          ...item,
          liked: false, 
        }));
        setFeedItems(itemsWithLikeState);

      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // --- 핸들러 함수들 ---
  const handleSearch = () => setSearch(inputValue);

  const handleLike = (id: string) => {
    const itemToLike = feedItems.find(item => item.id === id);
    if (!itemToLike) return;

    const isNowLiked = !itemToLike.liked;

    setFeedItems(prevItems =>
      prevItems.map(item =>
        item.id === id
          ? { ...item, liked: isNowLiked, likes: isNowLiked ? item.likes + 1 : item.likes - 1 }
          : item
      )
    );

    if (isNowLiked) {
      setToastMessage("찜한 피드에 저장되었어요!");
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000); // 3초 후에 토스트 숨기기
    }
    // TODO: 여기에 실제 '좋아요' API 호출 로직 추가
  };

  const handleLock = (id: string) => {
    console.log(`Lock button clicked for item ${id}. Implement lock logic here.`);
    // TODO: 여기에 실제 '잠금' API 호출 및 상태 업데이트 로직 추가
  };

  const filteredItems = feedItems.filter(item =>
    item.title.toLowerCase().includes(search.toLowerCase()) ||
    item.creator.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={styles.feedContainer}>
      <Toast message={toastMessage} show={showToast} />
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
              placeholder="Search moods or categories (e.g. vintage, dreamy, cute...)"
            />
        </div>
        
        {loading ? (
          <div className={styles.loading}>Loading...</div>
        ) : (
          <div className={styles.feedGrid}>
            {filteredItems.map(item => {
              const isOwner = item.userId === currentUserId;
              return (
                <div key={item.id} className={styles.feedItem}>
                  <Image
                    src={item.imageUrl}
                    alt={item.title}
                    width={500}
                    height={300}
                    className={styles.itemImage}
                  />
                  <div className={styles.categoryContainer}>
                    {/* item.categories가 배열인 경우에만 map 함수를 실행하도록 수정 */}
                    {Array.isArray(item.categories) && item.categories.map((category, index) => (
                      <div key={index} className={styles.categoryBar}>
                        {category}
                      </div>
                    ))}
                  </div>
                  <div className={styles.hoverOverlay}>
                    <div className={styles.overlayFooter}>
                      <span className={styles.overlayUsername}>{item.creator}</span>
                      <div className={styles.overlayLikeButton}>
                        {isOwner ? (
                          // 내가 작성한 피드일 경우: 자물쇠 아이콘
                          <button onClick={() => handleLock(item.id)} className={styles.likeButton}>
                            <Image src="/assets/icons/lock.svg" alt="내 게시물" width={40} height={40} />
                          </button>
                        ) : (
                          // 다른 사람 피드일 경우: 하트 아이콘
                          <button onClick={() => handleLike(item.id)} className={`${styles.likeButton} ${item.liked ? styles.liked : ''}`}>
                            <Image src={item.liked ? "/assets/icons/full_heart.svg" : "/assets/icons/empty_heart.svg"} alt="좋아요" width={45} height={41} />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}