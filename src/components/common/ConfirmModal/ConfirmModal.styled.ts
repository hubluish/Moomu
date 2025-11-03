import styled from "styled-components";

export const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1001;
`;

export const ModalContainer = styled.div`
  background-color: white;
  padding: 30px;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  width: 380px;
  text-align: center;

  @media (max-width: 395px) {
    width: 90%;
    padding: 25px;
  }

  user-select: none;
  -webkit-user-select: none; /* Safari/Chrome */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* IE */
`;

export const ModalTitle = styled.h2`
  font-size: 20px;
  font-weight: var(--font-weight-semi-bold, 600);
  margin: 0 0 30px 0;
  color: var(--color-text-main);

  @media (max-width: 395px) {
    font-size: 14px;
  }
`;

export const ButtonWrapper = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 24px;
`;

export const ModalButton = styled.button<{ variant?: "default" | "danger" }>`
  flex: 1;
  padding: 10px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  border: 1px solid transparent;
  transition: background-color 0.2s ease-in-out;

  @media (max-width: 395px) {
    font-size: 14px;
    padding: 8px;
  }

  background-color: ${({ variant }) =>
    variant === "danger" ? "#EF4444" : "#8A4FFE"};
  color: white;

  &:hover {
    background-color: ${({ variant }) =>
      variant === "danger" ? "#DC2626" : "#7a3ee0"};
  }

  /* 취소 버튼 스타일 */
  &:first-child {
    background-color: #f8f9fa;
    color: #333;
    border-color: #e0e0e0;
    &:hover {
      background-color: #e9ecef;
      border-color: #ced4da;
    }
  }
`;
