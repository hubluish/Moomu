"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  Wrapper,
  Backdrop, // 추가
  ModalHeader,
  CloseButton,
  TopRow,
  UserLeft,
  UserName,
  MenuList,
  MenuItem,
  MenuLabel,
  SubMenuWrapper,
  SubMenuList,
  SubMenuItem,
} from "./headermodal.styled";

type HeaderModalProps = {
  isOpen: boolean; // 열림 상태
  isMobile: boolean; // 모바일 여부
  userName?: string;
  hasNotification?: boolean;
  onLogout: () => void;
  onClose: () => void;
};

const mobileNavItems = [
  { label: "무드보드 생성", icon: "plan-icon.svg", path: "/generate" },
  { label: "아티클", icon: "article-icon.svg", path: "/article" },
  { label: "피드", icon: "feed-icon.svg", path: "/feed" },
];
const mypageSubMenus = [
  { label: "내 폴더", icon: "folder.svg", path: "/mypage/folder" },
  { label: "찜한 피드", icon: "heart.svg", path: "/mypage/favorite" },
  { label: "휴지통", icon: "trash.svg", path: "/mypage/trash" },
];
const planMenu = {
  label: "플랜 업그레이드",
  icon: "plan-icon.svg",
  path: "/planupgrade",
};
const settingsMenu = {
  label: "설정",
  icon: "setting-icon.svg",
  path: "/settings",
};

export default function HeaderModal({
  isOpen,
  isMobile,
  userName = "User Name",
  hasNotification = false,
  onLogout,
  onClose,
}: HeaderModalProps) {
  const router = useRouter();
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setIsSubMenuOpen(false);
    }
  }, [isOpen]);

  const handleNavigate = (path: string) => {
    router.push(path);
    onClose();
  };

  return (
    <>
      {isMobile && isOpen && <Backdrop onClick={onClose} />}

      <Wrapper $isOpen={isOpen} $isMobile={isMobile}>
        <ModalHeader>
          <CloseButton onClick={onClose}>
            <Image
              src="/assets/icons/close-icon.svg"
              alt="닫기"
              width={24}
              height={24}
            />
          </CloseButton>
        </ModalHeader>

        <TopRow>
          <UserLeft>
            <Image
              src="/assets/icons/headerId-light.png"
              alt="사용자"
              width={50}
              height={50}
            />
            <UserName>{userName}</UserName>
          </UserLeft>
          <Image
            src={
              hasNotification
                ? "/assets/icons/bell-active-icon.svg"
                : "/assets/icons/bell-icon.svg"
            }
            alt="알림"
            width={32}
            height={32}
          />
        </TopRow>

        {isMobile ? (
          <MenuList>
            {mobileNavItems.map((item) => (
              <MenuItem
                key={item.label}
                onClick={() => handleNavigate(item.path)}
              >
                <Image
                  src={`/assets/icons/${item.icon}`}
                  alt={item.label}
                  width={24}
                  height={24}
                />
                <MenuLabel>{item.label}</MenuLabel>
              </MenuItem>
            ))}

            <SubMenuWrapper>
              <MenuItem
                onClick={() => handleNavigate("/mypage/moodboard")} // '내 무드보드' 페이지로 이동
                style={{ justifyContent: "space-between" }} // 화살표를 오른쪽 끝으로
              >
                <div
                  style={{ display: "flex", alignItems: "center", gap: "12px" }}
                >
                  <Image
                    src="/assets/icons/board.svg"
                    alt="내 무드보드"
                    width={24}
                    height={24}
                  />
                  <MenuLabel>내 무드보드</MenuLabel>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // 부모의 페이지 이동 방지
                    setIsSubMenuOpen((prev) => !prev);
                  }}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    display: "flex",
                  }}
                >
                  <Image
                    src="/assets/icons/arrow-down.svg"
                    alt="펼치기"
                    width={24}
                    height={24}
                    style={{
                      transform: isSubMenuOpen
                        ? "rotate(180deg)"
                        : "rotate(0deg)",
                      transition: "transform 0.3s",
                    }}
                  />
                </button>
              </MenuItem>

              <SubMenuList $isOpen={isSubMenuOpen}>
                {mypageSubMenus.map((item) => (
                  <SubMenuItem
                    key={item.label}
                    onClick={() => handleNavigate(item.path)}
                  >
                    <Image
                      src={`/assets/icons/${item.icon}`}
                      alt={item.label}
                      width={20}
                      height={20}
                    />
                    <MenuLabel>{item.label}</MenuLabel>
                  </SubMenuItem>
                ))}
              </SubMenuList>
            </SubMenuWrapper>
            <MenuItem onClick={() => handleNavigate(planMenu.path)}>
              <Image
                src={`/assets/icons/${planMenu.icon}`}
                alt={planMenu.label}
                width={24}
                height={24}
              />
              <MenuLabel>{planMenu.label}</MenuLabel>
            </MenuItem>
            <MenuItem onClick={() => handleNavigate(settingsMenu.path)}>
              <Image
                src={`/assets/icons/${settingsMenu.icon}`}
                alt={settingsMenu.label}
                width={24}
                height={24}
              />
              <MenuLabel>{settingsMenu.label}</MenuLabel>
            </MenuItem>
            <MenuItem isLogout onClick={onLogout}>
              <Image
                src="/assets/icons/logout-icon.svg"
                alt="로그아웃"
                width={24}
                height={24}
              />
              <MenuLabel>로그아웃</MenuLabel>
            </MenuItem>
          </MenuList>
        ) : (
          <MenuList>
            <MenuItem onClick={() => handleNavigate("/mypage/moodboard")}>
              <Image
                src="/assets/icons/board.svg"
                alt="내 무드보드"
                width={24}
                height={24}
              />
              <MenuLabel>내 무드보드</MenuLabel>
            </MenuItem>
            <MenuItem onClick={() => handleNavigate(planMenu.path)}>
              <Image
                src={`/assets/icons/${planMenu.icon}`}
                alt={planMenu.label}
                width={24}
                height={24}
              />
              <MenuLabel>{planMenu.label}</MenuLabel>
            </MenuItem>
            <MenuItem onClick={() => handleNavigate(settingsMenu.path)}>
              <Image
                src={`/assets/icons/${settingsMenu.icon}`}
                alt={settingsMenu.label}
                width={24}
                height={24}
              />
              <MenuLabel>{settingsMenu.label}</MenuLabel>
            </MenuItem>
            <MenuItem isLogout onClick={onLogout}>
              <Image
                src="/assets/icons/logout-icon.svg"
                alt="로그아웃"
                width={24}
                height={24}
              />
              <MenuLabel>로그아웃</MenuLabel>
            </MenuItem>
          </MenuList>
        )}
      </Wrapper>
    </>
  );
}
