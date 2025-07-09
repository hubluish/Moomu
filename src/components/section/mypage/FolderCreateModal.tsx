// components/section/mypage/FolderCreateModal.tsx
'use client';

import styled from 'styled-components';
import React, { useState } from 'react';
import { createFolder } from '@/utils/localStorage';

interface StyledButtonProps {
  $isActive: boolean;
}

const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  width: 100vw;
  height: 100vh;
  background: rgba(115, 115, 115, 0.5);
  backdrop-filter: blur(2px);
`;

const ModalWrapper = styled.div`
  position: fixed;
  z-index: 1000;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  padding: 30px;
  background: var(--color-background);
  border-radius: 10px;
  box-shadow: 0px 4px 4px 0px rgba(0,0,0,0.25);
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-family: var(--font-family-base);
  font-size: var(--font-caption);
  font-weight: var(--font-weight-medium);
  margin-bottom: 15px;
  display: block;
`;

const Input = styled.input`
  padding: 12px 20px;
  border: 1px solid var(--color-disable-button);
  border-radius: 6px;
  margin-bottom: 40px;
  transition: border 0.2s ease;

  &:focus {
    outline: none;
    border: 1px solid var(--color-main);
  }
`;

const Button = styled.button<StyledButtonProps>`
  width: 100%;
  height: 42px;
  border-radius: 8px;
  border: none;
  background-color: ${({ $isActive }) =>
    $isActive ? 'var(--color-main)' : 'var(--color-disable-button)'};
  color: var(--color-background);
  font-size: var(--font-caption);
  font-weight: var(--font-weight-regular);
  cursor: ${({ $isActive }) => ($isActive ? 'pointer' : 'not-allowed')};
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${({ $isActive }) =>
      $isActive ? 'var(--color-main-hover)' : 'var(--color-disable-button)'};
  }

  &:disabled {
    cursor: not-allowed;
    background-color: var(--color-disable-button);
  }
`;

interface Props {
  onSubmit: (name: string) => void;
  onClose: () => void;
}

export default function FolderCreateModal({ onSubmit, onClose }: Props) {
  const [name, setName] = useState('');

  const handleWrapperClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const handleSubmit = () => {
    if (name.trim() !== '') {
      createFolder(name.trim());
      onSubmit(name.trim());
      onClose();
    }
  };

  return (
    <>
      <ModalBackdrop onClick={onClose} />
      <ModalWrapper onClick={handleWrapperClick}>
        <Label htmlFor="folderName">폴더명</Label>
        <Input
          id="folderName"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="폴더명을 입력하세요"
        />
        <Button
          disabled={name.trim() === ''}
          $isActive={name.trim() !== ''}
          onClick={handleSubmit}
        >
          폴더 추가하기
        </Button>
      </ModalWrapper>
    </>
  );
}