import { NextApiRequest, NextApiResponse } from "next";
import { MongoClient } from "mongodb";
import crypto from "crypto";

const uri = "mongodb+srv://gaeunpop:1111@cluster0.uqxyg33.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const dbName = "article";

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb', // 또는 더 크게
    },
  },
};

function toSlug(text: string) {
  return crypto.createHash("sha256").update(text).digest("hex");
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db(dbName);

    // 상세(slug) 조회
    if (req.method === "GET" && req.query.slug) {
      const slug = req.query.slug as string;
      const article = await db.collection("article").findOne({ slug });
      if (!article) return res.status(404).json({ error: "Not found" });
      return res.status(200).json(article);
    }

    // 기존 목록 조회
    if (req.method === "GET") {
      const articles = await db.collection("article").find().toArray();
      return res.status(200).json(articles);
    } else if (req.method === "POST") {
      const { title, content, category, date, imageUrl, description, keywords } = req.body;
      const slug = toSlug(title); // slug 생성
      const result = await db.collection("article").insertOne({
        title,
        slug, // slug 필드 저장!
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
  } finally {
    await client.close();
  }
}