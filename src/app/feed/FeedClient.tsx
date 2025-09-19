"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
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
  colors?: string[];
}

export default function FeedClient() {
  const searchParams = useSearchParams();
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

  // Open modal automatically when `open` query is present
  useEffect(() => {
    const openId = searchParams?.get("open");
    if (openId) {
      setSelectedMoodboardId(openId);
      setOpenModal(true);
    }
  }, [searchParams]);

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

        // Try selecting with tags/palette_json; if it fails, fall back to legacy columns.
        let data: any[] | null = null;
        let count: number | null = null;
        {
          const { data: d1, count: c1, error: e1 } = await supabase
            .from("feed_posts")
            .select(
              "id, moodboard_id, user_id, title, image_url, tags, palette_json, likes, is_public, created_at, authorName",
              { count: "exact" }
            )
            .order("created_at", { ascending: false })
            .range(from, to);
          if (!e1) {
            data = d1 ?? [];
            count = typeof c1 === 'number' ? c1 : null;
          } else {
            const { data: d2, count: c2, error: e2 } = await supabase
              .from("feed_posts")
              .select(
                "id, moodboard_id, user_id, title, image_url, categories, likes, is_public, created_at, authorName",
                { count: "exact" }
              )
              .order("created_at", { ascending: false })
              .range(from, to);
            if (e2) throw e2;
            data = d2 ?? [];
            count = typeof c2 === 'number' ? c2 : null;
          }
        }

        let mapped: FeedItem[] = (data ?? []).map((row: any) => {
          const userId = row?.user_id ? String(row.user_id) : "";
          const creator = (row?.authorName && String(row.authorName).trim().length > 0)
            ? String(row.authorName)
            : (userId ? `user_${userId.slice(0, 6)}` : "Unknown");

          // Extract strings from palette_json and derive coarse Korean/English color names
          const hexToBucket = (hx: string): string | null => {
            const m = String(hx).trim().toLowerCase().match(/^#?([0-9a-f]{6})$/);
            if (!m) return null;
            const v = m[1];
            const r = parseInt(v.slice(0, 2), 16) / 255;
            const g = parseInt(v.slice(2, 4), 16) / 255;
            const b = parseInt(v.slice(4, 6), 16) / 255;
            const max = Math.max(r, g, b), min = Math.min(r, g, b);
            const l = (max + min) / 2;
            const d = max - min;
            let h = 0;
            if (d !== 0) {
              switch (max) {
                case r: h = ((g - b) / d + (g < b ? 6 : 0)); break;
                case g: h = (b - r) / d + 2; break;
                case b: h = (r - g) / d + 4; break;
              }
              h = h * 60;
            }
            const s = max === 0 ? 0 : d / max;
            if (s < 0.08) {
              if (l > 0.9) return 'white';
              if (l < 0.15) return 'black';
              return 'gray';
            }
            if (h < 15 || h >= 345) return 'red';
            if (h < 45) return 'orange';
            if (h < 65) return 'yellow';
            if (h < 170) return 'green';
            if (h < 200) return 'teal';
            if (h < 255) return 'blue';
            if (h < 290) return 'purple';
            if (h < 330) return 'pink';
            return 'red';
          };

          let extractedColors: string[] = [];
          const pj = (row as any)?.palette_json;
          if (Array.isArray(pj)) {
            for (const entry of pj) {
              if (typeof entry === 'string') {
                extractedColors.push(entry);
              } else if (entry && typeof entry === 'object') {
                // Common structure: { hex: "#xxxxxx", name: "..." }
                for (const [k, v] of Object.entries(entry)) {
                  if (typeof v === 'string') extractedColors.push(v);
                  else if (v && typeof v === 'object') {
                    for (const vv of Object.values(v as any)) {
                      if (typeof vv === 'string') extractedColors.push(vv);
                    }
                  }
                }
              }
            }
          }
          const bucketKo: Record<string, string[]> = {
            red: ["빨강", "빨간", "빨간색"],
            orange: ["주황", "주황색"],
            yellow: ["노랑", "노란", "노란색"],
            green: ["초록", "초록색", "녹색"],
            teal: ["청록", "청록색"],
            blue: ["파랑", "파란", "파란색", "블루"],
            purple: ["보라", "보라색", "퍼플"],
            pink: ["분홍", "분홍색", "핑크"],
            gray: ["회색", "그레이"],
            black: ["검정", "검은", "검은색", "블랙"],
            white: ["흰색", "하양", "하얀", "하얀색", "화이트"],
          };
          const extraBuckets: string[] = [];
          for (const s of extractedColors) {
            const bucket = hexToBucket(String(s));
            if (bucket) {
              extraBuckets.push(bucket);
              const ko = bucketKo[bucket];
              if (ko) extraBuckets.push(...ko);
            }
          }
          extractedColors = Array.from(new Set(
            [...extractedColors, ...extraBuckets].map((s) => String(s).trim().toLowerCase())
          )).filter(Boolean);

          return {
            id: String(row.id),
            moodboardId: row?.moodboard_id ? String(row.moodboard_id) : undefined,
            creator,
            imageUrl: String(row?.image_url ?? ""),
            title: String(row?.title ?? ""),
            likes: typeof row?.likes === "number" ? row.likes : 0,
            liked: false,
            categories: Array.isArray(row?.tags)
              ? (row.tags as string[])
              : (Array.isArray(row?.categories) ? (row.categories as string[]) : []),
            userId,
            isPublic: Boolean(row?.is_public),
            colors: extractedColors.length ? extractedColors : undefined,
          };
        });

        // 현재 사용자 좋아요 상태 반영 (liked_feeds.user_id + post_id)
        if (user?.id && mapped.length > 0) {
          // liked_feeds.post_id는 feed_posts.id를 참조
          const postIds = mapped.map(m => m.id);
          if (postIds.length > 0) {
            try {
              const { data: likedRows } = await supabase
                .from('liked_feeds')
                .select('post_id')
                .eq('user_id', user.id)
                .in('post_id', postIds);
              if (Array.isArray(likedRows)) {
                const likedSet = new Set(likedRows.map((r: any) => String(r.post_id)));
                mapped = mapped.map(m => ({ ...m, liked: likedSet.has(m.id) }));
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

  // Live search: debounce input to update results as user types
  useEffect(() => {
    const id = setTimeout(() => {
      setSearch(inputValue);
    }, 250);
    return () => clearTimeout(id);
  }, [inputValue]);

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
    // liked_feeds.post_id는 feed_posts.id를 참조
    const willLike = !target.liked;
    try {
      if (willLike) {
        // 중복 좋아요 시에도 에러 없이 유지하도록 upsert 사용
        const { error } = await supabase
          .from('liked_feeds')
          .upsert(
            { user_id: currentUserId, post_id: target.id },
            { onConflict: 'post_id,user_id', ignoreDuplicates: true }
          );
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('liked_feeds')
          .delete()
          .eq('user_id', currentUserId)
          .eq('post_id', target.id);
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

  // Fuzzy search helpers
  const normalize = (s: string) => s.normalize('NFC').toLowerCase().trim();
  const splitTokens = (s: string): string[] => normalize(s).split(/[^0-9a-zA-Z가-힣#]+/).filter(Boolean);
  const withinLevenshtein = (a: string, b: string, maxDist: number): boolean => {
    a = normalize(a); b = normalize(b);
    const aLen = a.length, bLen = b.length;
    if (Math.abs(aLen - bLen) > maxDist) return false;
    if (aLen > bLen) { const tmp = a; a = b; b = tmp; }
    const v0 = new Array(b.length + 1);
    const v1 = new Array(b.length + 1);
    for (let i = 0; i <= b.length; i++) v0[i] = i;
    for (let i = 0; i < a.length; i++) {
      v1[0] = i + 1;
      let rowMin = v1[0];
      for (let j = 0; j < b.length; j++) {
        const cost = a[i] === b[j] ? 0 : 1;
        v1[j + 1] = Math.min(
          v1[j] + 1,
          v0[j + 1] + 1,
          v0[j] + cost
        );
        if (v1[j + 1] < rowMin) rowMin = v1[j + 1];
      }
      if (rowMin > maxDist) return false;
      for (let j = 0; j <= b.length; j++) v0[j] = v1[j];
    }
    return v0[b.length] <= maxDist;
  };
  const thresholdFor = (q: string): number => q.length <= 3 ? 1 : q.length <= 6 ? 2 : 3;
  const fuzzyMatch = (query: string, text: string): boolean => {
    const q = normalize(query);
    if (!q) return true;
    const t = normalize(text);
    if (t.includes(q)) return true;
    const tokens = splitTokens(text);
    const th = thresholdFor(q);
    for (const tok of tokens) {
      if (tok.includes(q)) return true;
      if (withinLevenshtein(q, tok, th)) return true;
    }
    const m = q.length;
    if (t.length >= m) {
      for (let i = 0; i <= t.length - m && i < 200; i++) {
        const sub = t.slice(i, Math.min(t.length, i + m + 1));
        if (withinLevenshtein(q, sub, th)) return true;
      }
    }
    return false;
  };

  const filteredItems = useMemo(() => {
    const q = search.trim();
    if (!q) return feedItems;
    return feedItems.filter((item) => {
      if (item.title && fuzzyMatch(q, item.title)) return true;
      if (Array.isArray(item.categories) && item.categories.some((c) => fuzzyMatch(q, String(c)))) return true;
      if (Array.isArray(item.colors) && item.colors.some((c) => fuzzyMatch(q, String(c)))) return true;
      if (item.creator && fuzzyMatch(q, item.creator)) return true;
      return false;
    });
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
