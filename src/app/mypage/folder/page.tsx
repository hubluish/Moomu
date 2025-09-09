"use client";

import Sidebar from "@/components/section/mypage/Sidebar";
import React from "react";

const FolderPage = () => {
  return (
    <div>
      <div style={{ display: "flex" }}>
        <Sidebar />

        <main style={{ flex: 1, padding: "50px 70px" }}>
          <h1>내 폴더</h1>
        </main>
      </div>
    </div>
  );
};

export default FolderPage;
