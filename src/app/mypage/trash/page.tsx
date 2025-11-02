"use client";
import Image from "next/image";
import React, { useState, useEffect, ReactNode } from "react";
import { supabase } from "@/utils/supabase";
import styled from "styled-components";
import Footer from "@/components/common/footer/Footer";
import { restoreMoodboard, permanentDeleteMoodboard } from "@/utils/moodboard";
import Sidebar from "@/components/section/mypage/Sidebar";
import Moodboard from "@/components/section/mypage/moodboard/Moodboard";
import Toast from "@/components/common/toast/Toast";
import ConfirmModal from "@/components/common/ConfirmModal/ConfirmModal";
import { MoodboardGridSkeleton } from "@/components/section/mypage/moodboard/MoodboardSkeleton";

interface MoodboardResult {
  id: string;
  cover_image_url: string | null;
  tags: string[];
  created_at: string;
}

const MoodboardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(332px, 1fr));
  gap: 28px;

  @media (max-width: 1421px) {
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 20px;
  }

  @media (max-width: 1309px) {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 20px;
  }

  @media (max-width: 1249px) {
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: 16px;
  }
  @media (max-width: 1121px) {
    grid-template-columns: repeat(auto-fill, minmax(210px, 1fr));
  }
`;

const Wrapper = styled.div`
  flex: 1;
  padding: 50px 70px;
  display: flex;
  flex-direction: column;
  overflow-y: auto;

  @media (max-width: 439px) {
    padding: 30px 50px;
  }

  @media (max-width: 379px) {
    padding: 30px 22px;
  }
`;

const RestoreIcon = () => (
  <Image src="/assets/icons/restore.svg" alt="복구" width={25} height={25} />
);

const DeleteForeverIcon = () => (
  <Image
    src="/assets/icons/delete-forever.svg"
    alt="영구삭제"
    width={25}
    height={25}
  />
);

const ErrorIcon = () => (
  <Image
    src="/assets/icons/error-cross.svg"
    alt="실패"
    width={25}
    height={25}
  />
);

const TrashPage = ({}) => {
  const [trashedMoodboards, setTrashedMoodboards] = useState<MoodboardResult[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(true);

  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [confirmAction, setConfirmAction] = useState<() => void>(() => {});
  const [modalTitle, setModalTitle] = useState<ReactNode>("");
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

  const fetchTrashedMoodboards = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from("moodboard")
        .select("*")
        .not("deleted_at", "is", null)
        .order("deleted_at", { ascending: false });

      if (error) throw error;
      setTrashedMoodboards(data || []);
    } catch (error) {
      console.error("휴지통 목록 로딩 실패:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTrashedMoodboards();
  }, []);

  const handleRestore = async (moodboardId: string) => {
    try {
      await restoreMoodboard(moodboardId);
      setTrashedMoodboards((prev) => prev.filter((m) => m.id !== moodboardId));
      displayToast("무드보드가 복구 되었어요.", <RestoreIcon />);
    } catch {
      displayToast("복구에 실패했어요.", <ErrorIcon />);
    }
  };

  const openRestoreConfirmModal = (moodboardId: string) => {
    setModalTitle("이 무드보드를 복구하시겠습니까?");
    setConfirmAction(() => () => handleRestore(moodboardId));
    setModalVariant("default");
    setIsConfirmOpen(true);
  };

  const handlePermanentDelete = async (moodboardId: string) => {
    try {
      await permanentDeleteMoodboard(moodboardId);
      setTrashedMoodboards((prev) => prev.filter((m) => m.id !== moodboardId));
      displayToast("피드가 영구삭제 되었어요.", <DeleteForeverIcon />);
    } catch {
      displayToast("삭제에 실패했어요.", <ErrorIcon />);
    }
  };

  const openDeleteConfirmModal = (moodboardId: string) => {
    setModalTitle(
      <>
        정말로 영구 삭제하시겠습니까?
        <br />
        되돌릴 수 없습니다.
      </>
    );
    setConfirmAction(() => () => handlePermanentDelete(moodboardId));
    setModalVariant("danger");
    setIsConfirmOpen(true);
  };

  return (
    <div>
      <div style={{ display: "flex", marginTop: "64px", minHeight: "100vh" }}>
        <Sidebar />
        <Wrapper>
          <h1 style={{ marginBottom: "30px", userSelect: "none" }}>휴지통</h1>

          <div style={{ flex: 1, display: "grid" }}>
            {isLoading ? (
              <MoodboardGridSkeleton count={6} />
            ) : trashedMoodboards.length === 0 ? (
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
                <p>휴지통이 비어있습니다.</p>
              </div>
            ) : (
              <MoodboardGrid>
                {trashedMoodboards.map((board) => {
                  const allKeywords = (board.tags || []).slice(0, 4);
                  return (
                    <Moodboard
                      key={board.id}
                      id={board.id}
                      imageUrl={board.cover_image_url}
                      keywords={allKeywords}
                      date={board.created_at}
                      type="trash"
                      onAddToFolder={() => {}}
                      onMoveToTrash={() => {}}
                      onRemoveFromFolder={() => {}}
                      onRestore={() => openRestoreConfirmModal(board.id)}
                      onPermanentDelete={() => openDeleteConfirmModal(board.id)}
                      isPublic={false}
                      onTogglePublic={(_moodboardId: string) => {}}
                    />
                  );
                })}
              </MoodboardGrid>
            )}
          </div>
        </Wrapper>

        <ConfirmModal
          isOpen={isConfirmOpen}
          onClose={() => setIsConfirmOpen(false)}
          onConfirm={() => {
            confirmAction();
            setIsConfirmOpen(false);
          }}
          title={modalTitle}
          confirmText={modalVariant === "danger" ? "영구 삭제" : "복구"}
          variant={modalVariant}
        />
        <Toast
          message={toastInfo.message}
          show={toastInfo.show}
          icon={toastInfo.icon}
        />
      </div>
      <Footer />
    </div>
  );
};

export default TrashPage;
