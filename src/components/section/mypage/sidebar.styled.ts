// components/Sidebar.styled.ts
import styled from "styled-components";

export const SidebarWrapper = styled.nav`
  width: 230px;
  background-color: var(--color-background);
  padding: 50px 0;
  min-height: 100vh;
  border-right: 1px solid #eee;

  user-select: none;
  -webkit-user-select: none; /* Safari/Chrome */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* IE */
`;

export const MenuList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const MenuItem = styled.li<{ $active?: boolean }>`
  display: flex;
  align-items: center;
  padding: 14px 30px;
  background-color: ${({ $active }) => ($active ? "#efefef" : "transparent")};
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background-color: var(--color-disable-sub-button);
  }
`;

export const Icon = styled.img`
  width: 30px;
  height: 30px;
  margin-right: 25px;
`;

export const Label = styled.span`
  font-family: var(--font-family-base);
  font-size: 22px;
  font-weight: var(--font-weight-regular);
  color: var(--color-text-main);
`;
