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
      
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
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
