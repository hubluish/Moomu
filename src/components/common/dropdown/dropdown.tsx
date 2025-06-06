import React, { useState } from "react";
import styles from "./dropdown.module.css";

const OPTIONS = ["추천순", "최신순", "인기순"];

export default function Dropdown({ value, onChange }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={styles.dropdown} tabIndex={0} onBlur={() => setOpen(false)}>
      <div className={styles.selected} onClick={() => setOpen(!open)}>
        <img src="/assets/icons/arrow.svg" className={styles.icon} alt="arrow" />
        <span className={styles.text}>{value}</span>
      </div>
      {open && (
        <div className={styles.options}>
          {OPTIONS.map(opt => (
            <div key={opt} className={styles.option} onClick={() => { onChange(opt); setOpen(false); }}>
              {opt}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}