"use client";

import React, { useState, useEffect } from "react";
import LoginModal from "../Login/LoginModal";
import AlarmModal from "../headerAlarm/AlarmModal";
import { useRouter, usePathname } from "next/navigation";
import { supabase } from "@/utils/supabase";
import { useAlarms } from "@/hooks/useAlarms";
import styles from "./Header.module.css";

// Constants
const LOGO_SRC = "/assets/icons/headerLogo.png";
const AVATAR_LIGHT = "/assets/icons/headerId-light.png";
const AVATAR_DARK = "/assets/icons/headerId-dark.png";

const NAV_ITEMS = [
  { href: "/feed", label: "Explore Feeds" },
  { href: "/article", label: "Article" },
  { href: "/generate/generate", label: "Generate Moodboard" },
] as const;

type BgMode = "light" | "dark";

// Utilities
const getHeaderModeClass = (bgMode: BgMode, isLoggedIn: boolean): string => {
  const baseMode = bgMode === "dark" ? "dark" : "light";
  return isLoggedIn ? `${baseMode}-logged` : baseMode;
};

const getNavLinkClass = (isActive: boolean, mode: string): string => {
  const classes = [styles.navLink];
  if (isActive) classes.push(styles.active);
  if (mode.startsWith("dark")) classes.push(styles.dark);
  else classes.push(styles.light);
  return classes.join(" ");
};

const detectBackgroundMode = (): BgMode => {
  if (typeof window === "undefined") return "dark";
  
  const elementsToCheck = [
    document.documentElement,
    document.body,
    document.querySelector('.app'),
    document.querySelector('main'),
    document.querySelector('[class*="container"]'),
    document.querySelector('[class*="page"]'),
    document.querySelector('[class*="landing"]'),
  ].filter(Boolean);
  
  for (const element of elementsToCheck) {
    if (element && isDarkBackground(element)) {
      return "dark";
    }
  }
  
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
};

const isDarkBackground = (element: Element): boolean => {
  const computedStyle = window.getComputedStyle(element);
  const bgColor = computedStyle.backgroundColor;
  const bgImage = computedStyle.backgroundImage;
  
  if (bgColor && bgColor !== "transparent" && bgColor !== "rgba(0, 0, 0, 0)") {
    const rgbMatch = bgColor.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
    if (rgbMatch) {
      const [, r, g, b] = rgbMatch.map(Number);
      const brightness = (r * 299 + g * 587 + b * 114) / 1000;
      return brightness < 128;
    }
  }
  
  if (bgImage && bgImage !== "none" && bgImage.includes("gradient")) {
    const colorMatches = bgImage.match(/#([0-9A-Fa-f]{6})|rgb\((\d+),\s*(\d+),\s*(\d+)\)/g);
    
    if (colorMatches && colorMatches.length > 0) {
      let totalBrightness = 0;
      let validColors = 0;
      
      for (const colorMatch of colorMatches) {
        let r, g, b;
        
        if (colorMatch.startsWith('#')) {
          const hex = colorMatch.replace('#', '');
          r = parseInt(hex.substr(0, 2), 16);
          g = parseInt(hex.substr(2, 2), 16);
          b = parseInt(hex.substr(4, 2), 16);
        } else {
          const rgbMatch = colorMatch.match(/(\d+),\s*(\d+),\s*(\d+)/);
          if (rgbMatch) {
            [, r, g, b] = rgbMatch.map(Number);
          }
        }
        
        if (r !== undefined && g !== undefined && b !== undefined) {
          const brightness = (r * 299 + g * 587 + b * 114) / 1000;
          totalBrightness += brightness;
          validColors++;
        }
      }
      
      if (validColors > 0) {
        const avgBrightness = totalBrightness / validColors;
        return avgBrightness < 128;
      }
    }
  }
  
  return false;
};

// Custom Hooks
const useBackgroundMode = (pathname: string | null) => {
  const [mode, setMode] = useState<BgMode>("dark");
  
  useEffect(() => {
    const updateMode = () => {
      const detectedMode = detectBackgroundMode();
      setMode(detectedMode);
    };
    
    updateMode();
    
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    mediaQuery.addEventListener("change", updateMode);
    
    const observer = new MutationObserver(() => {
      setTimeout(updateMode, 200);
    });
    
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ['style', 'class'],
      childList: true,
      subtree: true
    });
    
    return () => {
      mediaQuery.removeEventListener("change", updateMode);
      observer.disconnect();
    };
  }, [pathname]);
  
  return mode;
};

