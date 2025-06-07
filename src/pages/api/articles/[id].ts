import type { NextApiRequest, NextApiResponse } from "next";
import { MongoClient, ObjectId } from "mongodb";

const uri = "mongodb+srv://gaeunpop:1111@cluster0.uqxyg33.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const dbName = "article";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  if (!id || typeof id !== "string" || !ObjectId.isValid(id)) {
    return res.status(400).json({ error: "잘못된 id 형식입니다." });
  }
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db(dbName);

    if (req.method === "GET") {
      // 게시글 상세 조회
      const article = await db.collection("article").findOne({ _id: new ObjectId(id) });
      if (!article) return res.status(404).json({ error: "Not found" });
      res.status(200).json(article);
    } else if (req.method === "POST") {
      // 게시글 클릭 시 조회수 증가
      await db.collection("article").updateOne(
        { _id: new ObjectId(id) },
        { $inc: { views: 1 } }
      );
      res.status(200).json({ success: true });
    } else if (req.method === "DELETE") {
      // 게시글 삭제
      await db.collection("article").deleteOne({ _id: new ObjectId(id) });
      return res.status(200).json({ success: true });
    } else {
      res.status(405).end();
    }
  } catch {
    res.status(500).json({ error: "DB 오류" });
  } finally {
    await client.close();
  }
}