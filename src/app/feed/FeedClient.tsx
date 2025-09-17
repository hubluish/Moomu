"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import SearchBar from "@/components/common/searchBar/SearchBar";
import Toast from "@/components/common/toast/Toast";
import styles from "./feed.module.css";
import { supabase } from "@/utils/supabaseClient";

interface FeedItem {
  id: string;
  creator: string;
  imageUrl: string;
  title: string;
  likes: number;
  liked: boolean;
  categories: string[];
  userId: string;
  isPublic: boolean;
}

export default function FeedClient() {
  const [search, setSearch] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [feedItems, setFeedItems] = useState<FeedItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const {
          data: { user },
        } = await supabase.auth.getUser();
        setCurrentUserId(user?.id || null);

        const { data, error } = await supabase
          .from("feed_posts")
          .select(
            "id, user_id, title, image_url, categories, likes, is_public, created_at"
          )
          .order("created_at", { ascending: false })
          .limit(60);

        if (error) throw error;

        const mapped: FeedItem[] = (data ?? []).map((row: any) => {
          const userId = row?.user_id ? String(row.user_id) : "";
          const creator = userId ? `user_${userId.slice(0, 6)}` : "Unknown";

          return {
            id: String(row.id),
            creator,
            imageUrl: String(row?.image_url ?? ""),
            title: String(row?.title ?? ""),
            likes: typeof row?.likes === "number" ? row.likes : 0,
            liked: false,
            categories: Array.isArray(row?.categories)
              ? (row.categories as string[])
              : [],
            userId,
            isPublic: Boolean(row?.is_public),
          };
        });

        setFeedItems(mapped);
      } catch (e) {
        console.error("[Feed] failed to load posts:", e);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSearch = () => setSearch(inputValue);

  const handleLike = (id: string) => {
    const itemToLike = feedItems.find((item) => item.id === id);
    if (!itemToLike) return;

    const isNowLiked = !itemToLike.liked;

    setFeedItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              liked: isNowLiked,
              likes: isNowLiked ? item.likes + 1 : item.likes - 1,
            }
          : item
      )
    );

    if (isNowLiked) {
      setToastMessage("찜한 피드가 추가되었어요.");
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }
    // TODO: 좋아요 저장 로직 연동 (feed_likes 등)
  };

  const filteredItems = useMemo(() => {
    const q = search.toLowerCase();
    return feedItems.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.creator.toLowerCase().includes(q)
    );
  }, [feedItems, search]);

  return (
    <div className={styles.feedContainer}>
      <Toast message={toastMessage} show={showToast} />
      <div className={styles.container}>
        <header className={styles.feedHeader}>
          <h1 className={styles.feedTitle}>Moomu&apos;s feed page</h1>
          <p className={styles.feedSubtitle}>
            Select the color tones that resonate with your style.
          </p>
        </header>

        <div className={styles.searchContainer}>
          <SearchBar
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onSearch={handleSearch}
            placeholder="Search moods or categories (e.g. vintage, dreamy, cute...)"
          />
        </div>

        {loading ? (
          <div className={styles.loading}>Loading...</div>
        ) : (
          <div className={styles.feedGrid}>
            {filteredItems.map((item) => {
              const isOwner = item.userId === currentUserId;
              return (
                <div key={item.id} className={styles.feedItem}>
                  <div className={styles.imageWrap}>
                    <Image
                      src={item.imageUrl}
                      alt={item.title}
                      width={500}
                      height={300}
                      unoptimized
                      className={styles.itemImage}
                    />
                  </div>

                  <div className={styles.categoryContainer}>
                    {Array.isArray(item.categories) &&
                      item.categories.map((category, index) => (
                        <div key={index} className={styles.categoryBar}>
                          {category}
                        </div>
                      ))}
                  </div>

                  <div className={styles.hoverOverlay}>
                    <div className={styles.overlayFooter}>
                      <span className={styles.overlayUsername}>{item.creator}</span>
                      <div className={styles.overlayLikeButton}>
                        <button
                          onClick={() => handleLike(item.id)}
                          className={`${styles.likeButton} ${
                            item.liked ? styles.liked : ""
                          }`}
                        >
                          <Image
                            src={
                              item.liked
                                ? "/assets/icons/full_heart.svg"
                                : "/assets/icons/empty_heart.svg"
                            }
                            alt="Like"
                            width={45}
                            height={41}
                          />
                        </button>
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

