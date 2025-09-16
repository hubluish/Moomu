"use client";
import React, { useState, useEffect } from "react";
import { supabase } from "@/utils/supabase";
import { restoreMoodboard, permanentDeleteMoodboard } from "@/utils/moodboard";
import Sidebar from "@/components/section/mypage/Sidebar";
import Moodboard from "@/components/section/mypage/moodboard/Moodboard";

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
    if (window.confirm("이 무드보드를 복구하시겠습니까?")) {
      try {
        await restoreMoodboard(moodboardId);
        // 화면에서 즉시 제거
        setTrashedMoodboards((prev) =>
          prev.filter((m) => m.id !== moodboardId)
        );
        alert("무드보드가 복구되었습니다.");
      } catch (error) {
        console.error("복구 실패:", error);
        alert("복구에 실패했습니다.");
      }
    }
  };

  // 영구 삭제 핸들러
  const handlePermanentDelete = async (moodboardId: string) => {
    if (
      window.confirm(
        "정말로 영구 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다."
      )
    ) {
      try {
        await permanentDeleteMoodboard(moodboardId);
        // 화면에서 즉시 제거
        setTrashedMoodboards((prev) =>
          prev.filter((m) => m.id !== moodboardId)
        );
        alert("무드보드가 영구적으로 삭제되었습니다.");
      } catch (error) {
        console.error("삭제 실패:", error);
        alert("삭제에 실패했습니다.");
      }
    }
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
                  onRestore={() => handleRestore(board.id)}
                  onPermanentDelete={() => handlePermanentDelete(board.id)}
                />
              );
            })
          )}
        </div>
      </main>
    </div>
  );
};

export default TrashPage;
