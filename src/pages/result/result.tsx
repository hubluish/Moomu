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

  const [visibleImages, setVisibleImages] = useState<ImageItem[]>([]);
  const [resolvedFont, setResolvedFont] = useState<{ name: string; link: string; image_link?: string } | null>(null);
  const [title, setTitle] = useState<string>("");

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
      ? [{ name: resolvedFont.name || currentSet.font || "", link: resolvedFont.link || "" }]
      : [{ name: currentSet.font || "", link: "" }];

    const images_json = (visibleImages || []).map((img) => ({
      url: img.url,
      thumb: img.thumb || img.url,
      source: img.source || "pinterest",
    }));

    const cover_image_url = images_json[0]?.thumb || images_json[0]?.url || null;
    const concept_text = (currentSet.sentences || []).join("\n");

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
              const next = Math.min(geminiResult.length - 1, currentIndex + 1);
              if (next !== currentIndex) {
                console.info('[Result] Refresh -> index', next, 'keyword:', geminiResult[next].image);
                setCurrentIndex(next);
              }
            }}
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
            onNext={() => setCurrentIndex((idx) => Math.min(geminiResult.length - 1, idx + 1))}
            disablePrev={currentIndex <= 0}
            disableNext={currentIndex >= geminiResult.length - 1}
            onImagesChange={setVisibleImages}
          />
        </div>
        <div className={styles.conceptBox}>
          <ConceptBox geminiResult={geminiResult} />
        </div>
        <div className={styles.fontBox}>
          <FontBox fontKeyword={currentSet.font} onResolved={setResolvedFont} />
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

