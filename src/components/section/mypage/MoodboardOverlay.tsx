// components/section/mypage/MoodboardOverlay.tsx
'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import FolderModal from './FolderModal';
import FolderCreateModal from './FolderCreateModal';

const OverlayWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
  width: 100%;
  height: 100%;
  backdrop-filter: blur(2px);
  background-color: rgba(122, 122, 122, 0.25);
  display: none;
  justify-content: center;
  align-items: center;
  gap: 24px;
  border-radius: 10px 10px 0 0;
`;

const IconButton = styled.button`
  background-color: var(--color-main);
  border: none;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background-color: var(--color-main-hover);
  }
`;

const MoodboardOverlay = () => {
  const [showFolderModal, setShowFolderModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [folders, setFolders] = useState<string[]>([]);

  const handleCreateFolder = (name: string) => {
    setFolders((prev) => [...prev, name]);
    setShowCreateModal(false);
    setShowFolderModal(true); // 다시 폴더 모달 띄우기
  };

  return (
    <>
      <OverlayWrapper>
        <IconButton onClick={() => setShowFolderModal(true)}>
          <Image src="/assets/icons/fill-folder.svg" alt="folder" width={35} height={35} />
        </IconButton>
        <IconButton>
          <Image src="/assets/icons/fill-star.svg" alt="fill-star" width={35} height={35} />
        </IconButton>
        <IconButton>
          <Image src="/assets/icons/fill-trash.svg" alt="fill-trash" width={35} height={35} />
        </IconButton>
      </OverlayWrapper>

      {showFolderModal && (
        <FolderModal
          folders={folders}
          onAddClick={() => {
            setShowFolderModal(false); // 폴더 모달 닫고
            setShowCreateModal(true); // 생성 모달 열기
          }}
          onClose={() => setShowFolderModal(false)}
        />
      )}

      {showCreateModal && (
        <FolderCreateModal
          onSubmit={handleCreateFolder}
          onClose={() => setShowCreateModal(false)}
        />
      )}
    </>
  );
};

export default MoodboardOverlay;