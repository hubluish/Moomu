'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import styles from './ImageBox.module.css';
import TopRightArrows from '@/components/common/TopRightArrows';
import type { GeminiSet } from '@/types/result';
import { fetchWithCache } from './imageCache';

interface PinterestImage {
    thumbnail_url: string;
    pin_url: string;
    alt?: string;
    photographer?: string;
    photographer_url?: string;
}

type Props = {
    geminiSet: GeminiSet;     // { colors, image, font, sentences }
    perPage?: number;         // 기본 9
    orientation?: 'landscape' | 'portrait' | 'square';
    useColorFilter?: boolean; // true면 colors[0]을 color 필터로 사용
    onPrev?: () => void;
    onNext?: () => void;
    disablePrev?: boolean;
    disableNext?: boolean;
};

const ImageBox: React.FC<Props> = ({
    geminiSet,
    perPage = 9,
    orientation = 'landscape',
    useColorFilter = false,
    onPrev,
    onNext,
    disablePrev,
    disableNext,
    }) => {
    const [images, setImages] = useState<PinterestImage[]>([]);
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState<string | null>(null);
    const [page, setPage] = useState(1);            // 더보기용
    const [hasNext, setHasNext] = useState(false);  // next_page 유무

    const query = useMemo(() => (geminiSet?.image || '').trim(), [geminiSet]);
    const colorHex = useMemo(() => (useColorFilter ? geminiSet?.colors?.[0] : ''), [geminiSet, useColorFilter]);

    // 첫 로드/키워드 변경 시 1페이지 초기화
    useEffect(() => {
        setPage(1);
        setImages([]);
    }, [query, colorHex, orientation, perPage]);

    useEffect(() => {
        const controller = new AbortController();
        const fetchPage = async () => {
        // cache-first path using shared in-memory cache
        try {
            setLoading(true);
            setErr(null);
            console.info('[ImageBox] fetch', { query, colorHex, perPage, page, orientation });

            if (!query) throw new Error('이미지 키워드가 비어 있습니다.');

            let entry = await fetchWithCache({
            q: query,
            per_page: perPage,
            page,
            orientation,
            color: colorHex || undefined,
            }, controller.signal);
            // fallback: if color filter yields no results on first page, retry without color
            if (page === 1 && (entry.photos?.length ?? 0) === 0 && colorHex) {
            console.info('[ImageBox] fallback without color');
            entry = await fetchWithCache({
                q: query,
                per_page: perPage,
                page,
                orientation,
            }, controller.signal);
            }

            setImages(prev => (page === 1 ? entry.photos : [...prev, ...entry.photos]));
            setHasNext(entry.hasNext);
            return;
        } catch (e: any) {
            if (e.name !== 'AbortError') setErr(e.message ?? '이미지 로딩 실패');
            else return;
        } finally {
            setLoading(false);
        }

        try {
            setLoading(true);
            setErr(null);

            if (!query) throw new Error('이미지 키워드가 비어 있습니다.');

            // window cache: avoid refetch when revisiting same query
            const key = [
              query,
              colorHex || '',
              orientation || '',
              String(perPage),
              String(page),
            ].join('|');
            const w: any = typeof window !== 'undefined' ? window : undefined;
            if (w) {
              w.__imageCache = w.__imageCache || new Map();
              const cached = w.__imageCache.get(key);
              if (cached) {
                setImages((prev: any) => (page === 1 ? cached.photos : [...prev, ...cached.photos]));
                setHasNext(!!cached.hasNext);
                setLoading(false);
                return;
              }
            }

            const params = new URLSearchParams({
            q: query,
            per_page: String(perPage),
            page: String(page),
            orientation,
            });
            if (colorHex) params.set('color', colorHex);

            const res = await fetch(`/api/pexels?${params.toString()}`, {
            signal: controller.signal,
            });
            if (!res.ok) throw new Error(`이미지 로딩 실패(${res.status})`);

            const json = await res.json();
            setImages(prev => [...prev, ...(json.photos ?? [])]);
            setHasNext(Boolean(json.next_page));
            if (typeof window !== 'undefined') {
            const w: any = window;
            const entry = { photos: (json.photos ?? []), hasNext: Boolean(json.next_page) };
            // reuse same key computed above
            const key = [
                query,
                colorHex || '',
                orientation || '',
                String(perPage),
                String(page),
            ].join('|');
            w.__imageCache = w.__imageCache || new Map();
            w.__imageCache.set(key, entry);
            }
        } catch (e: any) {
            if (e.name !== 'AbortError') setErr(e.message ?? '이미지 로딩 실패');
        } finally {
            setLoading(false);
        }
        };

        fetchPage();
        return () => controller.abort();
    }, [query, colorHex, orientation, perPage, page]);

    if (loading && images.length === 0) return <div className={styles.loading}>이미지 로딩 중...</div>;
    if (err && images.length === 0) return <div className={styles.noImages}>{err}</div>;
    if (images.length === 0) return <div className={styles.noImages}>이미지를 찾을 수 없습니다.</div>;

    return (
        <div className={styles.container}>
        <h2 className={styles.title}>IMAGES</h2>
        <TopRightArrows onPrev={onPrev} onNext={onNext} disablePrev={disablePrev} disableNext={disableNext} />

        <div className={styles.imageGrid}>
            {images.map((image, idx) => (
            <a
                key={`${image.pin_url}-${idx}`}
                href={image.pin_url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.imageWrapper}
                title={image.alt || query}
            >
                <Image
                src={image.thumbnail_url}
                alt={image.alt || query}
                className={styles.image}
                width={130}
                height={130}
                loading="lazy"
                />
            </a>
            ))}
        </div>

        {hasNext && (
            <button className={styles.loadMore} onClick={() => setPage(p => p + 1)}>
            더 보기
            </button>
        )}

        <div className={styles.credit}>
            <a href="https://www.pexels.com" target="_blank" rel="noreferrer">
            Photos provided by Pexels
            </a>
        </div>
        </div>
    );
};

export default ImageBox;
