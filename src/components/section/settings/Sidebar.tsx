"use client";

import React from "react";
import {
  SidebarWrapper,
  MenuList,
  MenuItem,
  Icon,
  Label,
} from "./sidebar.styled";
import { usePathname } from "next/navigation";
import Link from "next/link";

const menuItems = [
  {
    label: "계정 관리",
    icon: "/assets/icons/account.svg",
    path: "/settings/account",
  },
  {
    label: "로그인 및 보안",
    icon: "/assets/icons/security.svg",
    path: "/settings/security",
  },
  {
    label: "알림 설정",
    icon: "/assets/icons/bell-icon.svg",
    path: "/settings/notifications",
  },
  {
    label: "환경설정",
    icon: "/assets/icons/setting-icon.svg",
    path: "/settings/preferences",
  },
  {
    label: "결제 정보 설정",
    icon: "/assets/icons/payment-methods.svg",
    path: "/settings/payment-methods",
  },
  {
    label: "결제 내역",
    icon: "/assets/icons/billing.svg",
    path: "/settings/billing",
  },
];

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <SidebarWrapper>
      <MenuList>
        {menuItems.map((item) => (
          <Link
            href={item.path}
            key={item.label}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <MenuItem $active={pathname === item.path}>
              <Icon src={item.icon} alt={item.label} draggable="false" />
              <Label>{item.label}</Label>
            </MenuItem>
          </Link>
        ))}
      </MenuList>
    </SidebarWrapper>
  );
};

export default Sidebar;
