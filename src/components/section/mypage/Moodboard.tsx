// components/section/mypage/Moodboard.tsx
'use client';

import MoodboardOverlay from './MoodboardOverlay';
import TrashMoodboardOverlay from './TrashMoodboardOverlay';
import FolderMoodboardOverlay from './FolderMoodboardOverlay';
import Image from 'next/image';
import React, { useState, useCallback } from 'react';
import {
  MoodboardCard,
  MoodboardSection,
  TitleSection,
  Title,
  DateText,
} from './moodboard.styled';

interface MoodboardData {
  id: string;
  title: string;
  date: string;
  image: string;
  isFavorite: boolean;
  isDeleted: boolean;
  deletedAt?: Date;
}

type Props = {
  id: string;
  title: string;
  date: string;
  image: string;
  isFavorite?: boolean;
  onUpdate?: (updatedMoodboard: MoodboardData) => void;
  onPermanentDelete?: (moodboardId: string) => void;
  onRemoveFromFolder?: (moodboardId: string) => void;
  onMoveToTrash?: (moodboardId: string) => void;
  isTrash?: boolean;
  isFolder?: boolean;
  currentFolderId?: string;
};

const Moodboard = ({
  id,
  title,
  date,
  image,
  isFavorite = false,
  onUpdate,
  onPermanentDelete,
  onRemoveFromFolder,
  onMoveToTrash,
  isTrash = false,
  isFolder = false,
  currentFolderId,
}: Props) => {
  const [moodboardData, setMoodboardData] = useState<MoodboardData>({
    id,
    title,
    date,
    image,
    isFavorite,
    isDeleted: false,
  });

  const handleUpdate = (updatedMoodboard: MoodboardData) => {
    setMoodboardData(updatedMoodboard);
    if (onUpdate) {
      onUpdate(updatedMoodboard);
    }
  };

  const renderOverlay = useCallback(() => {
    if (isTrash) {
      return (
        <TrashMoodboardOverlay
          moodboard={moodboardData}
          onUpdate={handleUpdate}
          onPermanentDelete={onPermanentDelete}
        />
      );
    } else if (isFolder) {
      return (
        <FolderMoodboardOverlay
          moodboard={moodboardData}
          onRemoveFromFolder={onRemoveFromFolder}
          onMoveToTrash={onMoveToTrash}
          onUpdate={handleUpdate}
          currentFolderId={currentFolderId}
        />
      );
    } else {
      return (
        <MoodboardOverlay
          moodboard={moodboardData}
          onUpdate={handleUpdate}
        />
      );
    }
  }, [isTrash, isFolder, moodboardData, onPermanentDelete, onRemoveFromFolder, onMoveToTrash, onUpdate, currentFolderId, handleUpdate]);

  return (
    <MoodboardCard>
      <MoodboardSection>
        <Image src={image} alt={title} width={332} height={181} />
        {renderOverlay()}
      </MoodboardSection>
      <TitleSection>
        <Title>{title}</Title>
        <DateText>{date}</DateText>
      </TitleSection>
    </MoodboardCard>
  );
};

export default Moodboard;
