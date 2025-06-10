// components/section/mypage/MoodboardOverlay.tsx
'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import FolderModal from './FolderModal';
import FolderCreateModal from './FolderCreateModal';

interface Moodboard {
  id: string;
  title: string;
  date: string;
  image: string;
  isFavorite: boolean;
  isDeleted: boolean;
  deletedAt?: Date;
}

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

interface MoodboardOverlayProps {
  moodboard?: Moodboard;
  onUpdate?: (updatedMoodboard: Moodboard) => void;
}

const defaultMoodboard: Moodboard = {
  id: '',
  title: '',
  date: '',
  image: '',
  isFavorite: false,
  isDeleted: false
};

const MoodboardOverlay: React.FC<MoodboardOverlayProps> = ({ 
  moodboard = defaultMoodboard, 
  onUpdate = () => {} 
}) => {
  const [showFolderModal, setShowFolderModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const handleCreateFolder = (name: string) => {
    // TODO: API 호출을 통해 폴더 생성 로직 구현
    console.log(`Creating folder with name: ${name}`);
    setShowCreateModal(false);
    setShowFolderModal(true);
  };

  const handleFavorite = () => {
    if (moodboard.id) {
      onUpdate({
        ...moodboard,
        isFavorite: !moodboard.isFavorite
      });
    }
  };

  const handleDelete = () => {
    if (moodboard.id) {
      onUpdate({
        ...moodboard,
        isDeleted: true,
        deletedAt: new Date()
      });
    }
  };

  return (
    <>
      <OverlayWrapper>
        <IconButton onClick={() => setShowFolderModal(true)}>
          <Image src="/assets/icons/fill-folder.svg" alt="folder" width={35} height={35} />
        </IconButton>
        <IconButton onClick={handleFavorite}>
          <Image 
            src={moodboard.isFavorite ? "/assets/icons/fill-star-active.svg" : "/assets/icons/fill-star.svg"} 
            alt="fill-star" 
            width={35} 
            height={35} 
          />
        </IconButton>
        <IconButton onClick={handleDelete}>
          <Image src="/assets/icons/fill-trash.svg" alt="fill-trash" width={35} height={35} />
        </IconButton>
      </OverlayWrapper>

      {showFolderModal && (
        <FolderModal
          moodboardId={moodboard.id}
          onAddClick={() => {
            setShowFolderModal(false);
            setShowCreateModal(true);
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