"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import SearchBar from "@/components/common/searchBar/SearchBar";
import Toast from "@/components/common/toast/Toast";
import styles from "./feed.module.css";
import { supabase } from "@/utils/supabaseClient";
import Pagenation from "@/components/common/pagenation";
import MoodboardModal from "./MoodboardModal";

interface FeedItem {
  id: string;
  moodboardId?: string;
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
  const [page, setPage] = useState(0);
  const pageSize = 10;
  const [totalCount, setTotalCount] = useState<number>(0);
  const [openModal, setOpenModal] = useState(false);
  const [selectedMoodboardId, setSelectedMoodboardId] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const {
          data: { user },
        } = await supabase.auth.getUser();
        setCurrentUserId(user?.id || null);

        const from = page * pageSize;
        const to = from + pageSize - 1;

        const { data, count, error } = await supabase
          .from("feed_posts")
          .select(
            "id, moodboard_id, user_id, title, image_url, categories, likes, is_public, created_at",
            { count: "exact" }
          )
          .order("created_at", { ascending: false })
          .range(from, to);

        if (error) throw error;

        let mapped: FeedItem[] = (data ?? []).map((row: any) => {
          const userId = row?.user_id ? String(row.user_id) : "";
          const creator = userId ? `user_${userId.slice(0, 6)}` : "Unknown";

          return {
            id: String(row.id),
            moodboardId: row?.moodboard_id ? String(row.moodboard_id) : undefined,
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

        // 현재 사용자 좋아요 상태 반영 (liked_feeds.user_id + post_id)
        if (user?.id && mapped.length > 0) {
          const postIds = mapped.map(m => m.moodboardId).filter(Boolean) as string[];
          if (postIds.length > 0) {
            try {
              const { data: likedRows } = await supabase
                .from('liked_feeds')
                .select('post_id')
                .eq('user_id', user.id)
                .in('post_id', postIds);
              if (Array.isArray(likedRows)) {
                const likedSet = new Set(likedRows.map((r: any) => String(r.post_id)));
                mapped = mapped.map(m => ({ ...m, liked: m.moodboardId ? likedSet.has(m.moodboardId) : false }));
              }
            } catch {}
          }
        }

        setFeedItems(mapped);
        setTotalCount(typeof count === "number" ? count : mapped.length);
      } catch (e) {
        console.error("[Feed] failed to load posts:", e);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page]);

  const handleSearch = () => setSearch(inputValue);

  const handleOpenModal = (moodboardId?: string, fallbackId?: string) => {
    const idToUse = moodboardId || fallbackId || null;
    setSelectedMoodboardId(idToUse);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedMoodboardId(null);
  };

  // 좋아요 클릭 처리: liked_feeds(user_id, post_id) 기록 후 UI 토글
  const handleLikeClick = async (id: string) => {
    const target = feedItems.find((i) => i.id === id);
    if (!target) return;
    if (!currentUserId) {
      alert('로그인이 필요합니다.');
      return;
    }
    if (!target.moodboardId) {
      console.warn('[Feed] moodboardId missing for item', id);
      return;
    }
    const willLike = !target.liked;
    try {
      if (willLike) {
        // 중복 좋아요 시에도 에러 없이 유지하도록 upsert 사용
        const { error } = await supabase
          .from('liked_feeds')
          .upsert(
            { user_id: currentUserId, post_id: target.moodboardId },
            { onConflict: 'user_id,post_id', ignoreDuplicates: true }
          );
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('liked_feeds')
          .delete()
          .eq('user_id', currentUserId)
          .eq('post_id', target.moodboardId);
        if (error) throw error;
      }
      await handleLike(id);
    } catch (e) {
      console.error('[Feed] like click failed:', e);
      alert('좋아요 처리에 실패했습니다.');
    }
  };

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
              likes: isNowLiked ? item.likes + 1 : Math.max(0, item.likes - 1),
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

  const totalPages = useMemo(() => {
    if (typeof totalCount === "number" && totalCount > 0) {
      return Math.max(1, Math.ceil(totalCount / pageSize));
    }
    // Fallback: if count is unavailable, infer minimally from current page
    return page + (feedItems.length === pageSize ? 2 : 1);
  }, [totalCount, page, feedItems.length]);

  const showPager = useMemo(() => {
    return totalCount > pageSize || page > 0 || feedItems.length === pageSize;
  }, [totalCount, page, feedItems.length]);

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
                <div
                  key={item.id}
                  className={styles.feedItem}
                  onClick={() => handleOpenModal(item.moodboardId, item.id)}
                  role="button"
                  aria-label="무드보드 미리보기 열기"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') handleOpenModal(item.moodboardId, item.id);
                  }}
                  style={{ cursor: item.moodboardId ? 'pointer' : 'default' }}
                >
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
                          onClick={(e) => { e.stopPropagation(); handleLikeClick(item.id); }}
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
        <MoodboardModal
          open={openModal}
          moodboardId={selectedMoodboardId}
          onClose={handleCloseModal}
        />
        {showPager && (
          <div style={{ marginTop: 32, display: "flex", gap: 16, alignItems: "center", justifyContent: "center" }}>
            <button
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              disabled={page === 0}
              style={{
                padding: "8px 12px",
                borderRadius: 8,
                border: "1px solid #ddd",
                background: page === 0 ? "#f5f5f5" : "white",
                color: page === 0 ? "#aaa" : "#333",
                cursor: page === 0 ? "not-allowed" : "pointer",
              }}
              aria-label="이전 페이지"
            >
              이전
            </button>

            <Pagenation
              pageCount={totalPages}
              current={page}
              onChange={(idx) => setPage(idx)}
            />

            <button
              onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
              disabled={page >= totalPages - 1 || (typeof totalCount !== 'number' && feedItems.length < pageSize)}
              style={{
                padding: "8px 12px",
                borderRadius: 8,
                border: "1px solid #ddd",
                background: page >= totalPages - 1 ? "#f5f5f5" : "white",
                color: page >= totalPages - 1 ? "#aaa" : "#333",
                cursor: page >= totalPages - 1 ? "not-allowed" : "pointer",
              }}
              aria-label="다음 페이지"
            >
              다음
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
