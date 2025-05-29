"use client";
import "../../../../variable.css";

const TAB_LABELS = ["전체", "UI", "카드뉴스", "포스터", "용어사전", "트렌드"];

interface TabProps {
  activeTab: number;
  setActiveTab: (idx: number) => void;
}

export default function Tab({ activeTab, setActiveTab }: TabProps) {
  return (
    <div style={{ width: "100%" }}>
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
          <button
            key={label}
            onClick={() => setActiveTab(idx)}
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
              color: "#fff",
              fontWeight: activeTab === idx ? "bold" : "normal",
              transition: "background 0.2s",
            }}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}