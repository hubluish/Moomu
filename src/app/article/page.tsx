"use client";
import { Suspense } from "react";
import ArticleClient from "./ArticleClient";
import "@/styles/variable.css";

export default function ArticlePage() {
  return (
    <>
      <Suspense fallback={<div>로딩 중...</div>}>
        <ArticleClient />
      </Suspense>
    </>
  );
}
