"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import styles from "../MoodboardModal.module.css";
import TitleBox from "@/components/section/result/TitleBox";
import ConceptBox from "@/components/section/result/ConceptBox";
import ColorPaletteBox from "@/components/section/result/ColorPaletteBox";
import KeywordBox from "@/components/section/result/KeywordBox";
import ExampleBox from "@/components/section/result/ExampleBox";
import type { GeminiSet } from "@/types/result";

interface Image {
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
  images_json?: Image[];
  palette_json?: PaletteColor[];
  fonts_json?: Font[];
  concept_text?: string[] | null;
};

export default function FeedPreviewPage() {
  const params = useSearchParams();
  const id = params?.get("id");
  const [board, setBoard] = useState<MoodboardRow | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    let cancelled = false;
    const load = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/feed/moodboard?id=${encodeURIComponent(id)}`, { cache: "no-store" });
        if (!res.ok) throw new Error(`status ${res.status}`);
        const j = await res.json();
        if (!cancelled) setBoard(j.moodboard as MoodboardRow);
      } catch (e: unknown) {
        const message = e instanceof Error ? e.message : String(e);
        if (!cancelled) setError(message || "Failed to load");
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    load();
    return () => { cancelled = true; };
  }, [id]);

  const geminiFromBoard: GeminiSet | null = board
    ? {
        colors: (board.palette_json || []).map((p: PaletteColor) => p?.hex).filter(Boolean) as string[],
        image: "",
        font: "",
        sentences: board.concept_text || [],
      }
    : null;

  if (!id) {
    return <div style={{ padding: 24 }}>Invalid request. The "id" query parameter is required.</div>;
  }

  if (loading) {
    return <div style={{ padding: 24 }}>Loading moodboard...</div>;
  }

  if (error) {
    return <div style={{ padding: 24 }}>Error: {error}</div>;
  }

  return (
    <div className={styles.previewRoot} style={{ width: "100vw", height: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      {/* Reuse the modal's inner background and frame only */}
      <div className={`${styles.content} ${styles.previewContent}`} style={{ width: "100%", height: "100%" }}>
        <div className={`${styles.frame} ${styles.previewFrame}`}>
          {/* Keep original scale for consistent layout inside the frame */}
          <div className={styles.scaledRoot}>
            <div className={styles.gridContainer}>
              <div className={`${styles.section} ${styles.titleBox}`}>
                <TitleBox readOnly compact value={(board?.title || "").trim() || "NEW\nMOODBOARD"} />
              </div>

              <div className={`${styles.section} ${styles.imageBox}`}>
                <div className={styles.boxTitle}>IMAGES</div>
                <div className={styles.imageGrid}>
                  {(Array.isArray(board?.images_json) ? board!.images_json! : []).slice(0, 9).map((img: Image, idx: number) => (
                    <div className={styles.imageItem} key={idx}>
                      <img src={img?.thumb || img?.url} alt={`image-${idx}`} />
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
                <div className={styles.fontCard}>
                  <div className={styles.boxTitle}>FONT</div>
                  <div className={styles.fontList}>
                    {(Array.isArray(board?.fonts_json) ? board!.fonts_json! : []).slice(0, 3).map((f: Font, i: number) => (
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
  );
}
