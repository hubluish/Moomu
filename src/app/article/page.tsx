"use client";
import { Suspense } from "react";
import ArticleClient from "./ArticleClient";
import Footer from "@/components/common/footer/Footer";
import "@/styles/variable.css";
import Script from "next/script";

export default function ArticlePage() {
  return (
    <>
      {/* Google Analytics */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-V50JJSBVK4"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-V50JJSBVK4');
        `}
      </Script>
      <Suspense fallback={<div>로딩 중...</div>}>
        <ArticleClient />
        <Footer />
      </Suspense>
    </>
  );
}
