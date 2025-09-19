
'use client';
import { Suspense } from 'react';
import FeedClient from "./FeedClient";
import Header from "@/components/common/header/header";
import "@/styles/variable.css";

export default function FeedPage() {
  return (
    <>
      <Header />
      <Suspense fallback={<div>로딩 중...</div>}>
        <FeedClient />
      </Suspense>
    </>
  );
}
