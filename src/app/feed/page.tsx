
'use client';
import { Suspense } from 'react';
import FeedClient from "./FeedClient";

import "@/styles/variable.css";

export default function FeedPage() {
  return (
    <>
      <Suspense fallback={<div>로딩 중...</div>}>
        <FeedClient />
      </Suspense>
    </>
  );
}
