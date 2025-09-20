import "@/app/globals.css";
import Header from "@/components/common/header/header";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <>
      <Header />
      <Component {...pageProps} />
    </>
  );
}
