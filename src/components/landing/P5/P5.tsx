import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/utils/supabase";

interface P5Props {
  openLoginModal?: () => void;
}
import "./P5.css";

const P5 = ({ openLoginModal }: P5Props) => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session) {
        setIsLoggedIn(true);
      }
    };
    checkLoginStatus();
  }, []);

  const handleStartClick = () => {
    if (isLoggedIn) {
      router.push("/generate");
    } else {
      openLoginModal?.();
    }
  };

  return (
    <section className="section">
      <div className="title">
        <h2 className="cta-title">당신의 아이디어가 멈추지 않도록,</h2>
        <h2 className="cta-title">
          <span className="oo">oo</span> 와 함께 시작하세요!
        </h2>
      </div>

      <div className="BtnContainer gradient-button">
        <button className="BtnText gradient-button" onClick={handleStartClick}>
          지금 바로 시작하기
        </button>
      </div>
    </section>
  );
};

export default P5;
