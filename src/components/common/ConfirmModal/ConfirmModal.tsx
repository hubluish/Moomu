import React, { ReactNode } from "react";
import {
  ModalBackdrop,
  ModalContainer,
  ModalTitle,
  ButtonWrapper,
  ModalButton,
} from "./ConfirmModal.styled";

type ConfirmModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: ReactNode;
  message?: string;
  hideCancel?: boolean;
  confirmText?: string;
  cancelText?: string;
  variant?: "default" | "danger";
};

const ConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  hideCancel = false,
  confirmText = "확인",
  cancelText = "취소",
  variant = "default",
}: ConfirmModalProps) => {
  if (!isOpen) return null;

  return (
    <ModalBackdrop onClick={onClose}>
      <ModalContainer onClick={(e: React.MouseEvent) => e.stopPropagation()}>
        <ModalTitle>{title}</ModalTitle>
        {message && (
          <p style={{ margin: "-12px 0 24px", color: "#666" }}>{message}</p>
        )}
        <ButtonWrapper>
          {!hideCancel && (
            <ModalButton onClick={onClose}>{cancelText}</ModalButton>
          )}
          <ModalButton onClick={onConfirm} variant={variant}>
            {confirmText}
          </ModalButton>
        </ButtonWrapper>
      </ModalContainer>
    </ModalBackdrop>
  );
};

export default ConfirmModal;
