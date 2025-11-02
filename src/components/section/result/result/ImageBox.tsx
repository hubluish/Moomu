'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import styles from './ImageBox.module.css';
import TopRightArrows from '@/components/common/TopRightArrows';
import type { GeminiSet } from '@/types/result';
import ImageGridSkeleton from './ImageGridSkeleton';
import { fetchWithCache } from '../imageCache';

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
    const [theme, setTheme] = useState('light');
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia('(max-width: 480px)');
        const handleMediaChange = (e: MediaQueryListEvent) => {
            setIsMobile(e.matches);
        };
        mediaQuery.addEventListener('change', handleMediaChange);
        setIsMobile(mediaQuery.matches); // Initial check

        return () => {
            mediaQuery.removeEventListener('change', handleMediaChange);
        };
    }, []);

    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const handleChange = (e: MediaQueryListEvent) => {
            setTheme(e.matches ? 'dark' : 'light');
        };
        mediaQuery.addEventListener('change', handleChange);
        setTheme(mediaQuery.matches ? 'dark' : 'light');
        return () => {
            mediaQuery.removeEventListener('change', handleChange);
        };
    }, []);

    const query = useMemo(() => (geminiSet?.image || '').trim(), [geminiSet]);
    const colorHex = useMemo(() => (useColorFilter ? geminiSet?.colors?.[0] : ''), [geminiSet, useColorFilter]);

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
            let wasAborted = false;
            try {
                setLoading(true);
                setErr(null);

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
                    if (e.name === 'AbortError') {
                        wasAborted = true;
                        // In development, React StrictMode can cause a fetch to be aborted.
                        // This is expected behavior and should not be treated as a user-facing error.
                        console.warn('Fetch aborted (expected in dev StrictMode).');
                    } else {
                        setErr(e.message ?? '이미지 로딩 실패');
                    }
                }
            } finally {
                if (!wasAborted) {
                    setLoading(false);
                }
            }
        };

        fetchPage();
        return () => controller.abort();
    }, [query, colorHex, orientation, perPage]);

    const isEmpty = images.length === 0;

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>IMAGES</h2>
            <TopRightArrows onPrev={onPrev} onNext={onNext} disablePrev={disablePrev} disableNext={disableNext} />

            {loading ? (
                <ImageGridSkeleton />
            ) : (
                <div className={styles.imageGrid}>
                    {err ? (
                        <div className={styles.noImages}>{err}</div>
                    ) : isEmpty ? (
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
            )}

            <div className={styles.credit}>
                <span style={{ color: theme === 'dark' ? 'white' : 'black', bottom: 10 }}>Powered by</span>
                <a href="https://www.pexels.com" target="_blank" rel="noreferrer">
                    <Image src={theme === 'dark' ? '/data/images/icons/pexels-logo-white.png' : '/data/images/icons/pexels-logo-black.png'} alt="Pexels Logo" width={isMobile ? 25 : 30} height={isMobile ? 7 : 10} />
                </a>
            </div>
        </div>
    );
};

export default ImageBox;