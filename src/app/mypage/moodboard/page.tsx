"use client";
import Moodboard from "@/components/section/mypage/moodboard/Moodboard";
import { supabase } from "@/utils/supabase";
import Sidebar from "@/components/section/mypage/Sidebar";
import FolderListModal from "@/components/section/mypage/folder/FolderListModal";
import { moveMoodboardToTrash } from "@/utils/moodboard";
import React, { useState, useEffect } from "react";
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

  const handleOpenFolderModal = (moodboardId: string) => {
    setSelectedMoodboardId(moodboardId);
    setIsFolderModalOpen(true);
  };

  const handleCloseFolderModal = () => {
    setIsFolderModalOpen(false);
    setSelectedMoodboardId(null);
  };

  const handleMoveToTrash = async (moodboardId: string) => {
    if (window.confirm("이 무드보드를 휴지통으로 이동하시겠습니까?")) {
      try {
        await moveMoodboardToTrash(moodboardId);
        // 화면에서도 바로 제거하여 사용자 경험을 개선
        setMoodboards((prevMoodboards) =>
          prevMoodboards.filter((board) => board.id !== moodboardId)
        );
        alert("무드보드를 휴지통으로 이동했습니다.");
      } catch (error) {
        alert("작업에 실패했습니다.");
      }
    }
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
                  onMoveToTrash={() => handleMoveToTrash(board.id)}
                />
              );
            })}
          </div>
        </main>

        {isFolderModalOpen && selectedMoodboardId && (
          <FolderListModal
            moodboardId={selectedMoodboardId}
            onClose={handleCloseFolderModal}
          />
        )}
      </div>
    </div>
  );
};

export default MoodboardPage;
