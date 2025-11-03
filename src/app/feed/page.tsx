
'use client';
import { Suspense } from 'react';
import FeedClient from "./FeedClient";
import Footer from "@/components/common/footer/Footer";
import Script from "next/script";

import "@/styles/variable.css";
import BannerResponsive from '@/components/adfit/BannerResponsive';

export default function FeedPage() {
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
        <FeedClient />
      </Suspense>
      <BannerResponsive />
      <Footer />
    </>
  );
}
