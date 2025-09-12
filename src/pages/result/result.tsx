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
import RefreshButton from "../../components/section/result/RefreshButton";
import SaveButton from "../../components/section/result/SaveButton";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "@/utils/supabaseClient";
import type { GeminiSet } from "@/types/result";

// Supabase 응답 스키마 타입 정의
interface ResultRow {
  id: string;
  color_keyword: string | string[] | null;
  image_keyword: string | null;
  font_keyword: string | null;
  mood_sentence: string | string[] | null;
}

export default function ResultPage() {
  const router = useRouter();
  const [geminiResult, setGeminiResult] = useState<GeminiSet[] | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      if (typeof window === "undefined") return;

      // URL에서 request_id 추출
      const sp = new URLSearchParams(window.location.search);
      const rid = sp.get("rid");

      // 간단 검증: 영숫자/하이픈/언더스코어만 허용
      const RID_SAFE = /^[A-Za-z0-9_-]{1,128}$/;
      if (!rid || !RID_SAFE.test(rid)) {
        setErrorMsg("유효하지 않은 요청 ID 입니다.");
        setLoading(false);
        return;
      }

      // Supabase에서 결과 조회
      const { data, error } = await supabase
        .from("moodboard_results")
        .select("id, color_keyword, font_keyword, image_keyword, mood_sentence")
        .eq("request_id", rid);

      if (error) {
        console.error("Supabase fetch error:", error);
        setErrorMsg("결과를 불러오지 못했습니다. 잠시 후 다시 시도해주세요.");
        setLoading(false);
        return;
      }
      if (!data || data.length === 0) {
        setErrorMsg("결과가 없습니다. 올바른 링크인지 확인해주세요.");
        setLoading(false);
        return;
      }

      // DB 데이터를 GeminiSet[]로 정규화
      const normalized: GeminiSet[] = (data as ResultRow[]).map((row) => ({
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
      setLoading(false);

      // 사용자 직접 선택 키워드 로드(결과 페이지 태그 표시용)
      try {
        const selected = localStorage.getItem("selected_keywords");
        if (selected) {
          const parsedSelected = JSON.parse(selected);
          if (Array.isArray(parsedSelected)) {
            setSelectedTags(parsedSelected.filter(Boolean));
          }
        }
      } catch (e) {
        console.warn("선택 키워드 로드 실패", e);
      }
    })();
  }, []);

  // 로딩/에러 상태 처리
  if (loading) return <div>로딩 중…</div>;
  if (errorMsg) return <div>{errorMsg}</div>;
  if (!geminiResult || geminiResult.length === 0) return <div>표시할 결과가 없습니다.</div>;

  const firstSet = geminiResult[0];
  const tags = selectedTags;

  return (
    <main className={styles.pageBg}>
      <div style={{ zIndex: 30 }}>
        <Header />
      </div>
      <div className={styles.topWrapper}>
        <div className={styles.topRightWrapper}>
          <></>
          <SaveButton onClick={() => router.push('/result/save')} />
          <RefreshButton />
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

