// components/section/mypage/Moodboard.tsx
'use client';

import React from 'react';
import {
  MoodboardCard,
  ImageSection,
  TitleSection,
  Title,
  DateText,
} from './moodboard.styled';

const Moodboard = () => {
  return (
    <MoodboardCard>
      <ImageSection>
        <img src="/assets/images/santa.png" alt="santa" />
      </ImageSection>
      <TitleSection>
        <Title>My&nbsp;&nbsp;Moodboard</Title>
        <DateText>2025. 05. 20.</DateText>
      </TitleSection>
    </MoodboardCard>
  );
};

export default Moodboard;
