// components/section/mypage/Moodboard.tsx
'use client';

import MoodboardOverlay from './MoodboardOverlay';
import Image from 'next/image';
import React from 'react';
import {
  MoodboardCard,
  MoodboardSection,
  TitleSection,
  Title,
  DateText,
} from './moodboard.styled';

type Props = {
  title: string;
  date: string;
  image: string;
};

const Moodboard = ({ title, date, image }: Props) => {
  return (
    <MoodboardCard>
      <MoodboardSection>
        <Image src={image} alt={title} width={332} height={181} />
        <MoodboardOverlay /> {/* Hover 시 나타남 */}
      </MoodboardSection>
      <TitleSection>
        <Title>{title}</Title>
        <DateText>{date}</DateText>
      </TitleSection>
    </MoodboardCard>
  );
};

export default Moodboard;
