"use client";
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
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
  Dropdown,
  DropdownItem,
  DropdownButton,
} from "./header.styled";
import LoginModal from "../Login/LoginModal";

const NAV_ITEMS = [
  { href: "/", label: "home" },
  { href: "/article", label: "article" },
  { href: "/mypage/moodboard", label: "mymoodboard" },
];

export default function Header() {
  const pathname = usePathname() ?? "";
  const [showDropdown, setShowDropdown] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session) {
        setIsLoggedIn(true);
        const { data: profile, error } = await supabase
          .from("profiles")
          .select("name")
          .eq("id", session.user.id)
          .single();
        if (profile?.name) {
          setUserName(profile.name);
        } else if (session.user.user_metadata?.full_name) {
          setUserName(session.user.user_metadata.full_name);
        } else if (error) {
          console.error("프로필 로드 실패:", error.message);
        }
      } else {
        setIsLoggedIn(false);
        setUserName("");
      }
    };
    getSession();
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === "SIGNED_IN" && session) {
          setIsLoggedIn(true);
          const { data: profile, error } = await supabase
            .from("profiles")
            .select("name")
            .eq("id", session.user.id)
            .single();
          if (profile?.name) {
            setUserName(profile.name);
          } else if (session.user.user_metadata?.full_name) {
            setUserName(session.user.user_metadata.full_name);
          } else if (error) {
            console.error("프로필 로드 실패:", error.message);
          }
        } else if (event === "SIGNED_OUT") {
          setIsLoggedIn(false);
          setUserName("");
        }
      }
    );
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const handleLoginClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      alert("로그아웃에 실패했습니다. 다시 시도해 주세요.");
    }
    setShowDropdown(false);
    window.location.reload();
  };

  return (
    <HeaderWrapper>
      <LogoSection>
        <LogoImg src="/assets/icons/logo.svg" alt="로고" draggable="false" />
        <LogoName>Moomu</LogoName>
      </LogoSection>
      <Nav>
        {NAV_ITEMS.map(({ href, label }) => {
          let isActive = false;

          if (href === "/mypage/moodboard") {
            isActive = pathname.startsWith("/mypage");
          } else if (href === "/") {
            isActive = pathname === href;
          } else {
            isActive = pathname.startsWith(href);
          }

          return (
            <NavLink href={href} key={href} $active={isActive}>
              {label}
            </NavLink>
          );
        })}
        <RightSection>
          {isLoggedIn ? (
            <AccountWrapper>
              <Avatar
                src="/assets/icons/id.png"
                alt="계정"
                style={{ cursor: "pointer" }}
                onClick={() => setShowDropdown((prev) => !prev)}
              />
              {userName && (
                <span style={{ marginLeft: "10px", fontWeight: "bold" }}>
                  {userName}
                </span>
              )}
              {showDropdown && (
                <Dropdown>
                  <DropdownItem href="/my_id">회원정보 수정</DropdownItem>
                  <DropdownButton onClick={handleLogout}>
                    로그아웃
                  </DropdownButton>
                </Dropdown>
              )}
            </AccountWrapper>
          ) : (
            <LoginButton href="#" onClick={handleLoginClick}>
              로그인/회원가입
            </LoginButton>
          )}
        </RightSection>
      </Nav>
      <LoginModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </HeaderWrapper>
  );
}
