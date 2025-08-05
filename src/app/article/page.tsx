'use client';
import { Suspense } from 'react';
import ArticleClient from "./ArticleClient";
import Header from "@/components/common/header/header";
import "@/styles/variable.css";

export default function ArticlePage() {
  return (
    <>
      <Header />
      <Suspense fallback={<div>로딩 중...</div>}>
        <ArticleClient />
      </Suspense>
    </>
  );
}