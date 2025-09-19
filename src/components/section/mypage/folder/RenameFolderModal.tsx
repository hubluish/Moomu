"use client";
import React, { useState } from "react";
import {
  ModalBackdrop,
  ModalCreateContainer,
  CreateModalTitle,
  FolderNameInput,
  AddFolderButton,
} from "./FolderModal.styled";

type RenameFolderModalProps = {
  isOpen: boolean;
  currentName: string;
  onClose: () => void;
  onRename: (newName: string) => void;
};

export const RenameFolderModal = ({
  isOpen,
  currentName,
  onClose,
  onRename,
}: RenameFolderModalProps) => {
  const [newName, setNewName] = useState(currentName);
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) {
    return null;
  }

  const handleRename = () => {
    if (!newName.trim()) {
      alert("폴더명을 입력해주세요.");
      return;
    }
    setIsLoading(true);
    onRename(newName.trim());
    setIsLoading(false);
  };

  return (
    <ModalBackdrop onClick={onClose}>
      <ModalCreateContainer
        onClick={(e: React.MouseEvent) => e.stopPropagation()}
      >
        <CreateModalTitle>폴더명 수정</CreateModalTitle>
        <FolderNameInput
          value={newName}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setNewName(e.target.value)
          }
          placeholder="폴더명을 입력하세요"
        />
        <AddFolderButton
          onClick={handleRename}
          disabled={!newName.trim() || isLoading}
        >
          {isLoading ? "수정 중..." : "수정하기"}
        </AddFolderButton>
      </ModalCreateContainer>
    </ModalBackdrop>
  );
};
