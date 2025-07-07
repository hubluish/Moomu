// components/Sidebar.tsx
'use client';

import React from 'react';
import { SidebarWrapper, MenuList, MenuItem, Icon, Label } from './sidebar.styled';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

const menuItems = [
  { label: '내 무드보드', icon: '/assets/icons/board.svg', path: '/mypage/moodboard/page' },
  { label: '내 폴더', icon: '/assets/icons/folder.svg', path: '/mypage/folder/page' },
  { label: '즐겨찾기', icon: '/assets/icons/star.svg', path: '/mypage/favorite/page' },
  { label: '휴지통', icon: '/assets/icons/trash.svg', path: '/mypage/trash/page' },
];

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <SidebarWrapper>
      <MenuList>
        {menuItems.map((item) => (
          <Link href={item.path} key={item.label} style={{ textDecoration: 'none', color: 'inherit' }}>
            <MenuItem $active={pathname === item.path}>
              <Icon src={item.icon} alt={item.label} />
              <Label>{item.label}</Label>
            </MenuItem>
          </Link>
        ))}
      </MenuList>
    </SidebarWrapper>
  );
};

export default Sidebar;