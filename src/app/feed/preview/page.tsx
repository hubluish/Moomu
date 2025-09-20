"use client";

import React, { Suspense } from "react";
import FeedPreviewContent from "./FeedPreviewContent";

export default function FeedPreviewPage() {
  return (
    <Suspense fallback={<div>Loading preview...</div>}>
      <FeedPreviewContent />
    </Suspense>
  );
}