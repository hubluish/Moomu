import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/common/header/header";
import Script from "next/script";

import StyledComponentsRegistry from "@/components/common/registry/registry";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Moomu",
  description: "Moomu",
  icons: {
    icon: [{ url: "data:," }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const G_TAG_ID = "G-V50JJSBVK4";
  const GTM_ID = "GTM-M9QNXDRV";

  return (
    <html lang="en">
      {/* Google Analytics - Next.js Script 컴포넌트 사용 */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${G_TAG_ID}`}
      />
      
      <Script
        id="google-analytics-config"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${G_TAG_ID}', {
              send_page_view: true
            });
          `,
        }}
      />
      {/* Google Tag Manager - load as early as possible in head */}
      <Script id="gtm-init" strategy="beforeInteractive">
        {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'? '&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');`}
      </Script>
      
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {/* Google Tag Manager (noscript) - immediately after opening body */}
        <noscript>
          <iframe src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`} height="0" width="0" style={{display: 'none', visibility: 'hidden'}} />
        </noscript>
        <StyledComponentsRegistry>
          <div style={{ position: "relative", zIndex: 30 }}>
            <Header />
          </div>
          {children}
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
