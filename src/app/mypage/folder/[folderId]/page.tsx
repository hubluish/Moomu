"use client";
import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "next/navigation";
import { getFolderById, getMoodboardsByFolder } from "@/utils/folders";
import { removeMoodboardFromFolder } from "@/utils/folders";
import { moveMoodboardToTrash } from "@/utils/moodboard";
import Sidebar from "@/components/section/mypage/Sidebar";
import Moodboard from "@/components/section/mypage/moodboard/Moodboard";
import FolderListModal from "@/components/section/mypage/folder/FolderListModal";
import Link from "next/link";
import Image from "next/image";

interface MoodboardResult {
  id: string;
  cover_image_url: string | null;
  tags: string[];
  created_at: string;
}

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

  const fetchData = useCallback(async () => {
    if (!folderId) return; // folderId가 없을 경우 실행 방지

    setIsLoading(true);
    try {
      const folderData = await getFolderById(folderId);
      setFolderName(folderData.name);
      const moodboardData = await getMoodboardsByFolder(folderId);
      // 👇 2. API 반환 값의 타입을 명확히 지정해줍니다.
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

  const handleRemoveFromCurrentFolder = async (moodboardId: string) => {
    if (window.confirm("이 폴더에서 무드보드를 삭제하시겠습니까?")) {
      try {
        await removeMoodboardFromFolder(moodboardId, folderId);
        setMoodboards((prev) => prev.filter((m) => m.id !== moodboardId));
        alert("폴더에서 삭제되었습니다.");
      } catch (error) {
        console.error("삭제 실패:", error);
        alert("삭제에 실패했습니다.");
      }
    }
  };

  const handleMoveToTrash = async (moodboardId: string) => {
    if (window.confirm("무드보드를 휴지통으로 이동하시겠습니까?")) {
      try {
        await moveMoodboardToTrash(moodboardId);
        setMoodboards((prev) => prev.filter((m) => m.id !== moodboardId));
        alert("휴지통으로 이동했습니다.");
      } catch (error) {
        console.error("이동 실패:", error);
        alert("이동에 실패했습니다.");
      }
    }
  };

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />

      <main style={{ flex: 1, padding: "50px 70px" }}>
        <h1
          style={{
            marginBottom: "30px",
            display: "flex",
            alignItems: "center",
            gap: "20px",
          }}
        >
          <Link href="/mypage/folder">
            <Image
              src="/assets/icons/left.svg"
              alt="뒤로가기"
              width={24}
              height={24}
            />
          </Link>
          {folderName}
        </h1>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(332px, 1fr))",
            gap: "45px 28px",
          }}
        >
          {isLoading ? (
            <p>무드보드를 불러오는 중입니다...</p>
          ) : (
            moodboards.map((board) => {
              const allKeywords = (board.tags || []).slice(0, 4);

              return (
                <Moodboard
                  key={board.id}
                  id={board.id}
                  imageUrl={board.cover_image_url}
                  keywords={allKeywords}
                  date={board.created_at}
                  type="folder"
                  onRemoveFromFolder={() =>
                    handleRemoveFromCurrentFolder(board.id)
                  }
                  onMoveToTrash={() => handleMoveToTrash(board.id)}
                  onAddToFolder={() => handleOpenFolderModal(board.id)}
                />
              );
            })
          )}
        </div>
      </main>

      {isFolderModalOpen && selectedMoodboardId && (
        <FolderListModal
          moodboardId={selectedMoodboardId}
          onClose={handleCloseFolderModal}
          currentFolderId={folderId}
          onSuccess={() => {
            fetchData();
            handleCloseFolderModal();
          }}
        />
      )}
    </div>
  );
};

export default FolderDetailPage;
