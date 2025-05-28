"use client";

import React, { useState } from "react";

const PAGE_COUNT = 5;

export default function Pagenation() {
  const [current, setCurrent] = useState(0);

  return (
    <div
      style={{
        display: "inline-flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "6.364px",
      }}
    >
      {Array.from({ length: PAGE_COUNT }).map((_, idx) => (
        <button
          key={idx}
          onClick={() => setCurrent(idx)}
          style={{
            width: current === idx ? "31.818px" : "6.364px",
            height: "6.364px",
            borderRadius: "159.091px",
            background: current === idx ? "#FFF" : "#DEDEDE",
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