"use client";
import React, { useState, useEffect } from "react";
import {
  getFolders,
  addMoodboardToFolder,
  moveMoodboardToAnotherFolder,
} from "@/utils/folders";
import { CreateFolderModal } from "./CreateFolderModal";
import Image from "next/image";
import {
  ModalBackdrop,
  ModalContainer,
  ModalContent,
  ModalFooter,
  FolderList,
  FolderItem,
  AddToFolderButton,
} from "./FolderModal.styled";
import IconButton from "../common/IconButton";
import { supabase } from "@/utils/supabase";

interface Folder {
  id: string;
  name: string;
  user_id: string;
  created_at: string;
}

type FolderListModalProps = {
  moodboardId: string;
  onClose: () => void;
  currentFolderId?: string;
  onSuccess?: (folderName: string) => void;
  displayToast: (message: string) => void;
};

const FolderListModal = ({
  moodboardId,
  onClose,
  currentFolderId,
  onSuccess,
  displayToast,
}: FolderListModalProps) => {
  const [folders, setFolders] = useState<Folder[]>([]);
  const [selectedFolder, setSelectedFolder] = useState<Folder | null>(null);
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const fetchFolders = async () => {
    setIsLoading(true);
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session) {
        const userFolders = await getFolders(session.user.id);
        setFolders(userFolders);
      } else {
        setFolders([]);
      }
    } catch (error) {
      console.error("폴더를 불러오는 중 오류 발생:", error);
      setFolders([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFolders();
  }, []);

  const handleAddClick = async () => {
    if (!selectedFolder) {
      displayToast("폴더를 선택해주세요.");
      return;
    }
    try {
      if (currentFolderId) {
        await moveMoodboardToAnotherFolder(
          moodboardId,
          currentFolderId,
          selectedFolder.id
        );
        if (onSuccess) onSuccess(selectedFolder.name);
      } else {
        await addMoodboardToFolder(moodboardId, selectedFolder.id);
        if (onSuccess) onSuccess(selectedFolder.name);
      }
    } catch (error) {
      if (
        error &&
        typeof error === "object" &&
        "code" in error &&
        error.code === "23505"
      ) {
        displayToast("이미 해당 폴더에 추가된 무드보드입니다.");
      } else {
        console.error("폴더 작업 중 오류 발생:", error);
        displayToast("작업에 실패했습니다.");
      }
    }
  };

  if (isCreateModalOpen) {
    return (
      <CreateFolderModal
        onClose={() => setCreateModalOpen(false)}
        onFolderCreated={() => {
          fetchFolders();
          setCreateModalOpen(false);
        }}
      />
    );
  }

  return (
    <ModalBackdrop onClick={onClose}>
      <ModalContainer onClick={(e: React.MouseEvent) => e.stopPropagation()}>
        <ModalContent $isCentered={folders.length === 0 && !isLoading}>
          {isLoading ? (
            <p>폴더 목록을 불러오는 중...</p>
          ) : folders.length === 0 ? (
            <p>현재 생성된 폴더가 없습니다.</p>
          ) : (
            <FolderList>
              {folders.map((folder) => (
                <FolderItem
                  key={folder.id}
                  onClick={() => setSelectedFolder(folder)}
                  className={selectedFolder?.id === folder.id ? "active" : ""}
                >
                  <Image
                    src="/assets/icons/folder.svg"
                    alt="폴더"
                    width={24}
                    height={24}
                  />
                  {folder.name}
                </FolderItem>
              ))}
            </FolderList>
          )}
        </ModalContent>
        {!isLoading && folders.length === 0 ? (
          <ModalFooter>
            <button
              onClick={() => setCreateModalOpen(true)}
              style={{
                width: "100%",
                padding: "12px",
                fontSize: "16px",
                backgroundColor: "#8865F3",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              새로운 폴더 만들기
            </button>
          </ModalFooter>
        ) : (
          !isLoading && (
            <ModalFooter>
              <IconButton
                onClick={() => setCreateModalOpen(true)}
                src="/assets/icons/add-folder.svg"
                alt="새 폴더 추가"
                variant="folder"
              />
              <AddToFolderButton
                onClick={handleAddClick}
                disabled={!selectedFolder}
              >
                이 폴더에 추가하기
              </AddToFolderButton>
            </ModalFooter>
          )
        )}
      </ModalContainer>
    </ModalBackdrop>
  );
};

export default FolderListModal;
