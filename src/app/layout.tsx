// src/app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "../styles/variable.css";

export const metadata = {
  title: 'Moomu',
  description: 'Moomu App',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (

    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children} {/* Sidebar와 Bottom은 page.tsx에서 렌더링 */}
      </body>
    </html>
  );
}
