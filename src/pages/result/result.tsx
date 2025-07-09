import MoodboardTitle from "../../components/result/MoodboardTitle";
import Chips from "../../components/result/Chips";
import ActionButtons from "../../components/result/ActionButtons";
import ConceptBox from "../../components/result/ConceptBox";
import FontBox from "../../components/result/FontBox";
import ImageBox from "../../components/result/ImageBox";
import ColorPaletteBox from "../../components/result/ColorPaletteBox";
import styles from "./result.module.css";
import Header from "@/components/common/header/header";

import React, { useEffect, useState } from "react";

interface GeminiSet {
  color_keywords: string[];
  image_keyword: string;
  font_keyword: string;
  sentences: string[];
}

export default function ResultPage() {
  const [geminiResult, setGeminiResult] = useState<GeminiSet[] | null>(null);

  useEffect(() => {
    const result = localStorage.getItem("gemini_result");
    if (result) {
      setGeminiResult(JSON.parse(result));
    }
  }, []);

  if (!geminiResult) {
    return <div>로딩 중...</div>;
  }

  // 첫 번째 세트의 데이터 사용
  const firstSet = geminiResult[0];
  const tags = [
    firstSet.color_keywords?.[0],
    firstSet.image_keyword,
    firstSet.font_keyword,
  ].filter(Boolean);

  return (
    <main>
      <div style={{ zIndex: 30 }}>
        <Header />
      </div>
      <MoodboardTitle />
      <div className={styles.topWrapper}>
        <div className={styles.chips}>
          <Chips tags={tags} />
        </div>
        <div className={styles.actionsWrapper}>
          <div className={styles.actions}>
            <ActionButtons />
          </div>
        </div>
      </div>
      <div className={styles.gridContainer}>
        <div className={styles.conceptBox}>
          <ConceptBox />
        </div>
        <div className={styles.fontBox}>
          <FontBox />
        </div>
        <div className={styles.imageBox}>
          <ImageBox imageKeyword={firstSet.image_keyword} />
        </div>
        <div className={styles.paletteBox}>
          <ColorPaletteBox />
        </div>
      </div>
    </main>
  );
}
