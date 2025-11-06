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
    ["/feed", "/generate", "/planupgrade"].includes(path) ||
    path.startsWith("/mypage") ||
    path.startsWith("/settings") ||
    path.startsWith("/article") ||
    path.startsWith("/survey") ||
    path.startsWith("/admin")
  ) {
    return "light";
  }

  return "dark";
}

export default function Header() {
  const pathname = usePathname() ?? "";
  const router = useRouter();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
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

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
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
          } else {
            setUserName("");
          }
        } else {
          setIsLoggedIn(false);
          setUserName("");
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
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
    if (error) {
      alert("로그아웃에 실패했습니다. 다시 시도해 주세요.");
    } else {
      router.push("/");
    }
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

      {isMobile ? (
        <RightSection>
          {isLoggedIn ? (
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
          ) : (
            <LoginButton $mode={headerMode} onClick={handleLoginClick}>
              로그인
            </LoginButton>
          )}
        </RightSection>
      ) : (
        <NavFrame>
          <Nav>
            {NAV_ITEMS.map(({ href, label }) => {
              if (label === "Explore Feeds" || label === "Generate Moodboard") {
                return (
                  <NavLink
                    key={href}
                    href={isLoggedIn ? href : "#"}
                    $active={pathname === href}
                    $mode={headerMode}
                    onClick={(e) => {
                      e.preventDefault(); // 기본 링크 이동을 막습니다.
                      if (isLoggedIn) {
                        router.push(href); // 로그인 상태면 페이지 이동
                      } else {
                        handleLoginClick(); // 로그아웃 상태면 모달 열기
                      }
                    }}
                  >
                    {label}
                  </NavLink>
                );
              }

              return (
                <NavLink
                  key={href}
                  href={href}
                  $active={pathname === href}
                  $mode={headerMode}
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
              </AccountWrapper>
            ) : (
              <LoginButton $mode={headerMode} onClick={handleLoginClick}>
                로그인/회원가입
              </LoginButton>
            )}
          </RightSection>
        </NavFrame>
      )}

      {isLoggedIn && (
        <HeaderModal
          isOpen={isMobile ? showMobileMenu : showDropdown} // 모바일/데스크톱 상태에 맞게 전달
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
