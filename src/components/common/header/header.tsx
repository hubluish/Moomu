"use client";

import React, { useState, useEffect } from "react";
import LoginModal from "../Login/LoginModal";
import HeaderModal from "../headermodal/headermodal";
import { useRouter, usePathname } from "next/navigation";
import { supabase } from "@/utils/supabase";
import Image from "next/image";
import {
  HeaderWrapper,
  LogoSection,
  LogoImg,
  LogoName,
  Nav,
  NavLink,
  RightSection,
  LoginButton,
  AccountWrapper,
  Avatar,
  NavFrame,
  MenuButton,
} from "./header.styled";

const LOGO_SRC = "/assets/icons/headerLogo.png";
const AVATAR_LIGHT = "/assets/icons/headerId-light.png";
const AVATAR_DARK = "/assets/icons/headerId-dark.png";

const NAV_ITEMS = [
  { href: "/feed", label: "Explore Feeds" },
  { href: "/article", label: "Article" },
  { href: "/generate", label: "Generate Moodboard" },
];

const getMode = (bg: string, loggedIn: boolean) => {
  if (bg === "dark") return loggedIn ? "dark-logged" : "dark";
  return loggedIn ? "light-logged" : "light";
};

function detectBgMode(path: string) {
  if (path === "/" || path === "/result") {
    return "dark";
  }

  if (
    ["/feed", "/article", "/generate", "/planupgrade"].includes(path) ||
    path.startsWith("/mypage") ||
    path.startsWith("/settings")
  ) {
    return "light";
  }

  return "dark";
}

export default function Header() {
  const pathname = usePathname() ?? "";
  const router = useRouter();
  const [showDropdown, setShowDropdown] = useState(false); // 데스크톱 드롭다운 상태
  const [showMobileMenu, setShowMobileMenu] = useState(false); // 모바일 사이드바 상태
  const [isMobile, setIsMobile] = useState(false); // 모바일 여부
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [mode, setMode] = useState("dark");
  const [hasNotification, setHasNotification] = useState(false);

  useEffect(() => {
    if (pathname !== null) {
      setMode(detectBgMode(pathname));
    }
  }, [pathname]);

  useEffect(() => {
    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session) {
        setIsLoggedIn(true);
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
      }
    };
    getSession();
  }, []);

  useEffect(() => {
    const checkNotifications = async () => {
      if (isLoggedIn) {
        setHasNotification(true);
      }
    };
    checkNotifications();
  }, [isLoggedIn]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 900);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLoginClick = () => setIsModalOpen(true);
  const handleCloseLoginModal = () => setIsModalOpen(false);

  const handleCloseHeaderModal = () => {
    setShowDropdown(false);
    setShowMobileMenu(false);
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    handleCloseHeaderModal();
    if (error) alert("로그아웃에 실패했습니다. 다시 시도해 주세요.");
    setShowDropdown(false);
    window.location.reload();
  };

  const headerMode = getMode(mode, isLoggedIn);
  const avatarSrc = headerMode.startsWith("dark") ? AVATAR_DARK : AVATAR_LIGHT;

  if (pathname === "/feed/preview") return null;

  return (
    <HeaderWrapper $mode={headerMode}>
      <LogoSection>
        <LogoImg
          src={LOGO_SRC}
          alt="로고"
          style={{ cursor: "pointer" }}
          onClick={() => router.push("/")}
        />
        <LogoName
          $mode={headerMode}
          style={{ cursor: "pointer" }}
          onClick={() => router.push("/")}
        >
          Moomu
        </LogoName>
      </LogoSection>

      <NavFrame>
        <Nav>
          {NAV_ITEMS.map(({ href, label }) => (
            <NavLink
              key={href}
              href={href}
              $active={pathname === href}
              $mode={headerMode}
            >
              {label}
            </NavLink>
          ))}
        </Nav>
        <RightSection>
          {isLoggedIn ? (
            <AccountWrapper>
              <Avatar
                src={avatarSrc}
                alt="계정"
                onClick={() => setShowDropdown((prev) => !prev)}
              />
            </AccountWrapper>
          ) : (
            <LoginButton $mode={headerMode} onClick={handleLoginClick}>
              로그인/회원가입
            </LoginButton>
          )}
        </RightSection>
      </NavFrame>

      <MenuButton onClick={() => setShowMobileMenu(true)}>
        <Image
          src={
            headerMode.startsWith("dark")
              ? "/assets/icons/menu-dark-icon.svg"
              : "/assets/icons/menu-light-icon.svg"
          }
          alt="메뉴"
          width={28}
          height={28}
        />
      </MenuButton>

      {isLoggedIn && (
        <HeaderModal
          isOpen={isMobile ? showMobileMenu : showDropdown} // 👈 열림 상태 전달
          isMobile={isMobile}
          userName={userName}
          hasNotification={hasNotification}
          onLogout={handleLogout}
          onClose={handleCloseHeaderModal}
        />
      )}

      <LoginModal isOpen={isModalOpen} onClose={handleCloseLoginModal} />
    </HeaderWrapper>
  );
}
