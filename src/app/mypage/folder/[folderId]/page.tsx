"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { getFolderById, getMoodboardsByFolder } from "@/utils/folders";
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

  useEffect(() => {
    if (folderId) {
      const fetchData = async () => {
        setIsLoading(true);
        try {
          const folderData = await getFolderById(folderId);
          setFolderName(folderData.name);

          const moodboardData = await getMoodboardsByFolder(folderId);
          setMoodboards(moodboardData);
        } catch (error) {
          console.error("데이터 로딩 실패:", error);
        } finally {
          setIsLoading(false);
        }
      };
      fetchData();
    }
  }, [folderId]);

  const handleOpenFolderModal = (moodboardId: string) => {
    setSelectedMoodboardId(moodboardId);
    setIsFolderModalOpen(true);
  };

  const handleCloseFolderModal = () => {
    setIsFolderModalOpen(false);
    setSelectedMoodboardId(null);
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
                  imageUrl={board.cover_image_url} // cover_image_url 사용
                  keywords={allKeywords}
                  date={board.created_at}
                  type="folder"
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
        />
      )}
    </div>
  );
};

export default FolderDetailPage;
