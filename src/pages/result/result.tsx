import KeywordBox from "../../components/result/KeywordBox";
import ConceptBox from "../../components/result/ConceptBox";
import FontBox from "../../components/result/FontBox";
import ImageBox from "../../components/result/ImageBox";
import ColorPaletteBox from "../../components/result/ColorPaletteBox";
import TitleBox from "../../components/result/TitleBox";
import ExampleBox from "../../components/result/ExampleBox";
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
  const secondSet = geminiResult[1];
  const tags = [
    firstSet.colors?.[0],
    firstSet.image,
    secondSet.image,
    firstSet.font,
  ].filter(Boolean);

  return (
    <main className={styles.pageBg}>
      <div style={{ zIndex: 30 }}>
        <Header />
      </div>
      <div className={styles.topWrapper}>

      </div>
      <div className={styles.gridContainer}>
        <div className={styles.titleBox}>
          <TitleBox />
        </div>
        <div className={styles.imageBox}>
          <ImageBox />
        </div>
        <div className={styles.conceptBox}>
          <ConceptBox geminiResult={geminiResult} />
        </div>
        <div className={styles.keywordBox}>
          <KeywordBox tags={tags} />
        </div>
        <div className={styles.fontBox}>
          <FontBox fontKeyword={firstSet.font} />
        </div>
        <div className={styles.paletteBox}>
          <ColorPaletteBox />
        </div>
        <div className={styles.exampleBox}>
          <ExampleBox />
        </div>
      </div>
    </main>
  );
}
