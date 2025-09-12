'use client';

import KeywordBox from "../../components/section/result/KeywordBox";
import ConceptBox from "../../components/section/result/ConceptBox";
import FontBox from "../../components/section/result/FontBox";
import ImageBox from "../../components/section/result/ImageBox";
import ColorPaletteBox from "../../components/section/result/ColorPaletteBox";
import TitleBox from "../../components/section/result/TitleBox";
import ExampleBox from "../../components/section/result/ExampleBox";
import styles from "./result.module.css";
import Header from "@/components/common/header/header";
import BackButton from "../../components/section/result/BackButton";
import RefreshButton from "../../components/section/result/RefreshButton";
import SaveButton from "../../components/section/result/SaveButton";

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

  useEffect(() => {
    (async () => {
      if (typeof window === "undefined") return;

      // URL에서 request_id 추출
      const sp = new URLSearchParams(window.location.search);
      const rid = sp.get("rid");
      if (!rid) {
        console.warn("❌ request_id가 없습니다.");
        return;
      }

      // ✅ Supabase에서 최신 데이터 조회
      const { data, error } = await supabase
        .from("moodboard_results")
        .select("id, color_keyword, font_keyword, image_keyword, mood_sentence")
        .eq("request_id", rid);

      if (error) {
        console.error("❌ Supabase fetch error:", error);
        return;
      }
      if (!data || data.length === 0) {
        console.warn("⚠️ Supabase에서 해당 request_id 결과를 찾을 수 없습니다.");
        return;
      }

      console.log("🎯 Supabase에서 불러온 결과:", data);

      // DB 데이터 → GeminiSet[]으로 정규화
      const normalized: GeminiSet[] = (data as any[]).map((row) => ({
        colors: Array.isArray(row.color_keyword)
          ? row.color_keyword
          : String(row.color_keyword ?? "")
              .split(",")
              .map((s) => s.trim())
              .filter(Boolean),
        image: row.image_keyword ?? "",
        font: row.font_keyword ?? "",
        sentences: Array.isArray(row.mood_sentence)
          ? row.mood_sentence
          : String(row.mood_sentence ?? "")
              .split(",")
              .map((s) => s.trim())
              .filter(Boolean),
      }));

      setGeminiResult(normalized);

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
  })();
  }, []);




  if (!geminiResult) {
    return <div>로딩 중...</div>;
  }

  const firstSet = geminiResult[0];

  const tags = selectedTags

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
          <ColorPaletteBox geminiResult={geminiResult} />
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
