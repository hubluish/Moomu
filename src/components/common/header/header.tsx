"use client";

import styled from "styled-components";
import React, { useState, useEffect } from "react";
import LoginModal from "../Login/LoginModal";
import HeaderModal from "../headermodal/headermodal";
import { useRouter, usePathname } from "next/navigation";
import { supabase } from "@/utils/supabase";

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
} from "./header.styled";

// 로고/아이콘 경로
const NavFrame = styled.div`
  display: flex;
  align-items: center;
  gap: 32px;
`;

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
  const pathname = usePathname();
  const router = useRouter(); // 최상단에서 선언
  const [showDropdown, setShowDropdown] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [mode, setMode] = useState("dark");
  const [hasNotification, setHasNotification] = useState(false); // 알림 유무 예시 상태

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

  const handleLoginClick = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) alert("로그아웃에 실패했습니다. 다시 시도해 주세요.");
    setShowDropdown(false);
    window.location.reload();
  };

  const headerMode = getMode(mode, isLoggedIn);
  const avatarSrc = headerMode.startsWith("dark") ? AVATAR_DARK : AVATAR_LIGHT;

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

              {showDropdown && (
                <HeaderModal
                  userName={userName}
                  hasNotification={hasNotification}
                  onLogout={handleLogout}
                  onClose={() => setShowDropdown(false)}
                />
              )}
            </AccountWrapper>
          ) : (
            <LoginButton $mode={headerMode} onClick={handleLoginClick}>
              로그인/회원가입
            </LoginButton>
          )}
        </RightSection>
      </NavFrame>
      <LoginModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </HeaderWrapper>
  );
}
