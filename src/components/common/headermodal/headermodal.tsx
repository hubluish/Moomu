"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  Wrapper,
  TopRow,
  UserLeft,
  UserName,
  MenuList,
  MenuItem,
  MenuLabel,
} from "./headermodal.styled";

type HeaderModalProps = {
  userName?: string;
  hasNotification?: boolean;
  onLogout: () => void;
  onClose: () => void;
};

export default function HeaderModal({
  userName = "User Name",
  hasNotification = false,
  onLogout,
  onClose,
}: HeaderModalProps) {
  const router = useRouter();

  const handleNavigate = (path: string) => {
    router.push(path);
    onClose();
  };

  const menuItems = [
    { label: "내 무드보드", icon: "board.svg", path: "/mypage/moodboard" },
    { label: "플랜 업그레이드", icon: "plan-icon.svg", path: "/planupgrade" },
    { label: "설정", icon: "setting-icon.svg", path: "/settings" },
  ];

  return (
    <Wrapper>
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

      <MenuList>
        {menuItems.map((item) => (
          <MenuItem key={item.label} onClick={() => handleNavigate(item.path)}>
            <Image
              src={`/assets/icons/${item.icon}`}
              alt={item.label}
              width={24}
              height={24}
            />
            <MenuLabel>{item.label}</MenuLabel>
          </MenuItem>
        ))}

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
    </Wrapper>
  );
}
