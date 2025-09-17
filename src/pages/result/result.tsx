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

interface ImageItem {
  url: string;
  thumb?: string;
  source?: string;
}
interface ResolvedFont {
  name?: string;
  link?: string;
  image_link?: string;
}

export default function ResultPage() {
  const router = useRouter();
  const [geminiResult, setGeminiResult] = useState<GeminiSet[] | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fontIndex, setFontIndex] = useState(0);
  const [revealedCount, setRevealedCount] = useState(1);
  const [conceptIndex, setConceptIndex] = useState(0);
  const [colorIndex, setColorIndex] = useState(0);

  const [visibleImages, setVisibleImages] = useState<ImageItem[]>([]);
  const [resolvedFont, setResolvedFont] = useState<ResolvedFont | null>(null);
  // Default title shows two lines: "New" and "Moodboard"
  const [title, setTitle] = useState<string>("New\nMoodboard");

  useEffect(() => {
    (async () => {
      if (typeof window === "undefined") return;

      // URL에서 request_id 추출
      const sp = new URLSearchParams(window.location.search);
      let rid: string | null = sp.get("rid");
      if (!rid) {
        try {
          rid = localStorage.getItem("last_request_id");
        } catch {}
      }

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

  // Prefetch disabled per request: load next only on refresh

  const handleSave = async () => {
    if (!geminiResult || geminiResult.length === 0) return;
    const sp = new URLSearchParams(window.location.search);
    const requestId = sp.get("rid") || undefined;

    const currentSet = geminiResult[currentIndex] ?? geminiResult[0];

    // auth user 가져오기 (owner_id 용)
    const {
      data: { user },
      error: userErr,
    } = await supabase.auth.getUser();
    if (userErr || !user) {
      alert("로그인이 필요합니다.");
      return;
    }

    // moodboard 행 구성
    const palette_json = (currentSet.colors || []).map((hex) => ({ hex, name: "" }));
    const fonts_json = resolvedFont
      ? [{ name: resolvedFont.name || currentSet.font || "", link: resolvedFont.link || "", image_link: resolvedFont.image_link || "" }]
      : [{ name: currentSet.font || "", link: "", image_link: "" }];

    const images_json = (visibleImages || []).map((img) => ({
      url: img.url,
      thumb: img.thumb || img.url,
      source: img.source || "pinterest",
    }));

    // 커버는 서버에서 생성(webp)하여 갱신하므로 초기값은 null로 둔다
    const cover_image_url = null as string | null;
    const concept_text = (currentSet.sentences || []) as string[];

    try {
      const { data, error } = await supabase
        .from("moodboard")
        .insert({
          request_id: requestId,                 // 파이프라인 추적용
          owner_id: user.id,                     // RLS에서 auth.uid()로 검증
          title: title?.trim() || null,
          concept_text,
          palette_json,
          fonts_json,
          images_json,
          cover_image_url,
          tags: selectedTags,
          is_public: false,
        })
        .select("id")
        .single();

      if (error) {
        console.error("moodboard insert error:", error);
        alert("저장에 실패했습니다. 잠시 후 다시 시도해주세요.");
        return;
      }

      // 저장 성공 시 이동 (원하면 여기서 피드/상세로 라우팅)
      router.push(`/result/save?mid=${data?.id}`);
    } catch (e) {
      console.error(e);
      alert("저장 중 오류가 발생했습니다.");
    }
  };

  // 로딩/에러 상태 처리
  if (loading) return <div>로딩 중…</div>;
  if (errorMsg) return <div>{errorMsg}</div>;
  if (!geminiResult || geminiResult.length === 0) return <div>표시할 결과가 없습니다.</div>;

  const currentSet = geminiResult[currentIndex] ?? geminiResult[0];
  const currentFontSet = geminiResult[fontIndex] ?? geminiResult[0];
  const currentConceptSet = geminiResult[conceptIndex] ?? geminiResult[0];
  const currentColorSet = geminiResult[colorIndex] ?? geminiResult[0];
  const tags = selectedTags;


  return (
    <main className={styles.pageBg}>
      <div style={{ zIndex: 30 }}>
        <Header />
      </div>
      <div className={styles.topWrapper}>
        <div className={styles.topRightWrapper}>
          <></>
          <SaveButton onClick={handleSave} />
          <RefreshButton
            onClick={() => {
              if (revealedCount < geminiResult.length) {
                const nextRevealed = revealedCount + 1;
                setRevealedCount(nextRevealed);
                setCurrentIndex(nextRevealed - 1);
                setFontIndex(nextRevealed - 1);
                setConceptIndex(nextRevealed - 1);
                setColorIndex(nextRevealed - 1);
              }
            }}
            disabled={revealedCount >= geminiResult.length}
          />
        </div>
      </div>
      <div className={styles.gridContainer}>
        <div className={styles.titleBox}>
          <TitleBox value={title} onChangeTitle={setTitle} />
        </div>
        <div className={styles.imageBox}>
          <ImageBox
            geminiSet={currentSet}
            perPage={9}
            orientation="landscape"
            useColorFilter
            onPrev={() => setCurrentIndex((idx) => Math.max(0, idx - 1))}
            onNext={() => setCurrentIndex((idx) => Math.min(revealedCount - 1, idx + 1))}
            disablePrev={currentIndex <= 0}
            disableNext={currentIndex >= revealedCount - 1}
            onImagesChange={setVisibleImages}
          />
        </div>
        <div className={styles.conceptBox}>
          <ConceptBox
            geminiSet={currentConceptSet}
            onPrev={() => setConceptIndex((idx) => Math.max(0, idx - 1))}
            onNext={() => setConceptIndex((idx) => Math.min(revealedCount - 1, idx + 1))}
            disablePrev={conceptIndex <= 0}
            disableNext={conceptIndex >= revealedCount - 1}
          />
        </div>
        <div className={styles.fontBox}>
          <FontBox
            geminiSet={currentFontSet}
            onResolved={setResolvedFont}
            onPrev={() => setFontIndex((idx) => Math.max(0, idx - 1))}
            onNext={() => setFontIndex((idx) => Math.min(revealedCount - 1, idx + 1))}
            disablePrev={fontIndex <= 0}
            disableNext={fontIndex >= revealedCount - 1}
          />
        </div>
        <div className={styles.paletteBox}>
          <ColorPaletteBox
            geminiSet={currentColorSet}
            onPrev={() => setColorIndex((idx) => Math.max(0, idx - 1))}
            onNext={() => setColorIndex((idx) => Math.min(revealedCount - 1, idx + 1))}
            disablePrev={colorIndex <= 0}
            disableNext={colorIndex >= revealedCount - 1}
          />
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

