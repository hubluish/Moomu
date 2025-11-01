'use client';
import { useEffect } from 'react';
import { redirect } from 'next/navigation';
import Script from 'next/script';

export default function Mypage() {
  useEffect(() => {
    redirect('/mypage/moodboard');
  }, []);

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
    </>
  );
} 