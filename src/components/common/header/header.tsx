"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import {
  HeaderWrapper, LogoSection, LogoImg, LogoName, Nav, NavLink,
  RightSection, LoginButton, AccountWrapper, Avatar, Dropdown, DropdownItem
} from "./header.styled";

const isLoggedIn = true; // 로그인 상태를 나타내는 변수 (예시로 true로 설정)

const NAV_ITEMS = [
  { href: "/", label: "home" },
  { href: "/article", label: "article" },
  { href: "/mypage/moodboard/page", label: "mymoodboard" },
];

// 헤더 내용
export default function Header() {
  const pathname = usePathname();
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <HeaderWrapper>
      <LogoSection>
        <LogoImg src="/assets/icons/logo.png" alt="로고" />
        <LogoName>Moomu</LogoName>
      </LogoSection>

      <Nav>
        {NAV_ITEMS.map(({ href, label }) => (
          <NavLink 
            href={href} 
            key={href} 
            $active={label === "mymoodboard" ? (pathname ?? "").startsWith("/mypage") : pathname === href}
          >
            {label}
          </NavLink>
        ))}

        <RightSection>
          {isLoggedIn ? (
            <AccountWrapper>
              <Avatar
                src="/assets/icons/id.png"
                alt="계정"
                style={{ cursor: "pointer" }}
                onClick={() => setShowDropdown(prev => !prev)}
              />
              {showDropdown && (
                <Dropdown>
                  <DropdownItem href="/my_id">회원정보 수정</DropdownItem>
                  <DropdownItem href="/logout">로그아웃</DropdownItem>
                </Dropdown>
              )}
            </AccountWrapper>
          ) : (
            <LoginButton href="/login">로그인/회원가입</LoginButton>
          )}
        </RightSection>
      </Nav>
    </HeaderWrapper>
  );
}