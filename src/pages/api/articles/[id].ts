import type { NextApiRequest, NextApiResponse } from "next";
import { MongoClient, ObjectId } from "mongodb";

const uri = "mongodb+srv://gaeunpop:1111@cluster0.uqxyg33.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const dbName = "article";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") return res.status(405).end();
  const { id } = req.query;
  if (!id || typeof id !== "string" || !ObjectId.isValid(id)) {
    return res.status(400).json({ error: "잘못된 id 형식입니다." });
  }
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db(dbName);
    const article = await db.collection("article").findOne({ _id: new ObjectId(id) });
    if (!article) return res.status(404).json({ error: "Not found" });
    res.status(200).json(article);
  } catch {
    res.status(500).json({ error: "DB 조회 중 오류 발생" });
  } finally {
    await client.close();
  }
}