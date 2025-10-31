import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/utils/supabase";
import Image from "next/image";
import "./P1.css";

interface P1Props {
  openLoginModal?: () => void;
}

const P1 = ({ openLoginModal }: P1Props) => {
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

  const images = [
    "/assets/carousel/img1.png",
    "/assets/carousel/img2.png",
    "/assets/carousel/img3.png",
    "/assets/carousel/img4.png",
    "/assets/carousel/img5.png",
    "/assets/carousel/img6.png",
    "/assets/carousel/img7.png",
    "/assets/carousel/img8.png",
  ];

  const loopImages = [...images, ...images];

  return (
    <section className="P1">
      <div className="P1-title-container">
        <div className="p1-subtitle">누구나 디자인을 쉽게</div>
        <div className="p1-title">Moomu</div>
      </div>

      <div className="image-gallery">
        <div className="image-track">
          {loopImages.map((src, idx) => (
            <div className="image-slide" key={idx}>
              <Image
                src={src}
                alt={`image${(idx % images.length) + 1}`}
                fill
                objectFit="cover"
                draggable={false}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // 최적화를 위한 sizes prop
              />
            </div>
          ))}
        </div>
      </div>

      <div className="p1-description">
        <div className="p1-description-container">
          <p className="description">
            무한한 아이디어를 시각화하는 무드보드 제작 서비스, Moomu
          </p>
        </div>

        <div className="BtnContainer gradient-button">
          <button
            className="BtnText gradient-button"
            onClick={handleStartClick}
          >
            지금 바로 시작하기
          </button>
        </div>
      </div>
    </section>
  );
};

export default P1;
