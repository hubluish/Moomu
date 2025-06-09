"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import {
  HeaderWrapper, LogoSection, LogoImg, LogoName, Nav, NavLink,
  RightSection, LoginButton, AccountWrapper, Avatar, Dropdown, DropdownItem
} from "./header.styled";
import LoginModal from "../Login/LoginModal";

const isLoggedIn = false; // 로그인 상태를 나타내는 변수 (예시로 false로 설정)

const NAV_ITEMS = [
  { href: "/", label: "home" },
  { href: "/article", label: "article" },
  { href: "/mymoodboard", label: "mymoodboard" },
];

// 헤더 내용
export default function Header() {
  const pathname = usePathname();
  const [showDropdown, setShowDropdown] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLoginClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <HeaderWrapper>
      <LogoSection>
        <LogoImg src="/assets/icons/logo.svg" alt="로고" />
        <LogoName>Moomu</LogoName>
      </LogoSection>

      <Nav>
        {NAV_ITEMS.map(({ href, label }) => (
          <NavLink href={href} key={href} $active={pathname === href}>
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
            <LoginButton href="#" onClick={handleLoginClick}>로그인/회원가입</LoginButton>
          )}
        </RightSection>
      </Nav>

      <LoginModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </HeaderWrapper>
  );
}