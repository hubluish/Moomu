"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./generate.module.css";
import PopAlert from "../../components/section/home/PopAlert";
import ColorOption from "../../components/section/home/ColorOption";
import TitleBlock from "../../components/section/home/TitleBlock";
import NextButton from "../../components/section/home/NextButton";
import PreviousButton from "../../components/section/home/PreviousButton";
import ProgressBar from "../../components/section/home/ProgressBar";
import MoodOption from "../../components/section/home/MoodOption";
import TagGuideModal from "../../components/section/home/TagGuideModal";
import SeeMoreButton from "../../components/section/home/SeeMoreButton";
import { saveToSupabase } from "../../utils/saveToSupabase";
import PopCheer from "../../components/section/home/PopCheer";

import stepMeta from "../../../public/data/stepMeta.json";
import colorThemes from "../../../public/data/colorThemes.json";
import fontThemes from "../../../public/data/fontThemes.json";
import imageThemes from "../../../public/data/imageThemes.json";
import imagePriority from "../../../public/data/imagePriority.json";
import fontPriority from "../../../public/data/fontPriority.json";
import toastMessages from "../../../public/data/toastMessages.json";

interface Option {
  title: string;
  description: string;
  colors?: string[];
  key?: string;
}

function Home() {
  const [step, setStep] = useState(1);
  const router = useRouter();
  const [selections, setSelections] = useState<(string | null)[]>([
    null,
    null,
    null,
    null,
  ]);
  const [showAlert, setShowAlert] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showAllOptions, setShowAllOptions] = useState(false);
  const [cheerVisible, setCheerVisible] = useState(false);
  const [cheerMsg, setCheerMsg] = useState<React.ReactNode>("");
  const cheerTimerRef = useRef<number | null>(null);
  const alertTimerRef = useRef<number | null>(null);
  const [cheerTick, setCheerTick] = useState(0);
  const [alertTick, setAlertTick] = useState(0);

  const meta = stepMeta[step - 1];

  const getStepContent = (): Array<{
    title: string;
    description: string;
    colors?: string[];
  }> => {
    if (step === 1) return colorThemes;

    if (step === 2) {
      const selectedColor = selections[0]?.toLowerCase() || "";
      const priority =
        imagePriority[selectedColor as keyof typeof imagePriority] || [];

      const priorityOptions = imageThemes.filter((opt) =>
        priority.includes(opt.title)
      );
      const remainingOptions = imageThemes.filter(
        (opt) => !priority.includes(opt.title)
      );

      return [...priorityOptions, ...remainingOptions];
    }

    if (step === 3) {
      const selectedColor = selections[0]?.toLowerCase() || "";
      const priority =
        (fontPriority as Record<string, string[]>)[selectedColor] || [];

      const priorityOptions = fontThemes.filter((opt) =>
        priority.includes(opt.title)
      );
      const remainingOptions = fontThemes.filter(
        (opt) => !priority.includes(opt.title)
      );

      return [...priorityOptions, ...remainingOptions];
    }

    if (step === 4) {
      const tagUsedInStep2 = selections[1];
      return imageThemes.filter((opt) => opt.title !== tagUsedInStep2);
    }

    return [];
  };

  const stepOptions = getStepContent();
  const visibleOptions = showAllOptions
    ? stepOptions
    : step === 1
    ? stepOptions.slice(0, 6)
    : stepOptions.slice(0, 4);

    useEffect(() => {
        sessionStorage.removeItem('resultPageState');
    }, []);

    useEffect(() => {
    const timer = setTimeout(() => {
      setShowModal(true);
    }, 10000);

    return () => clearTimeout(timer);
  }, [step]);

  useEffect(() => {
    return () => {
      if (cheerTimerRef.current) {
        window.clearTimeout(cheerTimerRef.current);
        cheerTimerRef.current = null;
      }
      if (alertTimerRef.current) {
        window.clearTimeout(alertTimerRef.current);
        alertTimerRef.current = null;
      }
    };
  }, []);

  const handleNext = async () => {
    if (!selections[step - 1]) {
      showAlertOnce(1500);
      return;
    }

    if (step >= 1 && step <= 3) {
      const selectedTitle = selections[step - 1] as string;
      const category =
        step === 1
          ? "color"
          : step === 2
          ? "image"
          : ("text" as "color" | "image" | "text");
      const moodText = (toastMessages as any)[category]?.[selectedTitle] as
        | string
        | undefined;
      const thingLabel =
        category === "color"
          ? "컬러"
          : category === "image"
          ? "이미지 태그"
          : "텍스트";
      const msg = moodText ? (
        <>
          좋은 선택이에요! 이 <strong>{thingLabel}</strong>는{" "}
          <strong>{moodText}</strong> 느낌을 잘 담아줘요.
        </>
      ) : (
        <>
          좋은 선택이에요! <strong>{selectedTitle}</strong> {thingLabel}를
          선택했어요.
        </>
      );

      showCheer(msg, 1200);
    }

    if (step < 4) {
      setStep(step + 1);
      setShowAllOptions(false);
      return;
    }

    const payload = {
      color: selections[0],
      font: selections[2],
      image: [selections[1], ...(selections[3]?.split(",") || [])]
        .filter(Boolean)
        .join(", "),
    };

    console.log(
      "%c✅ Gemini 요청 payload:",
      "color: blue; font-weight: bold;",
      payload
    );

    try {
      const response = await fetch("/api/gemini_proxy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        });

        const result = await response.json();
        console.log('%c🎨 Gemini 응답 결과:', 'color: green; font-weight: bold;', result);

        try {
                const selectedColor = selections[0] ?? undefined;
                const selectedFont = selections[2] ?? undefined;
                const selectedImages = [
                    selections[1],
                    ...(selections[3]?.split(',') || []),
                ].filter(Boolean) as string[];

                const selectedKeywords = [
                    ...(selectedColor ? [selectedColor] : []),
                    ...selectedImages,
                    ...(selectedFont ? [selectedFont] : []),
                ];

                localStorage.setItem('selected_keywords', JSON.stringify(selectedKeywords));
            } catch (e) {
                console.warn('선택 키워드 저장 실패:', e);
            }

        console.log('%c💾 Supabase 저장 시작:', 'color: blue; font-weight: bold;');
        try {
        const rid = await saveToSupabase(result);
        console.log('%c✅ Supabase 저장 성공:', 'color: green; font-weight: bold;');
        if (rid) {
            router.push(`/generate/loading?rid=${encodeURIComponent(rid)}`);
        } else {
            console.error('❌ Request ID 생성 실패');
            alert('요청 ID 생성에 실패했습니다.');
        }
        } catch (error) {
        console.error('%c❌ Supabase 저장 실패:', 'color: red; font-weight: bold;', error);
        }
    } catch (error) {
      console.error("❌ Gemini 서버 호출 실패:", error);
      alert("Gemini API 요청에 실패했습니다.");
    }
  };

    const showCheer = (message: React.ReactNode, duration = 1200) => {
        if (cheerTimerRef.current) {
            window.clearTimeout(cheerTimerRef.current);
            cheerTimerRef.current = null;
          
        }
        setCheerMsg(message);
        setCheerVisible(true);
        setCheerTick(t => t + 1);              

        cheerTimerRef.current = window.setTimeout(() => {
            setCheerVisible(false);
            cheerTimerRef.current = null;
        }, duration);
    };

    const showAlertOnce = (duration = 1000) => {
        if (alertTimerRef.current) {
            window.clearTimeout(alertTimerRef.current);
            alertTimerRef.current = null;
        }
        setShowAlert(true);
        setAlertTick(t => t + 1);

        alertTimerRef.current = window.setTimeout(() => {
            setShowAlert(false);
            alertTimerRef.current = null;
        }, duration);
    };

    const handleSelect = (option: string) => {
        setSelections((prev) => {
          const updated = [...prev];
          if (step === 4) {
            const currentSelections = updated[3] ? updated[3].split(",") : [];
            const newSelections = currentSelections.includes(option)
              ? currentSelections.filter((item) => item !== option)
              : [...currentSelections, option];
            updated[3] = newSelections.join(",");
          } else {
            updated[step - 1] = prev[step - 1] === option ? null : option;
            for (let i = step; i < updated.length; i++) updated[i] = null;
          }
          return updated;
        });
      };

  return (
    <main>
      <ProgressBar step={step} />
      <PopAlert visible={showAlert} top={70} zIndex={1002} />
      <PopCheer
        visible={cheerVisible}
        message={cheerMsg}
        top={70}
        zIndex={1001}
      />
      <TitleBlock title={meta.title} subtitle={meta.subtitle} />
      <NextButton
        onClick={handleNext}
        variant={step < 4 ? "black" : "gradient"}
      />
      <PreviousButton onClick={() => setStep(step > 1 ? step - 1 : step)} />
      <div className={styles.gridContainer}>
        {step === 1 ? (
          <div className={styles.grid3columns}>
            {visibleOptions.map((opt: Option, index: number) => (
              <ColorOption
                key={index}
                title={opt.title}
                description={opt.description}
                colors={opt.colors || []}
                isSelected={selections[0] === opt.title}
                onClick={() => handleSelect(opt.title)}
              />
            ))}
          </div>
        ) : (
          <div className={styles.grid2x2}>
            {visibleOptions.map((opt: Option, index: number) => (
              <MoodOption
                key={index}
                title={opt.title}
                subtitle={opt.description}
                keyName={opt.key}
                step={step}
                isSelected={
                  step === 4
                    ? selections[3]?.split(",").includes(opt.title)
                    : selections[step - 1] === opt.title
                }
                onClick={() => handleSelect(opt.title)}
              />
            ))}
          </div>
        )}
      </div>
      {!showAllOptions && stepOptions.length > 4 && (
        <div className={styles.seeMoreWrapper}>
          <SeeMoreButton onClick={() => setShowAllOptions(true)} />
        </div>
      )}

      {showModal && (
        <div className={styles.modalOverlay}>
          <TagGuideModal onClose={() => setShowModal(false)} />
        </div>
      )}
    </main>
  );
}

export default Home;
