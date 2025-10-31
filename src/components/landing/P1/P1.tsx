import React, { useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/utils/supabase";

interface P1Props {
  openLoginModal?: () => void;
}
import "./P1.css";
import "./P1.mobile.css";

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
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [cardWidth, setCardWidth] = useState(300); // desktop default width
  const [containerH, setContainerH] = useState(180); // desktop default height
  const [gap, setGap] = useState(10); // desktop default gap

  const loopImages = [...images, ...images, ...images];

  const [offset, setOffset] = useState(0);
  const rafRef = useRef<number | null>(null);
  const lastTsRef = useRef<number | null>(null);
  const speedPxPerSec = 120;

  // Compute responsive sizes: desktop = rectangle (as-is), mobile = square
  useEffect(() => {
    const computeSizes = () => {
      const vw = window.innerWidth;
      const width = containerRef.current?.clientWidth || vw;
      const mobile = vw < 768;
      setIsMobile(mobile);
      if (mobile) {
        const size = Math.max(88, Math.min(140, Math.round(width * 0.24)));
        const g = Math.max(6, Math.min(12, Math.round(size * 0.08)));
        setCardWidth(size);
        setContainerH(size);
        setGap(g);
      } else {
        setCardWidth(300);
        setContainerH(180);
        setGap(10);
      }
    };
    computeSizes();
    window.addEventListener("resize", computeSizes);
    return () => window.removeEventListener("resize", computeSizes);
  }, []);

  useEffect(() => {
    const track = images.length * (cardWidth + gap);
    const loop = (ts: number) => {
      if (lastTsRef.current == null) lastTsRef.current = ts;
      const dt = (ts - lastTsRef.current) / 1000;
      lastTsRef.current = ts;
      setOffset((prev) => {
        let next = prev + speedPxPerSec * dt;
        if (next >= track) next -= track;
        return next;
      });
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      lastTsRef.current = null;
    };
  }, [images.length, cardWidth, gap]);

  return (
    <section className="P1">
      <div className="P1-title-container">
        <div className="p1-subtitle">누구나 디자인을 쉽게</div>
        <div className="p1-title">Moomu</div>
      </div>

      <div
        className="image-gallery"
        ref={containerRef}
        style={{
          position: "relative",
          height: `${containerH}px`,
          margin: "0 auto",
          overflow: "hidden",
          borderRadius: "16px",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: `${gap}px`,
            transition: "none",
            transform: `translateX(-${offset}px)`,
            height: "100%",
            willChange: "transform",
          }}
        >
          {loopImages.map((src, idx) => (
            <div
              key={idx}
              style={{
                width: `${cardWidth}px`,
                height: "100%",
                flexShrink: 0,
                borderRadius: isMobile ? "16px" : "12px",
                overflow: "hidden",
                background: "#ddd",
              }}
            >
              <img
                src={src}
                alt={`image${(idx % images.length) + 1}`}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                draggable={false}
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
