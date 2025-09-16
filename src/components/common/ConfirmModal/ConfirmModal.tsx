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
  confirmText?: string;
  cancelText?: string;
  variant?: "default" | "danger";
};

const ConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  confirmText = "확인",
  cancelText = "취소",
  variant = "default",
}: ConfirmModalProps) => {
  if (!isOpen) return null;

  return (
    <ModalBackdrop onClick={onClose}>
      <ModalContainer onClick={(e: React.MouseEvent) => e.stopPropagation()}>
        <ModalTitle>{title}</ModalTitle>
        <ButtonWrapper>
          <ModalButton onClick={onClose}>{cancelText}</ModalButton>
          <ModalButton onClick={onConfirm} variant={variant}>
            {confirmText}
          </ModalButton>
        </ButtonWrapper>
      </ModalContainer>
    </ModalBackdrop>
  );
};

export default ConfirmModal;
