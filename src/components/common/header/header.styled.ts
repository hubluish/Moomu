import styled, { css } from "styled-components";
import Link from "next/link";

interface HeaderWrapperProps {
  $mode: string;
}

interface NavLinkProps {
  $active: boolean;
  $mode: string;
}

interface LoginButtonProps {
  $mode: string;
}

interface LogoNameProps {
  $mode: string;
}

export const HeaderWrapper = styled.header<HeaderWrapperProps>`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100vw;
  height: 64px;
  padding: 0 32px;
  background: transparent;
  z-index: 100;

  ${({ $mode }) =>
    $mode.startsWith("dark")
      ? css`
          color: #fff;
        `
      : css`
          color: #222;
        `}
`;

export const LogoSection = styled.div`
  display: flex;
  align-items: center;
`;

export const LogoImg = styled.img`
  width: 40px;
  height: 40px;
  margin-right: 12px;
`;

export const LogoName = styled.span<LogoNameProps>`
  font-size: 25px;
  font-weight: 800;
  font-family: var(--font-family-logo, Pretendard);
  letter-spacing: -0.1em;
  height: 40px;

  /* $mode 값에 따라 색상을 변경합니다. */
  color: ${({ $mode }) => ($mode.startsWith("dark") ? "#fff" : "#222")};

  /* 부드러운 색상 전환 효과를 위해 transition 추가 */
  transition: color 0.2s;
`;

export const Nav = styled.nav`
  display: flex;
  gap: 32px;
  align-items: center;
`;

export const NavLink = styled.a<NavLinkProps>`
  position: relative;
  text-decoration: none;
  font: var(--text-body1);
  color: ${({ $active, $mode }) =>
    $active ? "#6d63ff" : $mode.startsWith("dark") ? "#fff" : "#222"};
  padding: 0 4px;
  transition: color 0.2s;
  &:hover {
    color: var(--background);
  }
  &::after {
    content: ${({ $active }) => ($active ? "''" : "none")};
    display: block;
    position: absolute;
    left: 0;
    right: 0;
    bottom: -4px;
    height: 2px;
    background: var(--color-main);
  }
`;

export const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const LoginButton = styled.button<LoginButtonProps>`
  display: flex;
  padding: 10px 20px;
  justify-content: center;
  align-items: center;
  align-self: stretch;
  border-radius: 70px;
  background: ${({ $mode }) =>
    $mode.startsWith("dark")
      ? "linear-gradient(180deg, #3d38f5b3 16.41%, #dcbadb 385.64%)"
      : "linear-gradient(180deg, #6d63ff 16.41%, #dcbadb 385.64%)"};
  color: #fff;
  border: none;
  line: none;
  /* button&notice */
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 800;
  line-height: normal;
  &:hover {
    background: var(--color-point);
  }
`;

export const AccountWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

export const Avatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
`;

export const Dropdown = styled.div`
  position: absolute;
  top: 48px;
  right: 0;
  background: var(--color-bg);
  border: 1px solid var(--color-outline);
  border-radius: 8px;
  box-shadow: 0 4px 16px rgba(255, 255, 255, 0.08);
  min-width: 165px;
  z-index: 10;
  padding: 8px 0;
`;

export const DropdownItem = styled(Link)`
  display: block;
  width: 100%;
  padding: 10px 20px;
  color: var(--color-text-sub);
  text-decoration: none;
  font: var(--text-body2);
  background: none;
  text-align: left;
  cursor: pointer;
  &:hover {
    color: var(--color-point);
  }
`;

export const DropdownButton = styled.button`
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
