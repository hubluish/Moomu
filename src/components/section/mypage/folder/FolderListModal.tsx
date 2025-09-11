"use client";
import React, { useState, useEffect } from "react";
import { getAllFolders, addMoodboardToFolder } from "@/utils/folders";
import { CreateFolderModal } from "./CreateFolderModal";
import {
  ModalBackdrop,
  ModalContainer,
  ModalContent,
  ModalFooter,
} from "./FolderModal.styled";
// import { supabase } from "@/utils/supabase";

interface Folder {
  id: string;
  name: string;
  user_id: string;
  created_at: string;
}

type FolderListModalProps = {
  moodboardId: string;
  onClose: () => void;
};

const FolderListModal = ({ moodboardId, onClose }: FolderListModalProps) => {
  const [folders, setFolders] = useState<Folder[]>([]);
  const [selectedFolderId, setSelectedFolderId] = useState<string | null>(null);
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태 추가

  const fetchFolders = async () => {
    setIsLoading(true);
    try {
      const allUserFolders = await getAllFolders();
      setFolders(allUserFolders);
    } catch (error) {
      console.error("폴더를 불러오는 중 오류 발생:", error);
      alert("폴더를 불러오는데 실패했습니다.");
    } finally {
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
      await addMoodboardToFolder(moodboardId, selectedFolderId);
      alert("폴더에 무드보드가 추가되었습니다.");
      onClose(); // 성공 시 모달 닫기
    } catch (error) {
      console.error("폴더에 추가하는 중 오류 발생:", error);
      alert("무드보드를 폴더에 추가하는데 실패했습니다.");
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
        {isLoading ? (
          <ModalContent>
            <p>폴더 목록을 불러오는 중...</p>
          </ModalContent>
        ) : folders.length === 0 ? (
          <>
            <ModalContent>
              <p>현재 생성된 폴더가 없습니다.</p>
            </ModalContent>
            <ModalFooter>
              <button
                onClick={() => setCreateModalOpen(true)}
                style={{
                  width: "100%",
                  padding: "12px",
                  fontSize: "16px",
                  background: "#8865F3",
                  color: "white",
                  border: "none",
                  borderRadius: "10px",
                }}
              >
                새로운 폴더 만들기
              </button>
            </ModalFooter>
          </>
        ) : (
          <>
            <ModalContent>
              <ul>
                {folders.map((folder) => (
                  <li
                    key={folder.id}
                    onClick={() => setSelectedFolderId(folder.id)}
                    className={selectedFolderId === folder.id ? "active" : ""}
                  >
                    {folder.name}
                  </li>
                ))}
              </ul>
            </ModalContent>
            <ModalFooter>
              <button onClick={() => setCreateModalOpen(true)}>+</button>
              <button onClick={handleAddClick} disabled={!selectedFolderId}>
                이 폴더에 추가하기
              </button>
            </ModalFooter>
          </>
        )}
      </ModalContainer>
    </ModalBackdrop>
  );
};

export default FolderListModal;
