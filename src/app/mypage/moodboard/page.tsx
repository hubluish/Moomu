"use client";
import Moodboard from "@/components/section/mypage/moodboard/Moodboard";
import { supabase } from "@/utils/supabase";
import Sidebar from "@/components/section/mypage/Sidebar";
import FolderListModal from "@/components/section/mypage/folder/FolderListModal";
import { moveMoodboardToTrash } from "@/utils/moodboard";
import React, { useState, useEffect } from "react";
import Toast from "@/components/common/toast/Toast";
import ConfirmModal from "@/components/common/ConfirmModal/ConfirmModal";
interface MoodboardResult {
  id: string;
  cover_image_url: string | null;
  tags: string[];
  created_at: string;
}

const MoodboardPage = () => {
  const [moodboards, setMoodboards] = useState<MoodboardResult[]>([]);
  const [isFolderModalOpen, setIsFolderModalOpen] = useState(false);
  const [selectedMoodboardId, setSelectedMoodboardId] = useState<string | null>(
    null
  );

  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [confirmAction, setConfirmAction] = useState<() => void>(() => {});
  const [modalTitle, setModalTitle] = useState("");

  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    const fetchMoodboards = async () => {
      const { data, error } = await supabase
        .from("moodboard")
        .select("*")
        .is("deleted_at", null);

      if (error) console.error("Error fetching moodboards:", error);
      else if (data) setMoodboards(data);
    };
    fetchMoodboards();
  }, []);

  const displayToast = (message: string) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000); // 3초 후 사라짐
  };

  const handleMoveToTrash = async (moodboardId: string) => {
    try {
      await moveMoodboardToTrash(moodboardId);
      setMoodboards((prev) => prev.filter((board) => board.id !== moodboardId));
      displayToast("휴지통으로 이동했어요");
    } catch {
      displayToast("작업에 실패했습니다.");
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
    displayToast(`'${folderName}' 폴더에 추가했어요`);
    handleCloseFolderModal();
  };

  return (
    <div>
      <div style={{ display: "flex" }}>
        <Sidebar />

        <main style={{ flex: 1, padding: "50px 70px" }}>
          <h1 style={{ marginBottom: "30px" }}>내 무드보드</h1>

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
                />
              );
            })}
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

      <Toast message={toastMessage} show={showToast} />
    </div>
  );
};

export default MoodboardPage;
