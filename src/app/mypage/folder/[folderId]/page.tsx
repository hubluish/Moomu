"use client";
import React, { useState, useEffect, useCallback, ReactNode } from "react";
import { useParams } from "next/navigation";
import { getFolderById, getMoodboardsByFolder } from "@/utils/folders";
import { removeMoodboardFromFolder } from "@/utils/folders";
import { moveMoodboardToTrash } from "@/utils/moodboard";
import Sidebar from "@/components/section/mypage/Sidebar";
import MoodboardModal from "@/app/feed/MoodboardModal";
import Moodboard from "@/components/section/mypage/moodboard/Moodboard";
import FolderListModal from "@/components/section/mypage/folder/FolderListModal";
import Toast from "@/components/common/toast/Toast";
import Link from "next/link";
import Image from "next/image";
import ConfirmModal from "@/components/common/ConfirmModal/ConfirmModal";
import { MoodboardGridSkeleton } from "@/components/section/mypage/moodboard/MoodboardSkeleton";

interface MoodboardResult {
  id: string;
  cover_image_url: string | null;
  tags: string[];
  created_at: string;
  is_public: boolean;
}

const TrashIcon = () => (
  <Image
    src="/assets/icons/trash.svg"
    alt="휴지통"
    width={25}
    height={25}
    draggable="false"
  />
);

const ErrorIcon = () => (
  <Image
    src="/assets/icons/error-cross.svg"
    alt="실패"
    width={25}
    height={25}
    draggable="false"
  />
);

const FolderIcon = () => (
  <Image
    src="/assets/icons/folder.svg"
    alt="폴더"
    width={25}
    height={25}
    draggable="false"
  />
);

