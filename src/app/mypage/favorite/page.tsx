"use client";

import Sidebar from "@/components/section/mypage/Sidebar";
import React from "react";

const FavoritePage = () => {
  return (
    <div>
      <div style={{ display: "flex" }}>
        <Sidebar />

        <main style={{ flex: 1, padding: "50px 70px" }}>
          <h1>찜한 피드</h1>
        </main>
      </div>
    </div>
  );
};

export default FavoritePage;
