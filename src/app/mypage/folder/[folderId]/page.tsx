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
  color_keyword: string[];
  font_keyword: string;
  image_keyword: string;
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
    // folderId가 유효할 때만 데이터를 불러오도록 조건을 추가합니다.
    if (folderId) {
      const fetchData = async () => {
        try {
          const folderData = await getFolderById(folderId);
          setFolderName(folderData.name);

          const moodboardData = await getMoodboardsByFolder(folderId);
          setMoodboards(moodboardData);
        } catch (error) {
          console.error("데이터 로딩 실패:", error);
        }
      };
      fetchData();
    }
  }, [folderId]);

  // 👇 2. 모달 핸들러 함수 추가
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
          style={
            {
              /* ... grid styles ... */
            }
          }
        >
          {/* 👇 1. 로딩 중일 때 표시할 UI 추가 */}
          {isLoading ? (
            <p>무드보드를 불러오는 중입니다...</p>
          ) : (
            moodboards.map((board) => {
              const allKeywords = [
                board.color_keyword,
                board.font_keyword,
                board.image_keyword,
              ].flat();

              return (
                <Moodboard
                  key={board.id}
                  id={board.id}
                  imageUrl={board.cover_image_url}
                  keywords={allKeywords}
                  date={board.created_at}
                  type="folder"
                  // 👇 2. onAddToFolder에 핸들러 함수 연결
                  onAddToFolder={() => handleOpenFolderModal(board.id)}
                />
              );
            })
          )}
        </div>
      </main>

      {/* 👇 2. 모달 렌더링 로직 추가 */}
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
