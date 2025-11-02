"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase";

const AdminPage = () => {
  const [averageRating, setAverageRating] = useState<number | null>(null);

  async function fetchAverageRating() {
    const { data, error } = await supabase.rpc("get_average_rating");
    if (error) {
      console.error("평균 평점 로딩 실패:", error);
    } else {
      setAverageRating(data);
    }
  }

  useEffect(() => {
    fetchAverageRating();
  }, []);

  return (
    <div style={{ padding: "50px 70px" }}>
      <h1>관리자 대시보드</h1>
      <h2>Moomu 평균 평점</h2>

      {averageRating !== null ? (
        <p style={{ fontSize: "2rem", fontWeight: "bold" }}>
          {averageRating.toFixed(1)} / 5.0
        </p>
      ) : (
        <p>평점 로딩 중...</p>
      )}
    </div>
  );
};

export default AdminPage;
