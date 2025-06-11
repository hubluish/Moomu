import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "@/utils/supabase";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  const numId = Number(id);
  if (!id || isNaN(numId)) {
    return res.status(400).json({ error: "잘못된 id 형식입니다." });
  }

  // 상세 조회
  if (req.method === "GET") {
    const { data, error } = await supabase
      .from("article")
      .select("*")
      .eq("id", numId)
      .single();
    if (error || !data) return res.status(404).json({ error: "Not found" });
    return res.status(200).json(data);
  }

  // 조회수 증가
  if (req.method === "POST") {
    const { data, error: getError } = await supabase
      .from("article")
      .select("views")
      .eq("id", numId)
      .single();

    if (getError || !data) return res.status(500).json({ error: "조회수 조회 실패" });

    const { error: updateError } = await supabase
      .from("article")
      .update({ views: (data.views ?? 0) + 1 })
      .eq("id", numId);

    if (updateError) return res.status(500).json({ error: updateError.message });
    return res.status(200).json({ success: true });
  }

  // 삭제
  if (req.method === "DELETE") {
    const { error } = await supabase.from("article").delete().eq("id", numId);
    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json({ success: true });
  }

  res.status(405).end();
}