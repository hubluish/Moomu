"use client";
import React, { useState, useEffect, ReactNode } from "react";
import { supabase } from "@/utils/supabase";
import { restoreMoodboard, permanentDeleteMoodboard } from "@/utils/moodboard";
import Sidebar from "@/components/section/mypage/Sidebar";
import Moodboard from "@/components/section/mypage/moodboard/Moodboard";
import Toast from "@/components/common/toast/Toast";
import ConfirmModal from "@/components/common/ConfirmModal/ConfirmModal";

interface MoodboardResult {
  id: string;
  cover_image_url: string | null;
  tags: string[];
  created_at: string;
}

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
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);

  const displayToast = (message: string) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
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
      displayToast("무드보드가 복구 되었어요");
    } catch (error) {
      console.error("복구 실패:", error);
      displayToast("복구에 실패했습니다.");
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
      displayToast("피드가 영구삭제 되었어요");
    } catch (error) {
      console.error("삭제 실패:", error);
      displayToast("삭제에 실패했습니다.");
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
    <div style={{ display: "flex" }}>
      <Sidebar />
      <main style={{ flex: 1, padding: "50px 70px" }}>
        <h1 style={{ marginBottom: "30px" }}>휴지통</h1>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(332px, 1fr))",
            gap: "45px 28px",
          }}
        >
          {isLoading ? (
            <p>목록을 불러오는 중...</p>
          ) : trashedMoodboards.length === 0 ? (
            <p>휴지통이 비어있습니다.</p>
          ) : (
            trashedMoodboards.map((board) => {
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
                />
              );
            })
          )}
        </div>
      </main>

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
      <Toast message={toastMessage} show={showToast} />
    </div>
  );
};

export default TrashPage;
