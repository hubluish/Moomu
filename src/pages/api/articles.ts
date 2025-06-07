import { NextApiRequest, NextApiResponse } from "next";
import { MongoClient } from "mongodb";
import crypto from "crypto";

const uri = "mongodb+srv://gaeunpop:1111@cluster0.uqxyg33.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const dbName = "article";

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb', 
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
      const { category, limit } = req.query;
      const query: Record<string, unknown> = {};
      if (category) query.category = category;
      let cursor = db.collection("article").find(query).sort({ date: -1 });
      if (limit) cursor = cursor.limit(Number(limit));
      const articles = await cursor.toArray();
      return res.status(200).json(articles);
    } else if (req.method === "POST") {
      const { title, content, category, date, imageUrl, description, keywords } = req.body;
      const slug = toSlug(title); 
      const result = await db.collection("article").insertOne({
        title,
        slug,
        content,
        category,
        date,
        imageUrl,
        description,
        keywords,
        views: 0, // 조회수 기본값
        isRecommended: false, // 추천글 여부 기본값
      });
      res.status(201).json({ insertedId: result.insertedId });
    } else {
      res.status(405).json({ error: "Method Not Allowed" });
    }
  } finally {
    await client.close();
  }
}

async function resetFields() {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db(dbName);
    await db.collection("article").updateMany({}, { $set: { views: 0, isRecommended: false } });
  } finally {
    await client.close();
  }
}
// resetFields();