"use client"; // Next.js 클라이언트 컴포넌트 지정

import React, { useState } from "react";
import styled from "styled-components";
import Link from "next/link"; // Next.js 라우팅용 Link
import { usePathname } from "next/navigation"; // Next.js 13+ 경로 감지

const isLoggedIn = true; // 로그인 상태 임의 관리 ..ㅎㅎ 테스트용(실제 구현 시 상태/props로 관리)


// 헤더 전체 래퍼
const HeaderWrapper = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 64px;
  padding: 0 32px;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0,0,0,0.03);
`;

// 로고 영역(이미지+이름)
const LogoSection = styled.div`
  display: flex;
  align-items: center;
`;

// 로고 이미지 스타일
const LogoImg = styled.img`
  width: 40px;
  height: 40px;
  margin-right: 12px;
`;

// 로고 텍스트 스타일
const LogoName = styled.span`
  font-size: 32px;
  font-weight: bold;
  color: var(--color-text-main);
  font-family: var(--font-family-logo), 'MuseoModerno', sans-serif;
`;

// 네비게이션 영역
const Nav = styled.nav`
  display: flex;
  gap: 32px;
  align-items: center;
`;

// 네비게이션 링크 스타일
const NavLink = styled.a`
  position: relative;
  text-decoration: none;
  font: var(--text-body1);
  color: var(--color-text-sub);
  padding: 0 4px;
  transition: color 0.2s;

  &:hover {
    color: var(--color-point);
  }

  /* 활성화된 메뉴에만 바 표시 */
  ${({ $active }) =>
    $active &&
    `
    color: var(--color-main);
    &::after {
      content: '';
      display: block;
      position: absolute;
      left: 0;
      right: 0;
      bottom: -20px;
      height: 1px;
      background: var(--color-main);
    }
  `}
`;

// 가장 오른쪽(로그인/회원가입 또는 계정) 영역
const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

// 버튼 스타일(로그인/회원가입)
const Button = styled.a`
  font: var(--text-notice);
  padding: 6px 16px;
  border: none;
  border-radius: 4px;
  background: var(--color-main);
  &:hover {
    background: var(--color-point);
  }
  color: #fff;
  cursor: pointer;
  text-decoration: none;
  display: inline-block;
`;

// 계정 표시 영역
const Account = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

// 계정 프로필 이미지
const Avatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
`;

// 프로필 클릭시 드롭다운 메뉴
const Dropdown = styled.div`
  position: absolute;
  top: 48px;
  right: 0;
  background: var(--color-bg);
  border: 1px solid var(--color-outline);
  border-radius: 8px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.08);
  min-width: 140px;
  z-index: 10;
  padding: 8px 0;
`;

// 프로필 클릭시 드롭다운 속 아이템
const DropdownItem = styled.a`
  display: block;
  width: 100%;
  padding: 10px 20px;
  color: var(--color-text-sub);
  text-decoration: none;
  font: var(--text-body2);
  background: none;
  border: none;
  text-align: left;
  cursor: pointer;
  &:hover {
    color: var(--color-point);
  }
`;

const AccountWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

// 헤더 내용
export default function Header() {
  const pathname = usePathname();
  const [showDropdown, setShowDropdown] = useState(false);

  // 로그아웃 함수 예시
  const handleLogout = () => {
    // 실제 로그아웃 로직 구현 필요
    alert("로그아웃 되었습니다!");
    setShowDropdown(false);
  };

  return (
    <HeaderWrapper>
      {/* 왼쪽: 로고 */}
      <LogoSection>
        <LogoImg src="/header/logo.png" alt="로고" />
        <LogoName>Moomu</LogoName>
      </LogoSection>
      {/* 가운데: 네비게이션 */}
      <Nav>
        <Link href="/" passHref legacyBehavior>
          <NavLink $active={pathname === "/"}>home</NavLink>
        </Link>
        <Link href="/article" passHref legacyBehavior>
          <NavLink $active={pathname === "/article"}>article</NavLink>
        </Link>
        <Link href="/mymoodboard" passHref legacyBehavior>
          <NavLink $active={pathname === "/mymoodboard"}>mymoodboard</NavLink>
        </Link>
        {/* 오른쪽: 로그인/회원가입 또는 계정 */}
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
          <>
            <Link href="/login" passHref legacyBehavior>
              <Button>로그인/회원가입</Button>
            </Link>
          </>
        )}
      </RightSection>
      </Nav>
    </HeaderWrapper>
  );
}