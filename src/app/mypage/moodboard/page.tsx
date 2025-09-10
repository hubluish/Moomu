"use client";
import Moodboard from "@/components/section/mypage/moodboard/Moodboard";
import { supabase } from "@/utils/supabase";
import Sidebar from "@/components/section/mypage/Sidebar";
import React, { useState, useEffect } from "react"; // 👇 useState, useEffect 추가

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
                  type="mymoodboard" // 이 페이지는 '내 무드보드' 타입
                />
              );
            })}
          </div>
        </main>
      </div>
    </div>
  );
};

export default MoodboardPage;
