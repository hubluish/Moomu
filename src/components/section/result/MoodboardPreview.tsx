'use client';

import React, { useRef } from 'react';
import styles from './MoodboardPreview.module.css';
import Image from 'next/image';

type Props = {
    coverUrl?: string | null;
    categories?: string[];
};

const MoodboardPreview: React.FC<Props> = ({ coverUrl, categories = [] }) => {
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
        {categories.length > 0 && (
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

        <div className={styles.content}>
            {coverUrl ? (
            <Image
                src={coverUrl}
                alt="Moodboard cover"
                className={styles.coverImage}
                width={427}
                height={176}
            />
            ) : (
            <div className={styles.skeleton}></div>
            )}
        </div>
        </div>
    );
};

export default MoodboardPreview;