"use client";
import styles from "./tab.module.css";
import { useEffect, useRef } from "react";
import gsap from "gsap";

const TAB_LABELS = ["전체", "UI", "카드뉴스", "포스터", "용어사전", "트렌드"];

interface TabProps {
  activeTab: number;
  setActiveTab: (idx: number) => void;
}

export default function Tab({ activeTab, setActiveTab }: TabProps) {
  const btnRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    if (btnRefs.current[activeTab]) {
      gsap.fromTo(
        btnRefs.current[activeTab],
        { y: 10, opacity: 0.5 },
        { y: 0, opacity: 1, duration: 0.4, ease: "power2.out" }
      );
    }
  }, [activeTab]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.tabRow}>
        {TAB_LABELS.map((label, idx) => (
          <button
            key={label}
            ref={el => { btnRefs.current[idx] = el; }}
            className={`${styles.tabBtn} ${activeTab === idx ? styles.active : ""}`}
            onClick={() => setActiveTab(idx)}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}