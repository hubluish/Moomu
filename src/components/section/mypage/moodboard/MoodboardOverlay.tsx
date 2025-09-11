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
};

const MoodboardOverlay = ({
  type,
  moodboardId,
  date,
  authorName,
  onAddToFolder,
}: MoodboardOverlayProps) => {
  const [showDeleteOptions, setShowDeleteOptions] = useState(false);

  // 각 아이콘 클릭 시 실행될 함수
  const handleMoveToFolder = () => alert(`${moodboardId}를 다른 폴더로 이동`);
  const handleTogglePublic = () => alert(`${moodboardId} 공개 상태 변경`);
  const handleMoveToTrash = () => alert(`${moodboardId}를 휴지통으로`);
  const handleRestore = () => alert(`${moodboardId} 복구`);
  const handlePermanentDelete = () => alert(`${moodboardId} 영구 삭제`);
  const handleRemoveFromFolder = () =>
    alert(`${moodboardId}를 현재 폴더에서만 삭제`);

  const renderOverlayContent = () => {
    switch (type) {
      case "mymoodboard":
        return (
          <>
            <IconButton
              onClick={onAddToFolder} // 이제 오류 없이 정상적으로 사용 가능
              src="/assets/icons/folder.svg"
              alt="폴더에 추가"
            />
            <IconButton
              onClick={handleTogglePublic}
              src="/assets/icons/lock.svg"
              alt="공개/비공개"
            />
            <IconButton
              onClick={handleMoveToTrash}
              src="/assets/icons/trash.svg"
              alt="휴지통으로"
            />
            <DateText>{new Date(date).toLocaleDateString()}</DateText>
          </>
        );

      case "folder":
        if (showDeleteOptions) {
          return (
            <DeleteOptionsWrapper>
              <DeleteOptionButton onClick={handleRemoveFromFolder}>
                폴더에서 삭제
              </DeleteOptionButton>
              <span style={{ color: "#ccc" }}>|</span>
              <DeleteOptionButton onClick={handleMoveToTrash}>
                <Image
                  src="/assets/icons/trash.svg"
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
              onClick={handleMoveToFolder}
              src="/assets/icons/folder.svg"
              alt="폴더 이동"
            />
            <IconButton
              onClick={() => setShowDeleteOptions(true)}
              src="/assets/icons/trash.svg"
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
              onClick={handleRestore}
              src="/assets/icons/restore.svg"
              alt="복구"
            />
            <IconButton
              onClick={handlePermanentDelete}
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
