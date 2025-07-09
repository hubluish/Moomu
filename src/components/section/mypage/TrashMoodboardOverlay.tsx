'use client';

import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';

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

interface TrashMoodboardOverlayProps {
  moodboard?: Moodboard;
  onUpdate?: (updatedMoodboard: Moodboard) => void;
  onPermanentDelete?: (moodboardId: string) => void;
}

const defaultMoodboard: Moodboard = {
  id: '',
  title: '',
  date: '',
  image: '',
  isFavorite: false,
  isDeleted: false
};

const TrashMoodboardOverlay: React.FC<TrashMoodboardOverlayProps> = ({ 
  moodboard = defaultMoodboard, 
  onUpdate = () => {},
  onPermanentDelete = () => {}
}) => {
  const handleRestore = () => {
    if (moodboard.id) {
      onUpdate({
        ...moodboard,
        isDeleted: false,
        deletedAt: undefined
      });
    }
  };

  const handlePermanentDelete = () => {
    if (moodboard.id) {
      onPermanentDelete(moodboard.id);
    }
  };

  return (
    <OverlayWrapper>
      <IconButton onClick={handleRestore}>
        <Image src="/assets/icons/restore.svg" alt="restore" width={35} height={35} />
      </IconButton>
      <IconButton onClick={handlePermanentDelete}>
        <Image src="/assets/icons/fill-trash.svg" alt="delete-permanent" width={35} height={35} />
      </IconButton>
    </OverlayWrapper>
  );
};

export default TrashMoodboardOverlay; 