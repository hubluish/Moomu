import KeywordBox from "../../components/result/KeywordBox";
import ConceptBox from "../../components/result/ConceptBox";
import FontBox from "../../components/result/FontBox";
import ImageBox from "../../components/result/ImageBox";
import ColorPaletteBox from "../../components/result/ColorPaletteBox";
import TitleBox from "../../components/result/TitleBox";
import ExampleBox from "../../components/result/ExampleBox";
import styles from "./result.module.css";
import Header from "@/components/common/header/header";
import BackButton from "../../components/result/BackButton";
import RefreshButton from "../../components/result/RefreshButton";
import SaveButton from "../../components/result/SaveButton";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "@/utils/supabaseClient";
interface GeminiSet {
  colors: string[];
  image: string;
  font: string;
  sentences: string[];
}

export default function ResultPage() {
  const router = useRouter();
  const [geminiResult, setGeminiResult] = useState<GeminiSet[] | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [fetchedTags, setFetchedTags] = useState<string[] | null>(null);

  useEffect(() => {
    // Gemini 결과 로드
    const result = localStorage.getItem("gemini_result");
    if (result) {
      const parsed = JSON.parse(result);
      setGeminiResult(parsed);
    }

    // Supabase에서 request_id 기반으로 키워드 조회 시도
    (async () => {
      try {
        let rid: string | null = null;
        if (typeof window !== "undefined") {
          const sp = new URLSearchParams(window.location.search);
          rid = sp.get("rid");
        }
        if (!rid) return;
        const { data, error } = await supabase
          .from("moodboard_results")
          .select("color_keyword, font_keyword, image_keyword")
          .eq("request_id", rid);
        if (error || !data) return;
        const colorSet = new Set<string>();
        const fontSet = new Set<string>();
        const imageSet = new Set<string>();
        for (const row of data as any[]) {
          if (row.color_keyword) colorSet.add(String(row.color_keyword));
          if (row.font_keyword) fontSet.add(String(row.font_keyword));
          if (row.image_keyword) {
            String(row.image_keyword)
              .split(",")
              .map((s) => s.trim())
              .filter(Boolean)
              .forEach((it) => imageSet.add(it));
          }
        }
        const ordered = [
          ...Array.from(colorSet),
          ...Array.from(imageSet),
          ...Array.from(fontSet),
        ];
        setFetchedTags(ordered);
      } catch {}
    })();

    // 사용자가 직접 선택한 키워드 로드 (있으면 우선 표시)
    const selected = localStorage.getItem("selected_keywords");
    if (selected) {
      try {
        const parsedSelected = JSON.parse(selected);
        if (Array.isArray(parsedSelected)) {
          setSelectedTags(parsedSelected.filter(Boolean));
        }
      } catch (e) {
        console.warn("선택 키워드 파싱 실패", e);
      }
    }
  }, []);




  if (!geminiResult) {
    return <div>로딩 중...</div>;
  }

  const firstSet = geminiResult[0];
  const secondSet = geminiResult[1];
  const defaultTags = [
    firstSet?.colors?.[0],
    firstSet?.image,
    secondSet?.image,
    firstSet?.font,
  ].filter(Boolean) as string[];

  const tags = fetchedTags && fetchedTags.length > 0
    ? fetchedTags
    : (selectedTags.length > 0 ? selectedTags : defaultTags);

  return (
    <main className={styles.pageBg}>
      <div style={{ zIndex: 30 }}>
        <Header />
      </div>
      <div className={styles.topWrapper}>
        <BackButton  />
        <div className={styles.topRightWrapper}>
          <SaveButton onClick={() => router.push('/result/save')} />
          <RefreshButton  />
        </div>
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
        <div className={styles.fontBox}>
          <FontBox fontKeyword={firstSet.font} />
        </div>
        <div className={styles.paletteBox}>
          <ColorPaletteBox />
        </div>
        <div className={styles.keywordBox}>
          <KeywordBox tags={tags} />
        </div>
        <div className={styles.exampleBox}>
          <ExampleBox />
        </div>
      </div>
    </main>
  );
}
