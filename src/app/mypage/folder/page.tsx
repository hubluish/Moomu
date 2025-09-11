"use client";
import React, { useState, useEffect } from "react";
import { supabase } from "@/utils/supabase";
import Sidebar from "@/components/section/mypage/Sidebar";
import { getFolders } from "@/utils/folders";
import FolderItem from "@/components/section/mypage/folder/FolderItem";

interface Folder {
  id: string;
  name: string;
}

const MyFolderPage = ({}) => {
  const [folders, setFolders] = useState<Folder[]>([]);

  useEffect(() => {
    const fetchFolders = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();
        if (!session) return;
        const userFolders = await getFolders(session.user.id);
        setFolders(userFolders);
      } catch (error) {
        console.error("폴더 목록 로딩 실패:", error);
      }
    };
    fetchFolders();
  }, []);

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <main style={{ flex: 1, padding: "50px 70px" }}>
        <h1 style={{ marginBottom: "30px" }}>내 폴더</h1>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
            gap: "28px",
          }}
        >
          {folders.map((folder) => (
            <FolderItem key={folder.id} id={folder.id} name={folder.name} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default MyFolderPage;
