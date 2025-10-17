import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  width: 354px;
  padding: 28px 24px;
  flex-direction: column;
  align-items: center;
  gap: 24px; /* 간격 조정 */
  border-radius: 20px;
  background: #fff;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.15);

  position: absolute;
  top: 50px;
  right: 0;
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

// isLogout prop을 받아 로그아웃 스타일에만 다른 색상을 적용
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
