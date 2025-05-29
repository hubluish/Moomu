"use client";
import React from "react";
import styles from "./SearchField.module.css";
import Image from "next/image";

interface SearchFieldProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

export default function SearchField({
  value,
  onChange,
  placeholder = "제목으로 검색해주세요",
}: SearchFieldProps) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.textField}>
        <input
          className={styles.input}
          type="text"
          value={value}
          onChange={onChange}
          placeholder=""
        />
        <span className={styles.placeholder}>{placeholder}</span>
        <span className={styles.icon}>
          <Image src="/search.svg" alt="검색" width={20} height={20} />
        </span>
      </div>
    </div>
  );
}