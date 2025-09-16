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
}: MoodboardOverlayProps) => {
  const [showDeleteOptions, setShowDeleteOptions] = useState(false);

  const handleTogglePublic = () => alert(`${moodboardId} 공개 상태 변경`);

  const renderOverlayContent = () => {
    switch (type) {
      case "mymoodboard":
        return (
          <>
            <IconButton
              onClick={onAddToFolder}
              src="/assets/icons/folder-icon.svg"
              alt="폴더에 추가"
            />
            <IconButton
              onClick={handleTogglePublic}
              src="/assets/icons/lock-icon.svg"
              alt="공개/비공개"
            />
            <IconButton
              onClick={() => onMoveToTrash(moodboardId)}
              src="/assets/icons/trash-icon.svg"
              alt="휴지통으로"
            />
            <DateText>{new Date(date).toLocaleDateString()}</DateText>
          </>
        );

      case "folder":
        if (showDeleteOptions) {
          return (
            <DeleteOptionsWrapper>
              <DeleteOptionButton
                onClick={() => onRemoveFromFolder?.(moodboardId)}
              >
                폴더에서 삭제
              </DeleteOptionButton>
              <span style={{ color: "#ccc" }}>|</span>
              <DeleteOptionButton onClick={() => onMoveToTrash(moodboardId)}>
                <Image
                  src="/assets/icons/trash-icon.svg"
                  alt="휴지통"
                  width={16}
                  height={16}
                />
                휴지통
              </DeleteOptionButton>
            </DeleteOptionsWrapper>
          );
        }
        return (
          <>
            <IconButton
              onClick={onAddToFolder}
              src="/assets/icons/folder-icon.svg"
              alt="폴더 이동"
            />
            <IconButton
              onClick={() => setShowDeleteOptions(true)}
              src="/assets/icons/trash-icon.svg"
              alt="삭제 옵션"
            />
          </>
        );

      case "favorite":
        return (
          <>
            <AuthorName>{authorName || "작성자"}</AuthorName>
            <HeartIcon src="/assets/icons/heart-filled.svg" alt="찜하기" />
          </>
        );

      case "trash":
        return (
          <>
            <IconButton
              onClick={() => onRestore?.(moodboardId)}
              src="/assets/icons/restore.svg"
              alt="복구"
            />
            <IconButton
              onClick={() => onPermanentDelete?.(moodboardId)}
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