const FolderDetailPage = () => {
  const params = useParams();
  const folderId = params?.folderId as string;

  const [folderName, setFolderName] = useState("");
  const [moodboards, setMoodboards] = useState<MoodboardResult[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [isFolderModalOpen, setIsFolderModalOpen] = useState(false);
  const [selectedMoodboardId, setSelectedMoodboardId] = useState<string | null>(
    null
  );

  const [isBoardModalOpen, setBoardModalOpen] = useState(false);
  const [selectedBoardIdForModal, setSelectedBoardIdForModal] = useState<
    string | null
  >(null);

  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [confirmAction, setConfirmAction] = useState<() => void>(() => {});
  const [modalTitle, setModalTitle] = useState("");
  const [modalVariant, setModalVariant] = useState<"default" | "danger">(
    "default"
  );

  const [toastInfo, setToastInfo] = useState<{
    message: string;
    show: boolean;
    icon?: ReactNode;
  }>({
    message: "",
    show: false,
    icon: undefined,
  });

  const displayToast = (message: string, icon?: ReactNode) => {
    setToastInfo({ message, show: true, icon });

    setTimeout(() => {
      setToastInfo((prev) => ({ ...prev, show: false }));
    }, 3000);
  };

  const fetchData = useCallback(async () => {
    if (!folderId) return;

    setIsLoading(true);
    try {
      const folderData = await getFolderById(folderId);
      setFolderName(folderData.name);
      const moodboardData = await getMoodboardsByFolder(folderId);
      setMoodboards(moodboardData as MoodboardResult[]);
    } catch (error) {
      console.error("데이터 로딩 실패:", error);
    } finally {
      setIsLoading(false);
    }
  }, [folderId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleOpenFolderModal = (moodboardId: string) => {
    setSelectedMoodboardId(moodboardId);
    setIsFolderModalOpen(true);
  };

  const handleCloseFolderModal = () => {
    setIsFolderModalOpen(false);
    setSelectedMoodboardId(null);
  };

  const handleMoodboardClick = (moodboardId: string) => {
    setSelectedBoardIdForModal(moodboardId);
    setBoardModalOpen(true);
  };

  const handleCloseBoardModal = () => {
    setBoardModalOpen(false);
    setSelectedBoardIdForModal(null);
  };

  const handleRemoveFromCurrentFolder = async (moodboardId: string) => {
    try {
      await removeMoodboardFromFolder(moodboardId, folderId);
      setMoodboards((prev) => prev.filter((m) => m.id !== moodboardId));
      displayToast("폴더에서 삭제되었어요", <FolderIcon />);
    } catch (error) {
      console.error("삭제 실패:", error);
      displayToast("삭제에 실패했어요.", <ErrorIcon />);
    }
  };

  const openRemoveConfirmModal = (moodboardId: string) => {
    setModalTitle("이 폴더에서 무드보드를 삭제하시겠습니까?");
    setConfirmAction(() => () => handleRemoveFromCurrentFolder(moodboardId));
    setModalVariant("danger");
    setIsConfirmOpen(true);
  };

  const handleMoveToTrash = async (moodboardId: string) => {
    try {
      await moveMoodboardToTrash(moodboardId);
      setMoodboards((prev) => prev.filter((m) => m.id !== moodboardId));
      displayToast("휴지통으로 이동했어요", <TrashIcon />);
    } catch (error) {
      console.error("이동 실패:", error);
      displayToast("이동에 실패했어요.", <ErrorIcon />);
    }
  };

  const openTrashConfirmModal = (moodboardId: string) => {
    setModalTitle("무드보드를 휴지통으로 이동하시겠습니까?");
    setConfirmAction(() => () => handleMoveToTrash(moodboardId)); // API 함수가 아닌 핸들러 함수 연결
    setModalVariant("default");
    setIsConfirmOpen(true);
  };

  return (
    <div style={{ display: "flex", height: "100vh", marginTop: "64px" }}>
      <Sidebar />

      <main
        style={{
          flex: 1,
          padding: "50px 70px",
          display: "flex",
          flexDirection: "column",
          overflowY: "auto",
        }}
      >
        <h1
          style={{
            marginBottom: "30px",
            display: "flex",
            alignItems: "center",
            gap: "20px",
            userSelect: "none",
          }}
        >
          <Link href="/mypage/folder">
            <Image
              src="/assets/icons/left.svg"
              alt="뒤로가기"
              width={24}
              height={24}
              draggable="false"
            />
          </Link>
          {isLoading ? "..." : folderName}
        </h1>

        <div style={{ flex: 1, display: "grid" }}>
          {isLoading ? (
            <MoodboardGridSkeleton count={6} />
          ) : moodboards.length === 0 ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                height: "100%",
                color: "#888",
              }}
            >
              <p>이 폴더에 무드보드가 없습니다.</p>
            </div>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(332px, 1fr))",
                gap: "45px 28px",
              }}
            >
              {moodboards.map((board) => {
                const allKeywords = (board.tags || []).slice(0, 4);

                return (
                  <div
                    key={board.id}
                    onClick={() => handleMoodboardClick(board.id)}
                    style={{ cursor: "pointer" }}
                  >
                    <Moodboard
                      key={board.id}
                      id={board.id}
                      imageUrl={board.cover_image_url}
                      keywords={allKeywords}
                      date={board.created_at}
                      type="folder"
                      onRemoveFromFolder={() =>
                        openRemoveConfirmModal(board.id)
                      }
                      onMoveToTrash={() => openTrashConfirmModal(board.id)}
                      onAddToFolder={() => handleOpenFolderModal(board.id)}
                      isPublic={board.is_public}
                      onTogglePublic={(_moodboardId: string) => {}}
                    />
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>

      {isFolderModalOpen && selectedMoodboardId && (
        <FolderListModal
          moodboardId={selectedMoodboardId}
          onClose={handleCloseFolderModal}
          currentFolderId={folderId}
          onSuccess={(movedFolderName) => {
            displayToast(
              `'${movedFolderName}' 폴더로 이동했어요`,
              <FolderIcon />
            );
            fetchData();
            handleCloseFolderModal();
          }}
          displayToast={displayToast}
        />
      )}

      <ConfirmModal
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={() => {
          confirmAction();
          setIsConfirmOpen(false);
        }}
        title={modalTitle}
        confirmText="삭제"
        variant={modalVariant}
      />

      <MoodboardModal
        moodboardId={selectedBoardIdForModal}
        open={isBoardModalOpen}
        onClose={handleCloseBoardModal}
      />

      <Toast
        message={toastInfo.message}
        show={toastInfo.show}
        icon={toastInfo.icon}
      />
    </div>
  );
};

export default FolderDetailPage;
