"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Mypage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/HomeIntro"); // ✅ 클라이언트에서 리디렉트
  }, []);

  return null;
}
