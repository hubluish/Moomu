"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { createPortal } from "react-dom";
import styles from "./MoodboardModal.module.css";
import TitleBox from "@/components/section/result/result/TitleBox";
import ConceptBox from "@/components/section/result/result/ConceptBox";
import ColorPaletteBox from "@/components/section/result/result/ColorPaletteBox";
import KeywordBox from "@/components/section/result/result/KeywordBox";
import FontBox from "@/components/section/result/result/FontBox";
import ExampleBox from "@/components/section/result/result/ExampleBox";
import type { GeminiSet } from "@/types/result";

type Props = {
  moodboardId: string | null;
  open: boolean;
  onClose: () => void;
};

interface ImageItem {
  thumb?: string;
  url?: string;
}

interface PaletteColor {
  hex?: string;
}

interface Font {
  image_link?: string;
  link?: string;
  name?: string;
}

type MoodboardRow = {
  id: string;
  title: string | null;
  cover_image_url: string | null;
  tags: string[] | null;
  images_json?: ImageItem[];
  palette_json?: PaletteColor[];
  fonts_json?: Font[];
  concept_text?: string[] | null;
};

export default function MoodboardModal({ moodboardId, open, onClose }: Props) {
  // ---- Hooks (항상 최상위에서 호출) ----
  const [board, setBoard] = useState<MoodboardRow | null>(null);
  const backdropRef = useRef<HTMLDivElement | null>(null);
  const [mounted, setMounted] = useState(false);
  const [fontIndex, setFontIndex] = useState(0);

  useEffect(() => {
    if (!open || !moodboardId) return;
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(
          `/api/feed/moodboard?id=${encodeURIComponent(moodboardId)}`,
          { cache: "no-store" }
        );
        if (!res.ok) throw new Error(`status ${res.status}`);
        const j = await res.json();
        if (!cancelled) {
          setBoard(j.moodboard as MoodboardRow);
          setFontIndex(0);
        }
      } catch (e) {
        console.error("[FeedModal] failed to load moodboard:", e);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [open, moodboardId]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const originalOverflow = document.body.style.overflow;
    if (open) document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [mounted, open]);

  // 훅이 아닌 상수/계산은 자유롭게 두어도 되지만,
  // useMemo(훅)는 조건부 렌더보다 먼저 호출되어야 함
  const allowedFontKeywords = ["붓글씨", "캘리그라피", "삐뚤빼뚤", "어른 손글씨", "손글씨 바"] as const;

  const fontKeyword = useMemo(() => {
    const byName = (board?.fonts_json?.[0]?.name || "").trim();
    if (byName) return byName;
    const hit = (board?.tags || []).find((t) => allowedFontKeywords.includes(t as any));
    return (hit || "").trim();
  }, [board]);

  const geminiFromBoard: GeminiSet | null = board
    ? {
        colors: (board.palette_json || [])
          .map((p: PaletteColor) => p?.hex)
          .filter(Boolean) as string[],
        image: "",
        font: fontKeyword,
        sentences: board.concept_text || [],
      }
    : null;

  // ✅ 모든 훅 호출이 끝난 다음에 조기 반환
  if (!open) return null;

  const handleBackdrop = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === backdropRef.current) onClose();
  };

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
              href={`/feed/preview?id=${encodeURIComponent(moodboardId)}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open in new tab"
              onClick={(e) => e.stopPropagation()}
            >
              새 탭에서 열기
            </a>
          )}
          <button
            className={styles.closeBtn}
            onClick={onClose}
            aria-label="Close"
          >
            <Image
              src="/assets/icons/material-symbols_close-rounded.svg"
              alt=""
              aria-hidden="true"
              width={50}
              height={50}
            />
          </button>
        </div>
        <div className={styles.content}>
          <div className={styles.frame}>
            <div className={styles.scaledRoot}>
              <div className={styles.gridContainer}>
                <div className={`${styles.section} ${styles.titleBox}`}>
                  <TitleBox
                    readOnly
                    compact
                    value={(board?.title || "").trim() || "NEW\nMOODBOARD"}
                  />
                </div>

                <div className={`${styles.section} ${styles.imageBox}`}>
                  <div className={styles.boxTitle}>IMAGES</div>
                  <div className={styles.imageGrid}>
                    {(Array.isArray(board?.images_json) ? board!.images_json! : [])
                      .slice(0, 9)
                      .map((img: ImageItem, idx: number) => (
                        <div className={styles.imageItem} key={idx}>
                          <Image
                            src={img?.thumb || img?.url || ""}
                            alt={`image-${idx}`}
                            width={130}
                            height={130}
                            unoptimized
                          />
                        </div>
                      ))}
                  </div>
                </div>

                <div className={`${styles.section} ${styles.conceptBox}`}>
                  <div className={styles.conceptCard}>
                    <ConceptBox geminiSet={geminiFromBoard} />
                  </div>
                </div>

                <div className={`${styles.section} ${styles.fontBox}`}>
                  <FontBox
                    geminiSet={
                      geminiFromBoard || { colors: [], image: "", font: fontKeyword, sentences: [] }
                    }
                    fontIndex={fontIndex}
                    onPrev={() => setFontIndex((i) => Math.max(0, i - 1))}
                    onNext={() => setFontIndex((i) => i + 1)}
                    disablePrev={fontIndex <= 0}
                  />
                </div>

                <div className={`${styles.section} ${styles.paletteBox}`}>
                  <ColorPaletteBox geminiSet={geminiFromBoard} title="COLOR" />
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

  return mounted ? createPortal(modalContent, document.body) : null;
}
