"use client";
import React, { useState, useEffect } from "react";
import { getFolderById, getMoodboardsByFolder } from "@/utils/folders";
import Sidebar from "@/components/section/mypage/Sidebar";
import Moodboard from "@/components/section/mypage/moodboard/Moodboard";
import Link from "next/link";
import Image from "next/image";

interface MoodboardResult {
  id: string;
  thumbnail_url: string | null;
  color_keyword: string;
  font_keyword: string;
  image_keyword: string;
  created_at: string;
}

const FolderDetailPage = ({ params }: { params: { folderId: string } }) => {
  const [folderName, setFolderName] = useState("");
  const [moodboards, setMoodboards] = useState<MoodboardResult[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const folderData = await getFolderById(params.folderId);
        setFolderName(folderData.name);

        const moodboardData = await getMoodboardsByFolder(params.folderId);
        setMoodboards(moodboardData);
      } catch (error) {
        console.error("데이터 로딩 실패:", error);
      }
    };
    fetchData();
  }, [params.folderId]); // folderId가 바뀔 때마다 데이터를 다시 불러옴

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
                type="folder"
                onAddToFolder={() => alert(`${board.id}를 다른 폴더로 이동`)}
              />
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default FolderDetailPage;
