"use client";
import Image from "next/image";
import Moodboard from "@/components/section/mypage/moodboard/Moodboard";
import { supabase } from "@/utils/supabase";
import Sidebar from "@/components/section/mypage/Sidebar";
import FolderListModal from "@/components/section/mypage/folder/FolderListModal";
import {
  moveMoodboardToTrash,
  toggleMoodboardPublicStatus,
} from "@/utils/moodboard";
import React, { useState, useEffect, ReactNode } from "react";
import Toast from "@/components/common/toast/Toast";
import ConfirmModal from "@/components/common/ConfirmModal/ConfirmModal";
import { MoodboardGridSkeleton } from "@/components/section/mypage/moodboard/MoodboardSkeleton";
interface MoodboardResult {
  id: string;
  cover_image_url: string | null;
  tags: string[];
  created_at: string;
  is_public: boolean;
  owner_id: string;
  request_id: string;
  title: string;
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

const OpenIcon = () => (
  <Image
    src="/assets/icons/open-icon.svg"
    alt="열기"
    width={25}
    height={25}
    draggable="false"
  />
);

const LockIcon = () => (
  <Image
    src="/assets/icons/lock-icon.svg"
    alt="잠금"
    width={25}
    height={25}
    draggable="false"
  />
);

const MoodboardPage = () => {
  const [moodboards, setMoodboards] = useState<MoodboardResult[]>([]);
  const [isFolderModalOpen, setIsFolderModalOpen] = useState(false);
  const [selectedMoodboardId, setSelectedMoodboardId] = useState<string | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);

  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [confirmAction, setConfirmAction] = useState<() => void>(() => {});
  const [modalTitle, setModalTitle] = useState("");

  const [toastInfo, setToastInfo] = useState<{
    message: string;
    show: boolean;
    icon?: ReactNode;
  }>({
    message: "",
    show: false,
    icon: undefined,
  });

  useEffect(() => {
    const fetchMoodboards = async () => {
      setIsLoading(true);
      const { data, error } = await supabase
        .from("moodboard")
        .select("*")
        .is("deleted_at", null);

      if (error) console.error("Error fetching moodboards:", error);
      else if (data) setMoodboards(data);
      setIsLoading(false);
    };
    fetchMoodboards();
  }, []);

  const displayToast = (message: string, icon?: ReactNode) => {
    setToastInfo({ message, show: true, icon });

    setTimeout(() => {
      setToastInfo((prev) => ({ ...prev, show: false }));
    }, 3000);
  };

  const handleTogglePublic = async (board: MoodboardResult) => {
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) {
        displayToast("로그인이 필요해요.", <ErrorIcon />);
        return;
      }

      let authorName = "익명 사용자"; // 기본값

      // 1. profiles 테이블에서 이름 먼저 조회
      const { data: profile } = await supabase
        .from("profiles")
        .select("name")
        .eq("id", session.user.id)
        .single();

      if (profile?.name) {
        authorName = profile.name;
      }
      // 2. profiles에 없으면, Auth 메타데이터(소셜 로그인 시 저장된 이름)를 사용
      else if (session.user.user_metadata?.full_name) {
        authorName = session.user.user_metadata.full_name;
      }

      // API 함수에 찾은 authorName을 전달
      const newStatus = await toggleMoodboardPublicStatus(board, authorName);

      setMoodboards((prev) =>
        prev.map((m) =>
          m.id === board.id ? { ...m, is_public: newStatus } : m
        )
      );
      displayToast(
        newStatus ? "피드가 공개 되었어요!" : "피드가 비공개 되었어요.",
        newStatus ? <OpenIcon /> : <LockIcon />
      );
    } catch (error) {
      console.error("상태 변경 실패:", error);
      displayToast("상태 변경에 실패했어요.", <ErrorIcon />);
    }
  };

  const handleMoveToTrash = async (moodboardId: string) => {
    try {
      await moveMoodboardToTrash(moodboardId);
      setMoodboards((prev) => prev.filter((board) => board.id !== moodboardId));
      displayToast("휴지통으로 이동했어요.", <TrashIcon />);
    } catch {
      displayToast("작업에 실패했어요.", <ErrorIcon />);
    }
  };

  const openTrashConfirmModal = (moodboardId: string) => {
    setModalTitle("이 무드보드를 휴지통으로 이동하시겠습니까?");
    setConfirmAction(() => () => handleMoveToTrash(moodboardId));
    setIsConfirmOpen(true);
  };

  const handleOpenFolderModal = (moodboardId: string) => {
    setSelectedMoodboardId(moodboardId);
    setIsFolderModalOpen(true);
  };

  const handleCloseFolderModal = () => {
    setIsFolderModalOpen(false);
    setSelectedMoodboardId(null);
  };

  const handleAddToFolderSuccess = (folderName: string) => {
    displayToast(`'${folderName}' 폴더에 추가했어요.`, <FolderIcon />);
    handleCloseFolderModal();
  };

  return (
    <div>
      <div style={{ display: "flex", marginTop: "64px" }}>
        <Sidebar />

        <main style={{ flex: 1, padding: "50px 70px" }}>
          <h1 style={{ marginBottom: "30px", userSelect: "none" }}>
            내 무드보드
          </h1>
          <div>
            {isLoading ? (
              <MoodboardGridSkeleton count={6} />
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
                    <Moodboard
                      key={board.id}
                      id={board.id}
                      imageUrl={board.cover_image_url}
                      keywords={allKeywords}
                      date={board.created_at}
                      type="mymoodboard"
                      onAddToFolder={() => handleOpenFolderModal(board.id)}
                      onMoveToTrash={() => openTrashConfirmModal(board.id)}
                      isPublic={board.is_public}
                      onTogglePublic={() => handleTogglePublic(board)}
                    />
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
            onSuccess={handleAddToFolderSuccess}
            displayToast={displayToast}
          />
        )}
      </div>

      <ConfirmModal
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={() => {
          confirmAction();
          setIsConfirmOpen(false);
        }}
        title={modalTitle}
        confirmText="이동"
      />

      <Toast
        message={toastInfo.message}
        show={toastInfo.show}
        icon={toastInfo.icon}
      />
    </div>
  );
};

export default MoodboardPage;
