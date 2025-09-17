"use client";

import React from "react";
import Image from "next/image";
import {
  MoodboardWrapper,
  CategoryContainer,
  CategoryChip,
  ImageWrapper,
} from "./moodboard.styled";
import MoodboardOverlay from "./MoodboardOverlay";

type MoodboardProps = {
  id: string;
  imageUrl: string | null;
  keywords: string[];
  date: string;
  type: "mymoodboard" | "folder" | "favorite" | "trash";
  onAddToFolder: () => void;
  onMoveToTrash: (moodboardId: string) => void;
  onRemoveFromFolder?: (moodboardId: string) => void;
  onRestore?: (moodboardId: string) => void;
  onPermanentDelete?: (moodboardId: string) => void;
  authorName?: string;
  isPublic: boolean;
  onTogglePublic: (moodboardId: string) => void;
};

const Moodboard = ({
  id,
  imageUrl,
  keywords,
  date,
  type,
  onAddToFolder,
  onMoveToTrash,
  onRemoveFromFolder,
  onRestore,
  onPermanentDelete,
  authorName,
  isPublic,
  onTogglePublic,
}: MoodboardProps) => {
  const displayImage = imageUrl || "/assets/images/sky.png";

  return (
    <MoodboardWrapper>
      <CategoryContainer>
        {keywords
          .filter((keyword) => keyword)
          .map((keyword, index) => (
            <CategoryChip key={index}>{keyword}</CategoryChip>
          ))}
      </CategoryContainer>

      <ImageWrapper>
        <Image
          src={displayImage}
          alt="무드보드 썸네일"
          width={311}
          height={140}
          style={{
            objectFit: "cover",
            borderRadius: "8px",
          }}
        />
      </ImageWrapper>

      <MoodboardOverlay
        type={type}
        moodboardId={id}
        isPublic={isPublic}
        onTogglePublic={onTogglePublic}
        date={date}
        authorName={authorName}
        onAddToFolder={onAddToFolder}
        onMoveToTrash={onMoveToTrash}
        onRemoveFromFolder={onRemoveFromFolder}
        onRestore={onRestore}
        onPermanentDelete={onPermanentDelete}
      />
    </MoodboardWrapper>
  );
};

export default Moodboard;
