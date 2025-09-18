"use client";
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { supabase } from "@/utils/supabase";
import {
  HeaderWrapper, LogoSection, LogoImg, LogoName, Nav, NavLink,
  RightSection, LoginButton, AccountWrapper, Avatar, Dropdown, DropdownItem, DropdownButton
} from "./header.styled";
import LoginModal from "../Login/LoginModal";
// const isLoggedIn = false; // 로그인 상태를 나타내는 변수 (예시로 false로 설정)
const NAV_ITEMS = [
  { href: "/", label: "Explore Feeds" },
  { href: "/article", label: "Article" },
  { href: "/mypage/moodboard/page", label: "Generate Moodboard" },
];
// 헤더 내용
export default function Header() {
  const pathname = usePathname();
  const [showDropdown, setShowDropdown] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태를 useState로 관리
  const [userName, setUserName] = useState(''); // 사용자 이름 상태 추가
  useEffect(() => {
    // 초기 로그인 상태 확인
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        setIsLoggedIn(true);
        const { data: profile, error } = await supabase
          .from('profiles')
          .select('name')
          .eq('id', session.user.id)
          .single();
        if (profile?.name) {
          setUserName(profile.name);
        } else if (session.user.user_metadata?.full_name) { // user_metadata에서 이름 가져오기
          setUserName(session.user.user_metadata.full_name);
        } else if (error) {
          console.error('프로필 로드 실패:', error.message);
        }
      } else {
        setIsLoggedIn(false);
        setUserName('');
      }
    };
    getSession();
    // 인증 상태 변경 리스너 설정
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session) {
        setIsLoggedIn(true);
        const { data: profile, error } = await supabase
          .from('profiles')
          .select('name')
          .eq('id', session.user.id)
          .single();
        if (profile?.name) {
          setUserName(profile.name);
        } else if (session.user.user_metadata?.full_name) { // user_metadata에서 이름 가져오기
          setUserName(session.user.user_metadata.full_name);
        } else if (error) {
          console.error('프로필 로드 실패:', error.message);
        }
      } else if (event === 'SIGNED_OUT') {
        setIsLoggedIn(false);
        setUserName('');
      }
    });
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
      console.error('로그아웃 실패:', error.message);
      alert('로그아웃에 실패했습니다. 다시 시도해 주세요.');
    }
    setShowDropdown(false); // 드롭다운 닫기
    window.location.reload(); // 페이지 새로고침 추가
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
              {userName && <span style={{ marginLeft: '10px', fontWeight: 'bold' }}>{userName}</span>} {/* 사용자 이름 표시 */}
              {showDropdown && (
                <Dropdown>
                  <DropdownItem href="/my_id">회원정보 수정</DropdownItem>
                  <DropdownButton onClick={handleLogout}>로그아웃</DropdownButton>
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