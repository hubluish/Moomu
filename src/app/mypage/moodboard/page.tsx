"use client";
import Moodboard from "@/components/section/mypage/moodboard/Moodboard";
import { supabase } from "@/utils/supabase";
import Sidebar from "@/components/section/mypage/Sidebar";
import FolderListModal from "@/components/section/mypage/folder/FolderListModal";
import React, { useState, useEffect } from "react";
interface MoodboardResult {
  id: string;
  thumbnail_url: string | null;
  color_keyword: string;
  font_keyword: string;
  image_keyword: string;
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
        .from("moodboard_results")
        .select("*");
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
              const allKeywords = [
                board.color_keyword,
                board.font_keyword,
                board.image_keyword,
              ].flat();

              return (
                <Moodboard
                  key={board.id}
                  id={board.id}
                  imageUrl={board.thumbnail_url}
                  keywords={allKeywords}
                  date={board.created_at}
                  type="mymoodboard"
                  onAddToFolder={() => handleOpenFolderModal(board.id)}
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