const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState<string | undefined>(undefined);
  
  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session) {
        setIsLoggedIn(true);
        setUserId(session.user.id);
        
        const { data: profile } = await supabase
          .from("profiles")
          .select("name")
          .eq("id", session.user.id)
          .single();
        
        if (profile?.name) {
          setUserName(profile.name);
        } else if (session.user.user_metadata?.full_name) {
          setUserName(session.user.user_metadata.full_name);
        }
      } else {
        setIsLoggedIn(false);
        setUserName("");
        setUserId(undefined);
      }
    };
    
    getSession();
  }, []);
  
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      alert("로그아웃에 실패했습니다. 다시 시도해 주세요.");
    } else {
      window.location.reload();
    }
  };
  
  return { isLoggedIn, userName, userId, handleLogout };
};

// Main Component
export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  
  const bgMode = useBackgroundMode(pathname);
  const { isLoggedIn, userName, userId, handleLogout } = useAuth();
  
  // 알림 데이터 가져오기
  const { alarms, markAsRead } = useAlarms(userId);
  
  const [showDropdown, setShowDropdown] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(false);
  const [isScrolledPastHeader, setIsScrolledPastHeader] = useState(false);
  const [isAlarmModalOpen, setIsAlarmModalOpen] = useState(false);
  
  const headerMode = getHeaderModeClass(bgMode, isLoggedIn);
  const avatarSrc = headerMode.startsWith("dark") ? AVATAR_DARK : AVATAR_LIGHT;
  
  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const headerHeight = 64; // Header height in pixels
      
      // Check if user has scrolled past the header
      if (scrollY > headerHeight) {
        setIsScrolledPastHeader(true);
      } else {
        setIsScrolledPastHeader(false);
        setIsHeaderVisible(false); // Hide hover header when back at top
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    // Check initial scroll position
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  const handleLogoClick = () => router.push("/");
  const handleLoginClick = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  const handleAvatarClick = () => {
    // 알림 모달 열기
    setIsAlarmModalOpen(true);
    setShowDropdown(false);
  };
  
  const handleCloseAlarmModal = () => {
    // 모달 닫을 때 안 읽은 알림들 읽음 처리
    const unreadAlarmIds = alarms
      .filter(alarm => !alarm.isRead)
      .map(alarm => alarm.id);
    
    if (unreadAlarmIds.length > 0) {
      markAsRead(unreadAlarmIds);
    }
    
    setIsAlarmModalOpen(false);
  };
  const handleLogoutClick = () => {
    handleLogout();
    setShowDropdown(false);
  };

  // Header visibility handlers (only active when scrolled past header)
  const handleMouseEnter = () => {
    if (isScrolledPastHeader) {
      setIsHeaderVisible(true);
    }
  };

  const handleMouseLeave = () => {
    if (isScrolledPastHeader) {
      setIsHeaderVisible(false);
      setShowDropdown(false); // Close dropdown when header hides
    }
  };
  
  return (
    <>
      {/* Invisible trigger area - only active when scrolled */}
      <div 
        className={`${styles.headerTrigger} ${isScrolledPastHeader ? styles.active : ''}`}
        onMouseEnter={handleMouseEnter}
      />
      
      {/* Header */}
      <header 
        className={`${styles.headerWrapper} ${styles[headerMode]} ${
          isScrolledPastHeader ? styles.fixedMode : ''
        } ${isScrolledPastHeader && isHeaderVisible ? styles.visible : ''}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className={styles.logoSection} onClick={handleLogoClick}>
          <img src={LOGO_SRC} alt="로고" className={styles.logoImg} />
          <span className={styles.logoName}>Moomu</span>
        </div>
        
        <div className={styles.navFrame}>
          <nav className={styles.nav}>
            {NAV_ITEMS.map(({ href, label }) => (
              <a
                key={href}
                href={href}
                className={getNavLinkClass(pathname === href, headerMode)}
              >
                {label}
              </a>
            ))}
          </nav>
          
          <div className={styles.rightSection}>
            {isLoggedIn ? (
              <div className={styles.accountWrapper}>
                <img
                  src={avatarSrc}
                  alt="계정"
                  className={styles.avatar}
                  onClick={handleAvatarClick}
                />
                {userName && <span className={styles.userName}>{userName}</span>}
                
                {showDropdown && (
                  <div className={`${styles.dropdown} ${styles[headerMode]}`}>
                    <a href="/mypage/moodboard" className={styles.dropdownItem}>
                      마이페이지
                    </a>
                    <button onClick={handleLogoutClick} className={styles.dropdownButton}>
                      로그아웃
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button 
                className={`${styles.loginButton} ${styles[headerMode]}`}
                onClick={handleLoginClick}
              >
                로그인/회원가입
              </button>
            )}
          </div>
        </div>
        
        <LoginModal isOpen={isModalOpen} onClose={handleCloseModal} />
        <AlarmModal 
          isOpen={isAlarmModalOpen} 
          onClose={handleCloseAlarmModal} 
          alarms={alarms} 
        />
      </header>
    </>
  );
}
