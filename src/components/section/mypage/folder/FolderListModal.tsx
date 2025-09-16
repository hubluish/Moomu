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
  onSuccess?: () => void;
};

const FolderListModal = ({
  moodboardId,
  onClose,
  currentFolderId,
  onSuccess,
}: FolderListModalProps) => {
  const [folders, setFolders] = useState<Folder[]>([]);
  const [selectedFolderId, setSelectedFolderId] = useState<string | null>(null);
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태 추가

  const fetchFolders = async () => {
    setIsLoading(true);
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      // session이 있을 때만 폴더를 가져옵니다.
      if (session) {
        const userFolders = await getFolders(session.user.id);
        setFolders(userFolders);
      } else {
        // session이 없으면 빈 배열로 설정합니다.
        setFolders([]);
      }
    } catch (error) {
      console.error("폴더를 불러오는 중 오류 발생:", error);
      setFolders([]); // 에러 발생 시에도 빈 배열로 초기화
    } finally {
      // try 또는 catch 블록이 끝난 후 항상 실행됩니다.
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFolders();
  }, []);

  const handleAddClick = async () => {
    if (!selectedFolderId) {
      alert("폴더를 선택해주세요.");
      return;
    }
    try {
      if (currentFolderId) {
        // "이동" 로직: currentFolderId가 있으면 move 함수 호출
        await moveMoodboardToAnotherFolder(
          moodboardId,
          currentFolderId,
          selectedFolderId
        );
        alert("무드보드를 다른 폴더로 이동했습니다.");
      } else {
        // "추가" 로직: currentFolderId가 없으면 기존 add 함수 호출
        await addMoodboardToFolder(moodboardId, selectedFolderId);
        alert("폴더에 무드보드가 추가되었습니다.");
      }

      // 성공 시 onSuccess 콜백이 있으면 실행, 없으면 onClose 실행
      if (onSuccess) {
        onSuccess();
      } else {
        onClose();
      }
    } catch (error) {
      if (
        error &&
        typeof error === "object" &&
        "code" in error &&
        error.code === "23505"
      ) {
        alert("이미 해당 폴더에 추가된 무드보드입니다.");
      } else {
        console.error("폴더 작업 중 오류 발생:", error);
        alert("작업에 실패했습니다.");
      }
    }
  };

  if (isCreateModalOpen) {
    return (
      <CreateFolderModal
        onClose={() => setCreateModalOpen(false)}
        onFolderCreated={() => {
          fetchFolders(); // 새 폴더 생성 후 목록 새로고침
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
                  onClick={() => setSelectedFolderId(folder.id)}
                  className={selectedFolderId === folder.id ? "active" : ""}
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
                disabled={!selectedFolderId}
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
