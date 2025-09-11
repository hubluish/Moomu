import styled from "styled-components";

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
  height: 400px;
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

export const ModalContent = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const ModalFooter = styled.footer`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  gap: 8px;
  border-radius: 10px;
`;

export const CreateModalTitle = styled.h2`
  font-size: 20px;
  font-weight: bold;
  color: #333;
  margin-bottom: 24px;
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
