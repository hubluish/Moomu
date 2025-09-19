"use client";
import React, { useState } from "react";
import {
  ModalBackdrop,
  ModalCreateContainer,
  ModalFooter,
  CreateModalTitle,
  FolderNameInput,
  AddFolderButton,
} from "./FolderModal.styled";
import { createFolder } from "@/utils/folders";
import { supabase } from "@/utils/supabase";

type CreateFolderModalProps = {
  onClose: () => void;
  onFolderCreated: () => void;
};

export const CreateFolderModal = ({
  onClose,
  onFolderCreated,
}: CreateFolderModalProps) => {
  const [folderName, setFolderName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleCreateFolder = async () => {
    if (!folderName.trim()) {
      alert("폴더명을 입력해주세요.");
      return;
    }

    setIsLoading(true);
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) {
        alert("로그인이 필요합니다.");
        throw new Error("사용자 인증에 실패했습니다.");
      }
      await createFolder(session.user.id, folderName.trim());

      onFolderCreated();
      onClose();
    } catch (error) {
      console.error("폴더 생성 중 오류 발생:", error);
      alert("폴더 생성에 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ModalBackdrop onClick={onClose}>
      <ModalCreateContainer
        onClick={(e: React.MouseEvent) => e.stopPropagation()}
      >
        <CreateModalTitle>폴더명</CreateModalTitle>
        <FolderNameInput
          value={folderName}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setFolderName(e.target.value)
          }
          placeholder="폴더명을 입력하세요"
        />
        <ModalFooter>
          <AddFolderButton
            onClick={handleCreateFolder}
            disabled={!folderName.trim() || isLoading}
          >
            {isLoading ? "추가 중..." : "폴더 추가하기"}
          </AddFolderButton>
        </ModalFooter>
      </ModalCreateContainer>
    </ModalBackdrop>
  );
};
