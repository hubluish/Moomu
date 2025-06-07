import React, { useState, FormEvent, ChangeEvent, KeyboardEvent, useRef } from "react";
import styles from "./ArticleList.module.css";
import "@/styles/variable.css";
import Image from "next/image";
import crypto from "crypto";

const CATEGORY_OPTIONS = ["UI", "카드뉴스", "포스터", "용어사전", "트렌드"];

interface ArticleCreateProps {
  onCreated: () => void;
}

export default function ArticleCreate({ onCreated }: ArticleCreateProps) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState(CATEGORY_OPTIONS[0]);
  const [date, setDate] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [description, setDescription] = useState("");
  const [keywordInput, setKeywordInput] = useState("");
  const [keywords, setKeywords] = useState<string[]>([]);
  const [isComposing, setIsComposing] = useState(false);
  const [content, setContent] = useState(""); 
  const contentRef = useRef<HTMLDivElement>(null);

  // 파일 선택/드래그앤드롭 핸들러
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = ev => setImageUrl(ev.target?.result as string);
      reader.readAsDataURL(file);
    }
  };
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = ev => setImageUrl(ev.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  // 이미지 URL 직접 입력 핸들러
  const handleImageUrlInput = (e: ChangeEvent<HTMLInputElement>) => {
    setImageUrl(e.target.value);
    setImageFile(null); // URL 입력 시 파일 선택 해제
  };

  // 키워드 입력 핸들러
  const handleKeywordInput = (e: ChangeEvent<HTMLInputElement>) => {
    setKeywordInput(e.target.value);
  };

  const handleKeywordKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && keywordInput.trim()) {
      e.preventDefault();
      let value = keywordInput.trim();
      if (value.startsWith("#")) value = value.slice(1);
      if (value && !keywords.includes(value)) {
        setKeywords([...keywords, value]);
      }
      setKeywordInput("");
    }
  };

  const handleRemoveKeyword = (removeIdx: number) => {
    setKeywords(keywords.filter((_, idx) => idx !== removeIdx));
  };

  // 붙여넣기 시 이미지 처리
  const handlePaste = (e: React.ClipboardEvent<HTMLDivElement>) => {
    const items = e.clipboardData.items;
    for (let i = 0; i < items.length; i++) {
      if (items[i].type.indexOf("image") !== -1) {
        const file = items[i].getAsFile();
        if (file) {
          const reader = new FileReader();
          reader.onload = ev => {
            // 커서 위치에 이미지 삽입
            insertImageAtCursor(ev.target?.result as string);
          };
          reader.readAsDataURL(file);
          e.preventDefault();
        }
      }
    }
  };

  // 커서 위치에 이미지 삽입
  const insertImageAtCursor = (src: string) => {
    const sel = window.getSelection();
    if (!sel || !sel.rangeCount) return;
    const range = sel.getRangeAt(0);
    const img = document.createElement("img");
    img.src = src;
    img.style.height = "300px";
    img.style.width = "auto";
    img.style.display = "block";
    range.insertNode(img);
    // 커서 이동
    range.setStartAfter(img);
    range.setEndAfter(img);
    sel.removeAllRanges();
    sel.addRange(range);
  };

  // #, ##, ###, #### 스타일 자동 적용
  const handleInput = () => {
    const el = contentRef.current;
    if (!el) return;
    setContent(el.innerText); // 입력값을 state에 저장
  };

  function toSlug(text: string) {
    return crypto.createHash("sha256").update(text).digest("hex");
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    let formattedDate = date;
    if (date.match(/^\d{4}-\d{2}-\d{2}$/)) {
      const [y, m, d] = date.split("-");
      formattedDate = `${y.slice(2)}.${m}.${d}`;
    }

    // 1. innerHTML을 줄 단위로 파싱
    const htmlRaw = contentRef.current?.innerText || ""; // ← let → const

    // <div>...</div> 또는 <br> 기준으로 분리
    const lines = htmlRaw.split("\n").map(line => line.trim());

    const html = lines
      .map(line => {
        if (/^https?:\/\/.*\.(jpg|jpeg|png|gif|webp)$/i.test(line)) {
          return `<img src="${line}" style="height:300px;width:auto;display:block;" />`;
        }
        if (/^####\s*/.test(line)) {
          return `<div class="markdown-body2">${line.replace(/^####\s*/, "")}</div>`;
        }
        else if (/^###\s*/.test(line)) {
          return `<div class="markdown-body1">${line.replace(/^###\s*/, "")}</div>`;
        }
        else if (/^##\s*/.test(line)) {
          return `<div class="markdown-title2">${line.replace(/^##\s*/, "")}</div>`;
        }
        else if (/^#\s*/.test(line)) {
          return `<div class="markdown-title1">${line.replace(/^#\s*/, "")}</div>`;
        }
        return `<div>${line}</div>`;
      })
      .join("");

    const slug = toSlug(title);

    await fetch("/api/articles", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        slug, 
        content: html,
        category,
        date: formattedDate,
        imageUrl,
        description,
        keywords,
      }),
    });
    alert("추가되었습니다!");
    onCreated();
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        className={styles.input}
        placeholder="제목"
        value={title}
        onChange={e => {
          if (!isComposing) {
            if (e.target.value.length <= 12) setTitle(e.target.value);
            else setTitle(e.target.value.slice(0, 12));
          } else {
            setTitle(e.target.value);
          }
        }}
        onCompositionStart={() => setIsComposing(true)}
        onCompositionEnd={e => {
          setIsComposing(false);
          // 조합 끝나면 길이 제한 적용
          if (e.currentTarget.value.length > 12) {
            setTitle(e.currentTarget.value.slice(0, 12));
          }
        }}
        required
      />
      <select
        className={styles.input}
        value={category}
        onChange={e => setCategory(e.target.value)}
        required
      >
        {CATEGORY_OPTIONS.map(option => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
      <input
        className={styles.input}
        type="date"
        value={date}
        onChange={e => setDate(e.target.value)}
        required
      />
      {/* 이미지 업로드 & URL 입력 */}
      <div
        style={{
          border: "1px dashed #bbb",
          borderRadius: 4,
          padding: 12,
          textAlign: "center",
          marginBottom: 8,
          background: "#fafbfc",
        }}
        onDrop={handleDrop}
        onDragOver={e => e.preventDefault()}
      >
        <input
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          id="image-upload"
          onChange={handleFileChange}
        />
        <label htmlFor="image-upload" style={{ cursor: "pointer" }}>
          이미지 파일을 드래그하거나 클릭해서 선택하세요
        </label>
        <div style={{ margin: "8px 0" }}>또는</div>
        <input
          className={styles.input}
          placeholder="이미지 URL을 입력하세요"
          value={imageFile ? "" : imageUrl}
          onChange={handleImageUrlInput}
        />
        {/* 미리보기 */}
        {imageUrl && (
          <Image
            width={(120)}
            height={(120)}
            src={imageUrl}
            alt="미리보기"
            style={{ display: "block", margin: "8px auto" }}
          />
        )}
      </div>
      <input
        className={styles.input}
        placeholder="설명"
        value={description}
        onChange={e => setDescription(e.target.value)}
      />
      {/* 추천 키워드 입력 */}
      <div style={{ marginBottom: 8 }}>
        <input
          className={styles.input}
          placeholder="#키워드 입력 후 엔터"
          value={keywordInput}
          onChange={handleKeywordInput}
          onKeyDown={handleKeywordKeyDown}
        />
        <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginTop: 4 }}>
          {keywords.map((kw, idx) => (
            <span
              key={kw}
              style={{
                background: "#e3e6f0",
                borderRadius: 12,
                padding: "2px 10px",
                marginRight: 4,
                display: "flex",
                alignItems: "center",
                fontSize: 14,
              }}
            >
              #{kw}
              <button
                type="button"
                onClick={() => handleRemoveKeyword(idx)}
                style={{
                  background: "none",
                  border: "none",
                  marginLeft: 4,
                  cursor: "pointer",
                  fontWeight: "bold",
                  color: "#888",
                }}
                aria-label="키워드 삭제"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      </div>
      <div style={{ position: "relative" }}>
        {/* 커스텀 placeholder */}
        {content.trim() === "" && (
          <div
            style={{
              position: "absolute",
              top: 8,
              left: 12,
              color: "var(--color-text-sub)",
              pointerEvents: "none",
              fontFamily: "'Pretendard', sans-serif",
              fontSize: 16,
              zIndex: 1,
            }}
          >
            내용을 입력하세요
          </div>
        )}
        <div
          className={styles.textarea}
          contentEditable
          ref={contentRef}
          onPaste={handlePaste}
          onInput={handleInput}
          style={{
            minHeight: 120,
            border: "1px solid #ddd",
            borderRadius: 4,
            padding: 8,
            fontFamily: "'Pretendard', sans-serif",
            color: "var(--color-text-main)",
            background: "transparent",
            position: "relative",
            zIndex: 2,
          }}
          suppressContentEditableWarning
        />
      </div>
      <button type="submit" className={styles.submit}>등록</button>
    </form>
  );
}