"use client";
import { useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/utils/supabase";

export default function MypageLayout({ children }: { children: ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) {
        // 세션이 없으면 로그인 페이지나 홈으로 리디렉션
        alert("로그인이 필요한 서비스입니다.");
        router.push("/"); // 홈으로 보냅니다.
      }
    };
    checkUser();
  }, [router]);

  // 로그인 상태가 확인될 때까지 로딩 상태를 보여줄 수 있습니다.
  // ...

  return <>{children}</>;
}
