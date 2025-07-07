// FolderModal.tsx
'use client';

import styled from 'styled-components';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { getFolders, addMoodboardToFolder } from '@/utils/localStorage';

const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  width: 100vw;
  height: 100vh;
  background: rgba(115, 115, 115, 0.5);
  backdrop-filter: blur(2px);
`;

const ModalWrapper = styled.div`
  position: fixed;
  z-index: 1000;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  height: 432px;
  padding: 45px 30px 30px 30px;
  background: white;
  border-radius: 10px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
`;

const ContentSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-bottom: 25px;

  max-height: 290px; /* 폴더 최대 5개까지 보여주는 높이 */
  overflow-y: auto;  /* 5개 초과 시 스크롤 생성 */

  scrollbar-width: thin;
  scrollbar-color: var(--color-main) transparent;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: var(--color-main);
    border-radius: 3px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }
`;

const Text = styled.p`
  color: var(--color-text-sub);
  font-family: var(--font-family-base);
  font-size: var(--font-caption);
  margin-top: 150px;
`;

const FolderItem = styled.div`
  width: 100%;
  min-height: 46px;
  padding: 6px 80px;
  background-color: var(--color-disable-sub-button);
  border-radius: 6px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 20px;
  font-size: var(--font-caption);
  border: 1px solid transparent;
  box-sizing: border-box;
  transition: border 0.2s ease;

  margin-bottom: 15px;

  &:hover {
    border: 1px solid var(--color-main);
  }
`;

const ButtonItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  flex-direction: row;
  gap: 8px;
`;

const AddFolderButton = styled.button`
  width: 52px;
  height: 42px;
  background-color: var(--color-main);
  color: var(--color-background);
  font: var(--font-caption);
  font-weight: var(--font-weight-medium);
  border: none;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  &:hover {
    background-color: var(--color-main-hover);
    transition: background 0.2s ease;
  }
`;

const AddButton = styled.button`
  margin-top: auto;
  width: 100%;
  height: 42px;
  background-color: var(--color-main);
  color: var(--color-background);
  font: var(--font-caption);
  font-weight: var(--font-weight-regular);
  border: none;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  &:hover {
    background-color: var(--color-main-hover);
    transition: background 0.2s ease;
  }
`;

interface FolderModalProps {
  onClose: () => void;
  onAddClick: () => void;
  moodboardId: string;
  currentFolderId?: string;
}

export default function FolderModal({ onClose, onAddClick, moodboardId, currentFolderId }: FolderModalProps) {

  const [folders, setFolders] = useState<Array<{ id: string; name: string }>>([]);
  const [selectedFolderId, setSelectedFolderId] = useState<string | null>(null);

  useEffect(() => {
    const storedFolders = getFolders();
    const filteredFolders = currentFolderId 
      ? storedFolders.filter(folder => folder.id !== currentFolderId) 
      : storedFolders;
    setFolders(filteredFolders);
  }, [currentFolderId]);

  const handleFolderSelect = (folderId: string) => {
    setSelectedFolderId(folderId);
  };

  const handleAddToFolder = () => {
    if (selectedFolderId) {
      addMoodboardToFolder(selectedFolderId, moodboardId);
      onClose();
    }
  };

  return (
    <>
      <ModalBackdrop onClick={onClose} />
      <ModalWrapper onClick={(e) => e.stopPropagation()}>
        <ContentSection>
          {folders.length === 0 ? (
            <Text>현재 생성된 폴더가 없습니다.</Text>
          ) : (
            folders.map((folder) => (
              <FolderItem 
                key={folder.id}
                onClick={() => handleFolderSelect(folder.id)}
                style={{
                  border: selectedFolderId === folder.id ? '1px solid var(--color-main)' : '1px solid transparent'
                }}
              >
                <Image src="/assets/icons/folder.svg" alt="folder" width={25} height={25} />
                {folder.name}
              </FolderItem>
            ))
          )}
        </ContentSection>

        <ButtonItem>
          <AddFolderButton onClick={onAddClick}>
            <Image src="/assets/icons/add-folder.svg" alt="folder" width={20} height={20} />
          </AddFolderButton>
          <AddButton 
            onClick={handleAddToFolder}
            disabled={!selectedFolderId}
            style={{
              backgroundColor: selectedFolderId ? 'var(--color-main)' : 'var(--color-disable-button)',
              cursor: selectedFolderId ? 'pointer' : 'not-allowed'
            }}
          >
            <Image src="/assets/icons/fill-folder.svg" alt="folder" width={25} height={25} />
            이 폴더에 추가하기
          </AddButton>
        </ButtonItem>
      </ModalWrapper>
    </>
  );
}