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
    onImagesChange?: (images: { url: string; thumb?: string; source?: string }[]) => void;
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
    onImagesChange,
    }) => {
    const [images, setImages] = useState<PinterestImage[]>([]);
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState<string | null>(null);

    const query = useMemo(() => (geminiSet?.image || '').trim(), [geminiSet]);
    const colorHex = useMemo(() => (useColorFilter ? geminiSet?.colors?.[0] : ''), [geminiSet, useColorFilter]);

    // 키워드 변경 시 이미지 초기화
    useEffect(() => {
        setImages([]);
    }, [query, colorHex, orientation, perPage]);

    // 이미지 변경 시 부모에게 알림
    useEffect(() => {
        if (!images || images.length === 0) {
            onImagesChange?.([]);
            return;
        };
        const mapped = images.map((img) => ({
            url: img.pin_url,
            thumb: img.thumbnail_url,
            source: 'pexels',
        }));
        onImagesChange?.(mapped);
    }, [images, onImagesChange]);

    useEffect(() => {
        const controller = new AbortController();
        const fetchPage = async () => {
            try {
                setLoading(true);
                setErr(null);
                console.info('[ImageBox] fetch', { query, colorHex, perPage, orientation });

                if (!query) throw new Error('이미지 키워드가 비어 있습니다.');

                let entry = await fetchWithCache({
                    q: query,
                    per_page: perPage,
                    page: 1, // Always fetch page 1
                    orientation,
                    color: colorHex || undefined,
                }, controller.signal);

                // fallback: if color filter yields no results, retry without color
                if ((entry.photos?.length ?? 0) === 0 && colorHex) {
                    console.info('[ImageBox] fallback without color');
                    entry = await fetchWithCache({
                        q: query,
                        per_page: perPage,
                        page: 1, // Always fetch page 1
                        orientation,
                    }, controller.signal);
                }

                setImages(entry.photos);
            } catch (e: unknown) {
                if (e instanceof Error) {
                    setErr(e.message ?? '이미지 로딩 실패');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchPage();
        return () => controller.abort();
    }, [query, colorHex, orientation, perPage]);

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>IMAGES</h2>
            <TopRightArrows onPrev={onPrev} onNext={onNext} disablePrev={disablePrev} disableNext={disableNext} />

            <div className={styles.imageGrid}>
                {loading && images.length === 0 ? (
                    <div className={styles.loading}>이미지 로딩 중...</div>
                ) : err && images.length === 0 ? (
                    <div className={styles.noImages}>{err}</div>
                ) : images.length === 0 ? (
                    <div className={styles.noImages}>이미지를 찾을 수 없습니다.</div>
                ) : (
                    images.map((image, idx) => (
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
                    ))
                )}
            </div>

            <div className={styles.credit}>
                <a href="https://www.pexels.com" target="_blank" rel="noreferrer">
                    Photos provided by Pexels
                </a>
            </div>
        </div>
    );
};

export default ImageBox;