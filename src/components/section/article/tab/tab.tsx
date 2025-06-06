"use client";
import styles from "./tab.module.css";

const TAB_LABELS = ["전체", "UI", "카드뉴스", "포스터", "용어사전", "트렌드"];

interface TabProps {
  activeTab: number;
  setActiveTab: (idx: number) => void;
}

export default function Tab({ activeTab, setActiveTab }: TabProps) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.tabRow}>
        {TAB_LABELS.map((label, idx) => (
          <button
            key={label}
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