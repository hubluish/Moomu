import { NextApiRequest, NextApiResponse } from "next";
import { MongoClient } from "mongodb";

const uri = "mongodb+srv://gaeunpop:1111@cluster0.uqxyg33.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const dbName = "article";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db(dbName);

    if (req.method === "GET") {
      const articles = await db.collection("article").find().toArray();
      res.status(200).json(articles);
    } else if (req.method === "POST") {
      const { title, content, category, date, imageUrl, description, keywords } = req.body;
      const result = await db.collection("article").insertOne({
        title,
        content,
        category,
        date,
        imageUrl,
        description,
        keywords, 
      });
      res.status(201).json({ insertedId: result.insertedId });
    } else {
      res.status(405).json({ error: "Method Not Allowed" });
    }
  } catch (err) {
    res.status(500).json({ error: "DB 연결 오류" });
  } finally {
    await client.close();
  }
}