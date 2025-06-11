"use client";
import React from "react";
import styles from "./SearchField.module.css";
import Image from "next/image";

interface SearchFieldProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearch?: () => void;
  placeholder?: string;
}

export default function SearchField({
  value,
  onChange,
  onSearch,
  placeholder = "제목으로 검색해주세요",
}: SearchFieldProps) {
  // 엔터키 입력 시 검색 실행
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && onSearch) onSearch();
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.textField}>
        <input
          className={styles.input}
          type="text"
          value={value}
          onChange={onChange}
          onKeyDown={handleKeyDown}
          placeholder=""
        />
        {/* 입력창에 포커스 없을 때 보여지는 플레이스홀더 */}
        <span className={styles.placeholder}>{placeholder}</span>
        {/* 검색 아이콘 클릭 시 검색 실행 */}
        <span className={styles.icon} onClick={onSearch}>
          <Image src="/assets/icons/search.svg" alt="검색" width={20} height={20} />
        </span>
      </div>
    </div>
  );
}