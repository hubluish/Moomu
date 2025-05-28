"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import "../../../../variable.css";

const TAB_LABELS = ["전체", "UI", "카드뉴스", "포스터", "용어사전", "트렌드"];
const TAB_PATHS = [
  "/article/all",
  "/article/ui",
  "/article/cardnews",
  "/article/poster",
  "/article/dictionary",
  "/article/trend",
];

export default function ArticleTabs() {
  const [activeTab, setActiveTab] = useState<number>(0);
  const router = useRouter();

  const handleTabClick = (idx: number) => {
    setActiveTab(idx);
    router.push(TAB_PATHS[idx]);
  };

  return (
    <div
      style={{
        display: "flex",
        height: "49px",
        alignItems: "center",
        gap: "12px",
        alignSelf: "stretch",
      }}
    >
      {TAB_LABELS.map((label, idx) => (
        <React.Fragment key={idx}>
          <button
            onClick={() => handleTabClick(idx)}
            style={{
              display: "flex",
              width: "110px",
              padding: "8px",
              flexDirection: "column",
              alignItems: "center",
              gap: "4px",
              borderRadius: "76px",
              background:
                activeTab === idx
                  ? "var(--main, #3D38F5)"
                  : "var(--button, rgba(61, 56, 245, 0.10))",
              border: "none",
              cursor: "pointer",
              transition: "background 0.2s",
            }}
          >
            <span
              className="body2"
              style={{
                overflow: "hidden",
                color: "#FFF",
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 1,
                alignSelf: "stretch",
                textAlign: "center",
                textOverflow: "ellipsis",
                whiteSpace: "normal",
              }}
            >
              {label}
            </span>
          </button>
          {idx === 0 && (
            <div
              style={{
                width: "1px",
                height: "38px",
                background: "#F1F3F5",
                margin: "0 6px",
              }}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}