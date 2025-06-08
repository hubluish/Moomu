// components/section/mypage/Moodboard.tsx
'use client';

import MoodboardOverlay from './MoodboardOverlay';
import Image from 'next/image';
import React, { useState } from 'react';
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
};

const Moodboard = ({ id, title, date, image, isFavorite = false, onUpdate }: Props) => {
  const [moodboardData, setMoodboardData] = useState<MoodboardData>({
    id,
    title,
    date,
    image,
    isFavorite,
    isDeleted: false
  });

  const handleUpdate = (updatedMoodboard: MoodboardData) => {
    setMoodboardData(updatedMoodboard);
    if (onUpdate) {
      onUpdate(updatedMoodboard);
    }
  };

  return (
    <MoodboardCard>
      <MoodboardSection>
        <Image src={image} alt={title} width={332} height={181} />
        <MoodboardOverlay 
          moodboard={moodboardData}
          onUpdate={handleUpdate}
        />
      </MoodboardSection>
      <TitleSection>
        <Title>{title}</Title>
        <DateText>{date}</DateText>
      </TitleSection>
    </MoodboardCard>
  );
};

export default Moodboard;
