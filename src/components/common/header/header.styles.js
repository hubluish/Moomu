import styled from "styled-components";

// 헤더 전체
export const HeaderWrapper = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 64px;
  padding: 0 32px;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);
`;

// 로고 영역(이미지+이름)
export const LogoSection = styled.div`
  display: flex;
  align-items: center;
`;

export const LogoImg = styled.img`
  width: 40px;
  height: 40px;
  margin-right: 12px;
`;

export const LogoName = styled.span`
  font-size: 32px;
  font-weight: bold;
  color: var(--color-text-main);
  font-family: var(--font-family-logo), "MuseoModerno", sans-serif;
`;

// 네비게이션 영역
export const Nav = styled.nav`
  display: flex;
  gap: 32px;
  align-items: center;
`;

// 네비게이션 링크부분
export const NavLink = styled.a`
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
export const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

// 로그인/회원가입 버튼
export const Button = styled.a`
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

// 계정 영역
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

// 프로필 클릭시 드롭다운 메뉴
export const Dropdown = styled.div`
  position: absolute;
  top: 48px;
  right: 0;
  background: var(--color-bg);
  border: 1px solid var(--color-outline);
  border-radius: 8px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  min-width: 140px;
  z-index: 10;
  padding: 8px 0;
`;

// 프로필 클릭시 드롭다운 속 아이템
export const DropdownItem = styled.a`
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