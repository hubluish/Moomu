import styled, { css } from "styled-components";

// 모달 바깥 어두운 배경
export const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

// 모달 본문 컨테이너
export const ModalContainer = styled.div`
  background-color: white;
  padding: 24px;
  border-radius: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  width: 350px;
  height: 420px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const ModalCreateContainer = styled.div`
  background-color: white;
  padding: 24px;
  border-radius: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  width: 350px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const ModalContent = styled.div<{ $isCentered?: boolean }>`
  flex-grow: 1;
  overflow-y: auto; /* 목록이 길어질 경우 스크롤 */
  padding-right: 8px; /* 스크롤바와 내용이 겹치지 않도록 여백 추가 */
  box-sizing: border-box;

  &::-webkit-scrollbar {
    width: 6px; /* 1. 스크롤바의 너비 */
  }

  &::-webkit-scrollbar-thumb {
    background-color: #c5c2ff; /* 2. 스크롤바 막대의 색상 */
    border-radius: 6px; /* 3. 스크롤바 막대의 모서리 둥글게 */
  }

  &::-webkit-scrollbar-track {
    background-color: #f0eaff; /* 4. 스크롤바 배경의 색상 */
  }

  ${({ $isCentered }) =>
    $isCentered &&
    css`
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    `}
`;

export const ModalFooter = styled.footer`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  gap: 8px;
  border-radius: 10px;
  margin-top: 15px;
`;

export const CreateModalTitle = styled.h2`
  font-size: 20px;
  font-weight: bold;
  color: #333;
  margin-bottom: 24px;
  width: 300px;
`;

export const FolderNameInput = styled.input`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  font-size: 16px;
  color: #333;
  &::placeholder {
    color: #bdbdbd;
  }
  &:focus {
    outline: none;
    border-color: #8a4ffe; /* 포커스 시 테두리 색상 변경 */
  }
`;

export const AddFolderButton = styled.button`
  width: 100%;
  padding: 12px 0;
  margin-top: 32px; /* 인풋 필드와 버튼 사이 간격 */
  background-color: #8a4ffe; /* 활성화 상태 배경색 */
  color: white;
  font-size: 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;

  &:disabled {
    background-color: #e0e0e0; /* 비활성화 상태 배경색 */
    color: #bdbdbd;
    cursor: not-allowed;
  }
  &:hover:not(:disabled) {
    background-color: #7a3ee0; /* 활성화 상태 호버 시 배경색 */
  }
`;

export const FolderList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  width: 300px;
  overflow-y: auto; /* 폴더가 많아지면 스크롤 */
`;

export const FolderItem = styled.li`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  margin-bottom: 15px;

  border-radius: 8px;
  box-sizing: border-box;
  background-color: #ebebff;
  cursor: pointer;
  border: 1px solid transparent;

  transition: background-color 0.2s;

  &.active {
    background-color: #c5c2ff; /* 선택됐을 때 배경색 */
  }

  &:hover {
    border: 1px solid #8a4ffe;
  }
`;

export const AddToFolderButton = styled.button`
  padding: 12px;
  text-align: center;
  background-color: #8a4ffe; /* 활성화 색상 */
  color: white;
  font-size: 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s;
  width: 100%;

  &:disabled {
    background-color: #e0e0e0;
    cursor: not-allowed;
  }
`;
