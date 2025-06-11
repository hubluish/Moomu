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

const OptionModal = styled.div`
  position: absolute;
  top: 68px; /* Adjusted to appear above the trash icon */
  left: -92%;
  transform: translateX(-50%);
  background-color: white;
  border-radius: 8px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: row;
  z-index: 50; /* Reverted z-index to original */
  height: 40px;
`;

const OptionButton = styled.button`
  background: none;
  border: none;
  padding: 10px 15px;
  text-align: left;
  cursor: pointer;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 142px;

  &:hover {
    background-color: #f0f0f0;
    border-radius: 8px;
  }
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

interface FolderMoodboardOverlayProps {
  moodboard?: Moodboard;
  onRemoveFromFolder?: (moodboardId: string) => void;
  onMoveToTrash?: (moodboardId: string) => void;
  onUpdate?: (updatedMoodboard: Moodboard) => void;
  currentFolderId?: string;
}

const defaultMoodboard: Moodboard = {
  id: '',
  title: '',
  date: '',
  image: '',
  isFavorite: false,
  isDeleted: false
};

const FolderMoodboardOverlay: React.FC<FolderMoodboardOverlayProps> = ({
  moodboard = defaultMoodboard,
  onRemoveFromFolder = () => {},
  onMoveToTrash = () => {},
  onUpdate = () => {},
  currentFolderId,
}) => {
  const [showDeleteOptions, setShowDeleteOptions] = useState(false);
  const [showFolderModal, setShowFolderModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const handleRemoveFromFolder = () => {
    if (moodboard.id) {
      onRemoveFromFolder(moodboard.id);
    }
    setShowDeleteOptions(false);
  };

  const handleMoveToTrash = () => {
    if (moodboard.id) {
      onMoveToTrash(moodboard.id);
    }
    setShowDeleteOptions(false);
  };

  const handleFavorite = () => {
    if (moodboard.id) {
      onUpdate({
        ...moodboard,
        isFavorite: !moodboard.isFavorite
      });
    }
  };

  const handleCreateFolder = (name: string) => {
    console.log(`Creating folder with name: ${name}`);
    setShowCreateModal(false);
    setShowFolderModal(true);
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
        <IconButton onClick={() => setShowDeleteOptions(!showDeleteOptions)} style={{ position: 'relative' }}>
          <Image src="/assets/icons/fill-trash.svg" alt="fill-trash" width={35} height={35} />
          {showDeleteOptions && (
            <OptionModal>
              <OptionButton onClick={handleRemoveFromFolder}>
                폴더에서 삭제
              </OptionButton>
              <OptionButton onClick={handleMoveToTrash}>
                휴지통
              </OptionButton>
            </OptionModal>
          )}
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
          currentFolderId={currentFolderId}
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

export default FolderMoodboardOverlay; 