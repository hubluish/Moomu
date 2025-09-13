'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import styles from './ImageBox.module.css';
import TopRightArrows from '@/components/common/TopRightArrows';
import type { GeminiSet } from '@/types/result';

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
};

const ImageBox: React.FC<Props> = ({
    geminiSet,
    perPage = 9,
    orientation = 'landscape',
    useColorFilter = false,
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
        try {
            setLoading(true);
            setErr(null);

            if (!query) throw new Error('이미지 키워드가 비어 있습니다.');

            const params = new URLSearchParams({
            q: query,
            per_page: String(perPage),
            page: String(page),
            orientation,
            });
            if (colorHex) params.set('color', colorHex);

            const res = await fetch(`/api/pexels?${params.toString()}`, {
            signal: controller.signal,
            cache: 'no-store',
            });
            if (!res.ok) throw new Error(`이미지 로딩 실패(${res.status})`);

            const json = await res.json();
            setImages(prev => [...prev, ...(json.photos ?? [])]);
            setHasNext(Boolean(json.next_page));
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
        <TopRightArrows disablePrev disableNext />

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
