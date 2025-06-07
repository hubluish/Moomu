import React, { useState } from "react";
import styles from "./dropdown.module.css";
import Image from "next/image";

const OPTIONS = ["추천순", "최신순", "인기순"];

// props 타입 명시
interface DropdownProps {
  value: string;
  onChange: (value: string) => void;
}

export default function Dropdown({ value, onChange }: DropdownProps) {
  const [open, setOpen] = useState(false);
  return (
    <div className={styles.dropdown} tabIndex={0} onBlur={() => setOpen(false)}>
      <div className={styles.selected} onClick={() => setOpen(!open)}>
        <Image 
          width={14}
          height={18}
          src="/assets/icons/down.svg"
          className={`${styles.icon} ${open ? styles.open : ""}`}
          alt="arrow"
        />
        <span className={styles.text}>{value}</span>
      </div>
      {open && (
        <div className={styles.options}>
          {OPTIONS.map(opt => (
            <div
              key={opt}
              className={styles.option}
              onClick={() => {
                onChange(opt);
                setOpen(false);
              }}
            >
              {opt}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}