// components/section/mypage/Moodboard.tsx
'use client';

import MoodboardOverlay from './MoodboardOverlay';
import React from 'react';
import {
  MoodboardCard,
  MoodboardSection,
  TitleSection,
  Title,
  DateText,
} from './moodboard.styled';

const Moodboard = () => {
  return (
    <MoodboardCard>
      <MoodboardSection>
        <MoodboardOverlay /> {/* Hover 시 나타남 */}
      </MoodboardSection>
      <TitleSection>
        <Title>mmmmooooommmuuuuu</Title>
        <DateText>2025. 05. 20.</DateText>
      </TitleSection>
    </MoodboardCard>
  );
};

export default Moodboard;
