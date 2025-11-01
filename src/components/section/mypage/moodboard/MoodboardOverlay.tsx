import React, { useState } from "react";
import {
  OverlayWrapper,
  DateText,
  DeleteOptionsWrapper,
  DeleteOptionButton,
  AuthorName,
  HeartIcon,
} from "./moodboard.styled";
import IconButton from "../common/IconButton";
import Image from "next/image";

type MoodboardOverlayProps = {
  type: "mymoodboard" | "folder" | "favorite" | "trash";
  moodboardId: string;
  date: string;
  authorName?: string;
  onAddToFolder: () => void;
  onMoveToTrash: (moodboardId: string) => void;
  onRemoveFromFolder?: (moodboardId: string) => void;
  onRestore?: (moodboardId: string) => void;
  onPermanentDelete?: (moodboardId: string) => void;
  isPublic: boolean;
  onTogglePublic: (moodboardId: string) => void;
  onUnlike?: () => void;
};

const MoodboardOverlay = ({
  type,
  moodboardId,
  date,
  authorName,
  onAddToFolder,
  onMoveToTrash,
  onRemoveFromFolder,
  onRestore,
  onPermanentDelete,
  isPublic,
  onTogglePublic,
  onUnlike,
}: MoodboardOverlayProps) => {
  const [showDeleteOptions, setShowDeleteOptions] = useState(false);

  const renderOverlayContent = () => {
    switch (type) {
      case "mymoodboard":
        return (
          <>
            <IconButton
              onClick={(e) => {
                e.stopPropagation();
                onAddToFolder();
              }}
              src="/assets/icons/folder-icon.svg"
              alt="폴더에 추가"
            />
            <IconButton
              onClick={(e) => {
                e.stopPropagation();
                onTogglePublic(moodboardId);
              }}
              src={
                isPublic
                  ? "/assets/icons/open-icon.svg"
                  : "/assets/icons/lock-icon.svg"
              }
              alt="공개/비공개"
            />
            <IconButton
              onClick={(e) => {
                e.stopPropagation();
                onMoveToTrash(moodboardId);
              }}
              src="/assets/icons/trash-icon.svg"
              alt="휴지통으로"
            />
            <DateText>{new Date(date).toLocaleDateString()}</DateText>
          </>
        );

      case "folder":
        if (showDeleteOptions) {
          return (
            <DeleteOptionsWrapper onClick={(e) => e.stopPropagation()}>
              <DeleteOptionButton
                onClick={() => onRemoveFromFolder?.(moodboardId)}
              >
                폴더에서 삭제
              </DeleteOptionButton>
              <span style={{ color: "#ccc" }}>|</span>
              <DeleteOptionButton onClick={() => onMoveToTrash(moodboardId)}>
                <Image
                  src="/assets/icons/red-trash.svg"
                  alt="휴지통"
                  width={16}
                  height={16}
                  draggable="false"
                />
                휴지통
              </DeleteOptionButton>
            </DeleteOptionsWrapper>
          );
        }
        return (
          <>
            <IconButton
              onClick={(e) => {
                e.stopPropagation();
                onAddToFolder();
              }}
              src="/assets/icons/folder-icon.svg"
              alt="폴더 이동"
            />
            <IconButton
              onClick={(e) => {
                e.stopPropagation();
                setShowDeleteOptions(true);
              }}
              src="/assets/icons/trash-icon.svg"
              alt="삭제 옵션"
            />
          </>
        );

      case "favorite":
        return (
          <>
            <AuthorName>{authorName || "작성자"}</AuthorName>
            <HeartIcon
              src="/assets/icons/heart-filled.svg"
              alt="찜 취소"
              onClick={(e) => {
                e.stopPropagation();
                onUnlike?.();
              }}
            />
          </>
        );

      case "trash":
        return (
          <>
            <IconButton
              onClick={(e) => {
                e.stopPropagation();
                onRestore?.(moodboardId);
              }}
              src="/assets/icons/restore.svg"
              alt="복구"
            />
            <IconButton
              onClick={(e) => {
                e.stopPropagation();
                onPermanentDelete?.(moodboardId);
              }}
              src="/assets/icons/delete-forever.svg"
              alt="영구 삭제"
              variant="danger"
            />
          </>
        );
      default:
        return null;
    }
  };

  return <OverlayWrapper>{renderOverlayContent()}</OverlayWrapper>;
};

export default MoodboardOverlay;
