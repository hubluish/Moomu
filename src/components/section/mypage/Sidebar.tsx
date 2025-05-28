// components/Sidebar.tsx
'use client';

import React from 'react';
import { SidebarWrapper, MenuList, MenuItem, Icon, Label } from './sidebar.styled';
import { usePathname } from 'next/navigation';

const menuItems = [
  { label: '내 무드보드', icon: '/assets/icons/board.svg', path: '/moodboard' },
  { label: '내 폴더', icon: '/assets/icons/folder.svg', path: '/folder' },
  { label: '즐겨찾기', icon: '/assets/icons/star.svg', path: '/favorite' },
  { label: '휴지통', icon: '/assets/icons/trash.svg', path: '/trash' },
];

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <SidebarWrapper>
      <MenuList>
        {menuItems.map((item) => (
          <MenuItem key={item.label} $active={pathname === item.path}>
            <Icon src={item.icon} alt={item.label} />
            <Label>{item.label}</Label>
          </MenuItem>
        ))}
      </MenuList>
    </SidebarWrapper>
  );
};

export default Sidebar;