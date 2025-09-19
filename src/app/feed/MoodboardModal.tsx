"use client";

import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import styles from "./MoodboardModal.module.css";
import TitleBox from "@/components/section/result/TitleBox";
import ConceptBox from "@/components/section/result/ConceptBox";
import ColorPaletteBox from "@/components/section/result/ColorPaletteBox";
import KeywordBox from "@/components/section/result/KeywordBox";
import ExampleBox from "@/components/section/result/ExampleBox";
import type { GeminiSet } from "@/types/result";

type Props = {
  moodboardId: string | null;
  open: boolean;
  onClose: () => void;
};

type MoodboardRow = {
  id: string;
  title: string | null;
  cover_image_url: string | null;
  tags: string[] | null;
  images_json?: any;
  palette_json?: any;
  fonts_json?: any;
  concept_text?: string[] | null;
};

export default function MoodboardModal({ moodboardId, open, onClose }: Props) {
  const [loading, setLoading] = useState(false);
  const [board, setBoard] = useState<MoodboardRow | null>(null);
  const backdropRef = useRef<HTMLDivElement | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (!open || !moodboardId) return;
    let cancelled = false;
    const run = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/feed/moodboard?id=${encodeURIComponent(moodboardId)}`, { cache: "no-store" });
        if (!res.ok) throw new Error(`status ${res.status}`);
        const j = await res.json();
        if (!cancelled) setBoard(j.moodboard as MoodboardRow);
      } catch (e) {
        console.error("[FeedModal] failed to load moodboard:", e);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    run();
    return () => { cancelled = true; };
  }, [open, moodboardId]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  // Ensure portal target is available (avoid SSR mismatch)
  useEffect(() => {
    setMounted(true);
  }, []);

  // Lock body scroll when modal is open to avoid layout shift on resize/scrollbar
  useEffect(() => {
    if (!mounted) return;
    const originalOverflow = document.body.style.overflow;
    if (open) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [mounted, open]);

  if (!open) return null;

  const handleBackdrop = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === backdropRef.current) onClose();
  };

  const geminiFromBoard: GeminiSet[] | null = board
    ? [{ colors: (board.palette_json || []).map((p: any) => p?.hex).filter(Boolean), image: "", font: "", sentences: board.concept_text || [] }]
    : null;

  const modalContent = (
    <div
      ref={backdropRef}
      className={styles.backdrop}
      onClick={handleBackdrop}
      role="dialog"
      aria-modal="true"
      aria-label="Moodboard preview"
    >
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          {moodboardId && (
            <a
              className={styles.openBtn}
              href={`/feed?open=${encodeURIComponent(moodboardId)}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="새 탭에서 열기"
              onClick={(e) => e.stopPropagation()}
            >
              새 탭에서 열기
            </a>
          )}
          <button className={styles.closeBtn} onClick={onClose} aria-label="닫기">
            ×
          </button>
        </div>
        <div className={styles.content}>
          <div className={styles.frame}>
            <div className={styles.scaledRoot}>
              <div className={styles.gridContainer}>
            <div className={`${styles.section} ${styles.titleBox}`}>
              <TitleBox readOnly compact value={(board?.title || "").trim() || "NEW\nMOODBOARD"} />
            </div>

            <div className={`${styles.section} ${styles.imageBox}`}>
              <div className={styles.boxTitle}>IMAGES</div>
              <div className={styles.imageGrid}>
                {(Array.isArray(board?.images_json) ? board!.images_json! : []).slice(0, 9).map((img: any, idx: number) => (
                  <div className={styles.imageItem} key={idx}>
                    <img src={img?.thumb || img?.url} alt={`image-${idx}`} />
                  </div>
                ))}
              </div>
            </div>

            <div className={`${styles.section} ${styles.conceptBox}`}>
              <div className={styles.conceptCard}>
                <ConceptBox geminiResult={geminiFromBoard} />
              </div>
            </div>

            <div className={`${styles.section} ${styles.fontBox}`}>
              <div className={styles.fontCard}>
                <div className={styles.boxTitle}>FONT</div>
                <div className={styles.fontList}>
                  {(Array.isArray(board?.fonts_json) ? board!.fonts_json! : []).slice(0, 3).map((f: any, i: number) => (
                    f?.image_link ? (
                      <a key={i} href={f?.link || '#'} target="_blank" rel="noopener noreferrer">
                        <img src={f.image_link} alt={f?.name || 'font'} className={styles.fontImg} />
                      </a>
                    ) : (
                      <div key={i} className={styles.fontItem}>
                        {f?.name || 'Font'}
                      </div>
                    )
                  ))}
                </div>
              </div>
            </div>

            <div className={`${styles.section} ${styles.paletteBox}`}>
              <ColorPaletteBox geminiResult={geminiFromBoard} title="COLOR" />
            </div>

            <div className={`${styles.section} ${styles.keywordBox}`}>
              <KeywordBox tags={(board?.tags || []) as string[]} />
            </div>

            <div className={`${styles.section} ${styles.exampleBox}`}>
              <ExampleBox />
            </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Use portal so position: fixed is relative to viewport, not any transformed ancestor
  return mounted ? createPortal(modalContent, document.body) : null;
}
