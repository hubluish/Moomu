import "@/app/globals.css";
import Header from "@/components/common/header/header";
import Footer from "@/components/common/footer/Footer";
import type { AppProps } from "next/app";
export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}
