"use client";// Next.js 클라이언트 컴포넌트 지정

import React, { useState } from "react";
import Link from "next/link"; // Next.js 라우팅용 Link
import { usePathname } from "next/navigation";// Next.js 13+ 경로 감지
import {
  HeaderWrapper, LogoSection, LogoImg, LogoName, Nav, NavLink,
  RightSection, Button, AccountWrapper, Avatar, Dropdown, DropdownItem
} from "./header.styled";

const isLoggedIn = false; // 로그인 상태 임의 관리 ..ㅎㅎ 테스트용(실제 구현 시 상태/props로 관리)


const NAV_ITEMS = [
  { href: "/", label: "home" },
  { href: "/article", label: "article" },
  { href: "/mymoodboard", label: "mymoodboard" },
];

// 헤더 내용
export default function Header() {
  const pathname = usePathname();
  const [showDropdown, setShowDropdown] = useState(false);

  // 로그아웃 함수
  const handleLogout = () => {
    alert("로그아웃 되었습니다!");
    setShowDropdown(false);
  };

  return (
    <HeaderWrapper>
      <LogoSection>
        <LogoImg src="/header/logo.png" alt="로고" />
        <LogoName>Moomu</LogoName>
      </LogoSection>
      <Nav>
        {NAV_ITEMS.map(({ href, label }) => (
          <Link href={href} passHref legacyBehavior key={href}>
            <NavLink $active={pathname === href}>{label}</NavLink>
          </Link>
        ))}
      <RightSection>
        {isLoggedIn ? (
          <AccountWrapper>
            <Avatar
              src="/header/id.png"
              alt="계정"
              style={{ cursor: "pointer" }}
              onClick={() => setShowDropdown((prev) => !prev)}
            />
            {showDropdown && (
              <Dropdown>
                <Link href="/my_id" passHref legacyBehavior>
                  <DropdownItem as="a" onClick={() => setShowDropdown(false)}>
                    회원정보 수정
                  </DropdownItem>
                </Link>
                <DropdownItem as="button" onClick={handleLogout}>
                  로그아웃
                </DropdownItem>
              </Dropdown>
            )}
          </AccountWrapper>
        ) : (
          <Link href="/login" passHref legacyBehavior>
            <Button>로그인/회원가입</Button>
          </Link>
        )}
      </RightSection>
      </Nav>
    </HeaderWrapper>
  );
}