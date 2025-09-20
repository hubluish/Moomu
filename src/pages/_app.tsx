import "@/app/globals.css";
import Header from "@/components/common/header/header";
import Bottom from "@/components/common/bottom/bottom";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const isHomeIntro = router.pathname === "/homeIntro";

  return (
    <>
      {!isHomeIntro && <Header />}
      <Component {...pageProps} />
      {!isHomeIntro && <Bottom />}
    </>
  );
}
