"use client";

import styled, { css } from "styled-components";
import React, { useState, useEffect } from "react";
import LoginModal from "../Login/LoginModal";
import { useRouter, usePathname } from "next/navigation";
import { supabase } from "@/utils/supabase";
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
const HeaderWrapper = styled.header<{ $mode: string }>`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100vw;
  height: 64px;
  padding: 0 32px;
  background: transparent;
  z-index: 100;
  ${(props) =>
    props.$mode.startsWith("dark")
      ? css`
          color: #fff;
        `
      : css`
          color: #222;
        `}
`;
const LogoSection = styled.div`
  display: flex;
  align-items: center;
`;
const LogoImg = styled.img`
  width: 40px;
  height: 40px;
  margin-right: 12px;
`;
const LogoName = styled.span`
  font-size: 25px;
  font-weight: 800;
  font-family: var(--font-family-logo, Pretendard);
  letter-spacing: -0.1em;
  height: 40px;
`;
const Nav = styled.nav`
  display: flex;
  gap: 32px;
  align-items: center;
`;
const NavLink = styled.a<{ $active: boolean; $mode: string }>`
  position: relative;
  text-decoration: none;
  font-size: 16px;
  color: ${({ $active, $mode }) =>
    $active
      ? $mode.startsWith("dark")
        ? "#6d63ff"
        : "#6d63ff"
      : $mode.startsWith("dark")
      ? "#fff"
      : "#222"};
  padding: 0 4px;
  transition: color 0.2s;
  &:hover {
    color: #6d63ff;
  }
`;
const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;
const LoginButton = styled.button<{ $mode: string }>`
  display: flex;
  padding: 10px 20px;
  justify-content: center;
  align-items: center;
  border-radius: 70px;
  background: ${({ $mode }) =>
    $mode.startsWith("dark")
      ? "linear-gradient(180deg, #3d38f5b3 16.41%, #dcbadb 385.64%)"
      : "linear-gradient(180deg, #6d63ff 16.41%, #dcbadb 385.64%)"};
  color: #fff;
  border: none;
  font-family: Pretendard;
  font-size: 16px;
  font-weight: 800;
  cursor: pointer;
  &:hover {
    background: #6d63ff;
  }
`;
const AccountWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;
const Avatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  cursor: pointer;
`;
const UserName = styled.span`
  margin-left: 10px;
  font-weight: bold;
`;
const Dropdown = styled.div<{ $mode: string }>`
  position: absolute;
  top: 48px;
  right: 0;
  background: ${({ $mode }) => ($mode.startsWith("dark") ? "#222" : "#fff")};
  border: 1px solid #eee;
  border-radius: 8px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  min-width: 165px;
  z-index: 10;
  padding: 8px 0;
`;
const DropdownItem = styled.a`
  display: block;
  width: 100%;
  padding: 10px 20px;
  color: #6d63ff;
  text-decoration: none;
  font-size: 15px;
  background: none;
  text-align: left;
  cursor: pointer;
  &:hover {
    color: #3d38f5;
  }
`;
const DropdownButton = styled.button`
  display: block;
  width: 100%;
  padding: 10px 20px;
  color: #6d63ff;
  text-decoration: none;
  font-size: 15px;
  background: none;
  border: none;
  text-align: left;
  cursor: pointer;
  &:hover {
    color: #3d38f5;
  }
`;
function detectBgMode() {
  if (typeof window !== "undefined") {
    const path = window.location.pathname;
    if (path === "/" || path === "/result") return "dark";
    if (
      ["/feed", "/article", "/mypage/moodboard", "/generate"].includes(
        path
      )
    )
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
  useEffect(() => {
    setMode(detectBgMode());
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
          style={{ cursor: "pointer" }}
          onClick={() => router.push("/")}
        >
          Moomu
        </LogoName>
      </LogoSection>
      <NavFrame>
        <Nav>
          {NAV_ITEMS.map(({ href, label }) => {
            const isGenerateButton = label === "Generate Moodboard";
            return (
              <NavLink
                key={href}
                href={href}
                $active={pathname === href}
                $mode={headerMode}
                onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                  if (isGenerateButton && !isLoggedIn) {
                    e.preventDefault();
                    handleLoginClick();
                  }
                }}
              >
                {label}
              </NavLink>
            );
          })}
        </Nav>
        <RightSection>
          {isLoggedIn ? (
            <AccountWrapper>
              <Avatar
                src={avatarSrc}
                alt="계정"
                onClick={() => setShowDropdown((prev) => !prev)}
              />
              {userName && <UserName>{userName}</UserName>}
              {showDropdown && (
                <Dropdown $mode={headerMode}>
                  <DropdownItem href="/mypage/moodboard">
                    마이페이지
                  </DropdownItem>
                  <DropdownButton onClick={handleLogout}>
                    로그아웃
                  </DropdownButton>
                </Dropdown>
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
