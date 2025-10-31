import styled, { css } from "styled-components";

export const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  z-index: 1000;
`;

export const Wrapper = styled.div<{ $isOpen: boolean; $isMobile: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #fff;
  z-index: 1001;
  transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;

  ${({ $isMobile, $isOpen }) =>
    $isMobile
      ? css`
          /* 모바일: 사이드바 스타일 */
          position: fixed;
          top: 0;
          right: 0;
          width: 305px;
          height: 100vh;
          padding: 28px 24px;
          gap: 32px;
          border-radius: 0;
          box-shadow: -4px 0 10px rgba(0, 0, 0, 0.1);
          overflow-y: auto;

          transform: translateX(${$isOpen ? "0%" : "100%"});
        `
      : css`
          /* 데스크톱: 드롭다운 모달 스타일 */
          position: absolute;
          top: 65px;
          right: 35px;
          width: 354px;
          padding: 28px 24px;
          gap: 24px;
          border-radius: 20px;
          box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.15);

          opacity: ${$isOpen ? "1" : "0"};
          transform: translateY(${$isOpen ? "0" : "-10px"});
          pointer-events: ${$isOpen ? "auto" : "none"};
        `}
`;

export const ModalHeader = styled.div`
  display: none; /* 데스크톱에선 숨김 */
  width: 100%;
  justify-content: flex-end;
  @media (max-width: 375px) {
    display: flex;
  }
`;
export const CloseButton = styled.button`
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  @media (max-width: 375px) {
    display: block;
  }
`;

export const TopRow = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;

export const UserLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const UserName = styled.div`
  color: #000;
  font-size: 20px;
  font-weight: 700;
`;

export const MenuList = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px; /* 메뉴 아이템 사이 간격 */
`;

export const MenuItem = styled.div<{ isLogout?: boolean }>`
  display: flex;
  width: 100%;
  padding: 12px 8px;
  align-items: center;
  gap: 12px;
  border-radius: 10px;
  cursor: pointer;

  /* 호버 애니메이션 추가 */
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background: #ebebff;
  }

  /* isLogout이 true일 때만 글자색 변경 */
  color: ${({ isLogout }) => (isLogout ? "#F73A32" : "#000")};
`;

export const MenuLabel = styled.span`
  font-size: 18px;
  font-weight: 600;
`;

export const SubMenuWrapper = styled.div`
  display: none; /* 데스크톱에선 숨김 */
  flex-direction: column;
  width: 100%;
  @media (max-width: 900px) {
    display: flex;
  }
`;

export const MainMenuButton = styled(MenuItem)`
  justify-content: space-between;
`;

export const SubMenuList = styled.div<{ $isOpen: boolean }>`
  max-height: ${({ $isOpen }) => ($isOpen ? "200px" : "0")};
  overflow: hidden;
  transition: max-height 0.3s ease-in-out;
  padding-left: 20px;
  width: 100%;
`;

export const SubMenuItem = styled(MenuItem)`
  gap: 10px;
  padding: 10px 8px;
  span {
    font-size: 16px;
    font-weight: 500;
  }
`;
