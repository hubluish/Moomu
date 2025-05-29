"use client";

interface PagenationProps {
  pageCount: number;
  current: number;
  onChange: (idx: number) => void;
}

export default function Pagenation({ pageCount, current, onChange }: PagenationProps) {
  return (
    <div
      style={{
        display: "inline-flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "6.364px",
      }}
    >
      {Array.from({ length: pageCount }).map((_, idx) => (
        <button
          key={idx}
          onClick={() => onChange(idx)}
          style={{
            width: current === idx ? "31.818px" : "6.364px",
            height: "6.364px",
            borderRadius: "159.091px",
            background: "#DEDEDE",
            border: "none",
            padding: 0,
            cursor: "pointer",
            aspectRatio: "6.36 / 6.36",
            transition: "width 0.2s, background 0.2s",
          }}
          aria-label={`페이지 ${idx + 1}`}
        />
      ))}
    </div>
  );
}