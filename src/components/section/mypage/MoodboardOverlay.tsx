// components/section/mypage/MoodboardOverlay.tsx
import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';

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
`;

const MoodboardOverlay = () => {
  return (
    <OverlayWrapper>
      <IconButton><Image src="/assets/icons/fill-folder.svg" alt="fill-folder" width={35} height={35} /></IconButton>
      <IconButton><Image src="/assets/icons/fill-star.svg" alt="fill-star" width={35} height={35} /></IconButton>
      <IconButton><Image src="/assets/icons/fill-trash.svg" alt="fill-trash" width={35} height={35} /></IconButton>
    </OverlayWrapper>
  );
};

export default MoodboardOverlay;