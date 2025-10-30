"use client";

import "@/app/globals.css";
import LandingPage from "@/pages/landing/LandingPage";
import Script from "next/script";

export default function Home() {
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
          gtag('config', 'G-V50JJSBVK4', {
            page_title: 'Moomu 홈페이지',
            page_location: window.location.href,
            send_page_view: true
          });
          
          // 페이지 로드 이벤트
          gtag('event', 'page_view', {
            page_title: 'Moomu 홈페이지',
            page_location: window.location.href
          });
          
          console.log('GA initialized for 홈페이지');
        `}
      </Script>
      <LandingPage />
    </>
  );
}
