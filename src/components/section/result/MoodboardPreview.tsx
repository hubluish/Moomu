'use client';

import React, { useEffect, useRef, useState } from 'react';
import styles from './MoodboardPreview.module.css';
import { supabase } from '@/utils/supabase';
import Image from 'next/image';

type Props = {
    coverUrl?: string | null;
    loading?: boolean;
};

const MoodboardPreview: React.FC<Props> = ({ coverUrl, loading }) => {
  const [categories, setCategories] = useState<string[]>([]);
  const [catLoading, setCatLoading] = useState<boolean>(true);

  // 카테고리 로드
    useEffect(() => {
        (async () => {
        try {
            if (typeof window === 'undefined') return;
            const sp = new URLSearchParams(window.location.search);
            const mid = sp.get('mid');
            if (!mid) { setCatLoading(false); return; }

            const { data, error } = await supabase
            .from('moodboard')
            .select('tags')
            .eq('id', mid)
            .single();

            if (error) {
            console.warn('Failed to load categories:', error);
            } else {
            const tags = Array.isArray(data?.tags) ? (data!.tags as string[]) : [];
            setCategories(tags);
            }
        } catch (e) {
            console.warn('Error fetching categories:', e);
        } finally {
            setCatLoading(false);
        }
        })();
    }, []);

    // 드래그 스크롤(뷰포트 기준)
    const viewportRef = useRef<HTMLDivElement>(null);
    const isDown = useRef(false);
    const startX = useRef(0);
    const startLeft = useRef(0);

    const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
        if (!viewportRef.current) return;
        isDown.current = true;
        startX.current = e.clientX;
        startLeft.current = viewportRef.current.scrollLeft;
        viewportRef.current.setPointerCapture(e.pointerId);
        viewportRef.current.classList.add(styles.grabbing);
    };
    const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
        if (!isDown.current || !viewportRef.current) return;
        e.preventDefault();
        const dx = e.clientX - startX.current;
        viewportRef.current.scrollLeft = startLeft.current - dx;
    };
    const endDrag = (e: React.PointerEvent<HTMLDivElement>) => {
        if (!isDown.current || !viewportRef.current) return;
        isDown.current = false;
        try { viewportRef.current.releasePointerCapture(e.pointerId); } catch {}
        viewportRef.current.classList.remove(styles.grabbing);
    };

    return (
        <div className={styles.container}>
        {/* 카테고리 영역(전체 컨테이너 안에 포함) */}
        {!catLoading && categories.length > 0 && (
            <div
            ref={viewportRef}
            className={styles.catViewport}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={endDrag}
            onPointerLeave={endDrag}
            role="list"
            aria-label="카테고리"
            title="드래그하여 좌우로 이동"
            >
            <div className={styles.catTrack}>
                {categories.map((c, idx) => (
                <span key={`${c}-${idx}`} className={styles.badge} role="listitem">
                    <span className={styles.badgeText}>{c}</span>
                </span>
                ))}
            </div>
            </div>
        )}

        {/* 커버 미리보기 */}
        <div className={styles.content}>
            {loading ? (
            <p className={styles.placeholder}>미리보기 로딩 중...</p>
            ) : coverUrl ? (
            <Image
                src={coverUrl}
                alt="Moodboard cover"
                className={styles.coverImage}
                width={427}
                height={176}
            />
            ) : (
            <p className={styles.placeholder}>커버 이미지가 아직 없어요</p>
            )}
        </div>
        </div>
    );
};

export default MoodboardPreview;