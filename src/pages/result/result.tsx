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
  colors: string[];
  image: string;
  font: string;
  sentences: string[];
}

export default function ResultPage() {
  const [geminiResult, setGeminiResult] = useState<GeminiSet[] | null>(null);

  useEffect(() => {
  const result = localStorage.getItem("gemini_result");
  if (result) {
    const parsed = JSON.parse(result);
    setGeminiResult(parsed);
  }
}, []);




  if (!geminiResult) {
    return <div>로딩 중...</div>;
  }

  const firstSet = geminiResult[0];
  const tags = [
    firstSet.colors?.[0],
    firstSet.image,
    firstSet.font,
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
          <ConceptBox geminiResult={geminiResult} />
        </div>
        <div className={styles.fontBox}>
          <FontBox fontKeyword={firstSet.font} />
        </div>
        <div className={styles.imageBox}>
          <ImageBox imageKeyword={firstSet.image} />
        </div>
        <div className={styles.paletteBox}>
          <ColorPaletteBox />
        </div>
      </div>
    </main>
  );
}
