"use client";
import React, { useState, useEffect } from "react";
import { supabase } from "@/utils/supabase";
import Sidebar from "@/components/section/mypage/Sidebar";
import { getFolders, deleteFolder, renameFolder } from "@/utils/folders";
import FolderItem from "@/components/section/mypage/folder/FolderItem";
import { FolderGridSkeleton } from "@/components/section/mypage/folder/FolderSkeleton";

interface Folder {
  id: string;
  name: string;
}

const MyFolderPage = ({}) => {
  const [folders, setFolders] = useState<Folder[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleDeleteFolder = async (folderId: string) => {
    try {
      await deleteFolder(folderId);

      setFolders((prev) => prev.filter((f) => f.id !== folderId));
    } catch (error) {
      console.error("폴더 삭제 실패:", error);
    }
  };

  const handleUpdateFolder = async (folderId: string, newName: string) => {
    try {
      await renameFolder(folderId, newName);
      setFolders((prev) =>
        prev.map((f) => (f.id === folderId ? { ...f, name: newName } : f))
      );
    } catch (error) {
      console.error("폴더 이름 변경 실패:", error);
    }
  };

  useEffect(() => {
    const fetchFolders = async () => {
      setIsLoading(true);
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();
        if (!session) return;
        const userFolders = await getFolders(session.user.id);
        setFolders(userFolders);
      } catch (error) {
        console.error("폴더 목록 로딩 실패:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchFolders();
  }, []);

  return (
    <div style={{ display: "flex", marginTop: "64px" }}>
      <Sidebar />
      <main style={{ flex: 1, padding: "50px 70px" }}>
        <h1 style={{ marginBottom: "30px", userSelect: "none" }}>내 폴더</h1>
        {isLoading ? (
          <FolderGridSkeleton count={6} />
        ) : folders.length === 0 ? (
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
            <p>생성된 폴더가 없습니다.</p>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
              gap: "28px",
            }}
          >
            {folders.map((folder) => (
              <FolderItem
                key={folder.id}
                id={folder.id}
                name={folder.name}
                onDelete={handleDeleteFolder}
                onUpdate={handleUpdateFolder}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default MyFolderPage;
