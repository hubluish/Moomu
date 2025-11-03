"use client";

import React from "react";
import {
  MoodboardWrapper,
  CategoryContainer,
  CategoryChip,
  ImageWrapper,
  ThumbnailImage,
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
  onUnlike?: (postId: string) => void;
  onClick?: (e: React.MouseEvent) => void;
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
  onUnlike,
  onClick,
}: MoodboardProps) => {
  const displayImage = imageUrl || "/assets/images/sky.png";

  return (
    <MoodboardWrapper onClick={onClick}>
      <CategoryContainer>
        {keywords
          .filter((keyword) => keyword)
          .map((keyword, index) => (
            <CategoryChip key={index}>{keyword}</CategoryChip>
          ))}
      </CategoryContainer>

      <ImageWrapper>
        <ThumbnailImage
          src={displayImage}
          alt="무드보드 썸네일"
          width={311}
          height={140}
          style={{
            objectFit: "cover",
            borderRadius: "8px",
          }}
          draggable="false"
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
        onUnlike={() => onUnlike?.(id)}
      />
    </MoodboardWrapper>
  );
};

export default Moodboard;
