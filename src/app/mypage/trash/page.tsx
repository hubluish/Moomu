"use client";

import Sidebar from "@/components/section/mypage/Sidebar";
import React from "react";

const TrashPage = () => {
  return (
    <div>
      <div style={{ display: "flex" }}>
        <Sidebar />

        <main style={{ flex: 1, padding: "50px 70px" }}>
          <h1>휴지통</h1>
        </main>
      </div>
    </div>
  );
};

export default TrashPage;
