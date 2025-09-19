"use client";
import { useEffect, ReactNode, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/utils/supabase";
import ConfirmModal from "@/components/common/ConfirmModal/ConfirmModal";

export default function MypageLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) {
        setIsModalOpen(true);
      }
    };
    checkUser();
  }, []);

  const handleConfirm = () => {
    setIsModalOpen(false);
    router.push("/");
  };

  return (
    <>
      {children}
      <ConfirmModal
        isOpen={isModalOpen}
        onClose={handleConfirm}
        onConfirm={handleConfirm}
        title="로그인이 필요한 서비스입니다."
        confirmText="확인"
        hideCancel={true}
      />
    </>
  );
}
