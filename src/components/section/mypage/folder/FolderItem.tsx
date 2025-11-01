"use client";
import React, { useState } from "react";
import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";
import ConfirmModal from "@/components/common/ConfirmModal/ConfirmModal";
import { RenameFolderModal } from "./RenameFolderModal";

const FolderLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
`;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
`;

const FolderIconWrapper = styled.div`
  width: 180px;
  height: 180px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  border: 1px solid rgba(136, 101, 243, 0.5);
  border-radius: 16px;
`;

const FolderName = styled.span`
  font-weight: bold;
`;

const SettingsButton = styled.button`
  position: absolute;
  top: 2px;
  right: 22px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 5px;

  @media (max-width: 965px) {
    right: 57px;
  }

  @media (max-width: 900px) {
    right: 42px;
  }

  @media (max-width: 865px) {
    right: 30px;
  }

  @media (max-width: 800px) {
    right: 22px;
  }

  @media (max-width: 757px) {
    right: 110px;
  }

  @media (max-width: 735px) {
    right: 97px;
  }

  @media (max-width: 700px) {
    right: 80px;
  }

  @media (max-width: 650px) {
    right: 50px;
  }

  @media (max-width: 600px) {
    right: 30px;
  }
`;

const PopoverMenu = styled.div`
  position: absolute;
  top: -80px;
  right: 18px;
  background: rgb(218, 220, 224, 0.8);
  border-radius: 10px;
  padding: 6px 16px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.15);
  z-index: 10;
  overflow: hidden;
`;

const PopoverButton = styled.button<{ variant?: "default" | "danger" }>`
  display: block;
  border-radius: 5px;
  width: 100%;
  padding: 4px 20px;
  background: none;
  border: none;
  font-size: 12px;
  text-align: center;
  cursor: pointer;
  background: rgb(255, 255, 255, 0.8);
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: ${({ variant }) =>
      variant === "danger" ? "#FF6062" : "#EBEBFF"};
    color: ${({ variant }) => (variant === "danger" ? "white" : "inherit")};
  }
`;

type FolderItemProps = {
  id: string;
  name: string;
  onDelete: (folderId: string) => void;
  onUpdate: (folderId: string, newName: string) => void;
};

const FolderItem = ({ id, name, onDelete, onUpdate }: FolderItemProps) => {
  const [isPopoverOpen, setPopoverOpen] = useState(false);

  const [isRenameModalOpen, setRenameModalOpen] = useState(false);
  const [isConfirmOpen, setConfirmOpen] = useState(false);

  const handleSettingsClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setPopoverOpen((prev) => !prev);
  };

  const handleDeleteClick = () => {
    setConfirmOpen(true);
    setPopoverOpen(false);
  };

  const handleRenameClick = () => {
    setRenameModalOpen(true);
    setPopoverOpen(false);
  };

  const confirmDelete = () => {
    onDelete(id);
    setConfirmOpen(false);
  };

  const confirmRename = (newName: string) => {
    onUpdate(id, newName);
    setRenameModalOpen(false);
  };

  return (
    <Wrapper>
      <FolderLink href={`/mypage/folder/${id}`}>
        <FolderIconWrapper>
          <Image
            src="/assets/icons/fill-folder.svg"
            alt="폴더"
            width={120}
            height={120}
            draggable={false}
          />
        </FolderIconWrapper>
        <FolderName>{name}</FolderName>
      </FolderLink>

      <SettingsButton onClick={handleSettingsClick}>
        <Image
          src="/assets/icons/dots-vertical.svg"
          alt="설정"
          width={24}
          height={24}
          draggable={false}
        />
      </SettingsButton>

      {isPopoverOpen && (
        <PopoverMenu>
          <PopoverButton
            style={{ marginBottom: "7px" }}
            onClick={handleRenameClick}
          >
            이름 수정
          </PopoverButton>
          <PopoverButton onClick={handleDeleteClick} variant="danger">
            삭제
          </PopoverButton>
        </PopoverMenu>
      )}

      <RenameFolderModal
        isOpen={isRenameModalOpen}
        currentName={name}
        onClose={() => setRenameModalOpen(false)}
        onRename={confirmRename}
      />
      <ConfirmModal
        isOpen={isConfirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={confirmDelete}
        title="폴더를 삭제하시겠습니까?"
        message="폴더 안의 무드보드는 삭제되지 않습니다."
        confirmText="삭제"
        variant="danger"
      />
    </Wrapper>
  );
};

export default FolderItem;
