
"use client";
import React, { useState } from "react";
import Image from "next/image";
import styles from "./SearchBar.module.css";

interface SearchBarProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearch?: () => void;
  placeholder?: string;
}

export default function SearchBar({ 
    value, 
    onChange, 
    onSearch, 
    placeholder = "Search" 
}: SearchBarProps) {
  const [isFocused, setIsFocused] = useState(false);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && onSearch) {
      onSearch();
    }
  };

  const showPlaceholder = !isFocused && value === "";

  return (
    <div className={styles.searchWrapper}>
      <Image 
        src="/assets/icons/search.svg" 
        alt="Search Icon" 
        width={24} 
        height={24} 
        className={styles.searchIcon} 
        onClick={onSearch}
      />
      {showPlaceholder && <div className={styles.placeholder}>{placeholder}</div>}
      <input
        type="search"
        value={value}
        onChange={onChange}
        onKeyDown={handleKeyDown}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={styles.searchInput}
        aria-label="Search content"
      />
    </div>
  );
}
