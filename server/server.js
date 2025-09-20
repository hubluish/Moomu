import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { MongoClient, ObjectId } from 'mongodb';
import crypto from "crypto";

// Server.js

const url = 'mongodb+srv://gaeunpop:1111@cluster0.uqxyg33.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const dbName = 'article';

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

function toSlug(text) {
  return crypto.createHash("sha256").update(text).digest("hex");
}

// 게시글 목록을 JSON으로 반환하는 API
app.get('/', async function(req, res){
    try {
        const client = new MongoClient(url);
        await client.connect();
        const db = client.db(dbName);
        const result = await db.collection('article').find().toArray();
        res.json(result); // JSON으로 반환!
        client.close();
    } catch (err) {
        console.error('MongoDB 조회 오류:', err);
        res.status(500).json({ error: 'DB 조회 중 오류 발생' });
    }
});

// 게시글 상세 조회 API
app.get('/api/articles/:id', async function(req, res){
    try {
        const client = new MongoClient(url);
        await client.connect();
        const db = client.db(dbName);
        // ObjectId 변환 필수!
        const result = await db.collection('article').findOne({ _id: new ObjectId(req.params.id) });
        if (!result) return res.status(404).json({ error: "Not found" });
        res.json(result);
        client.close();
    } catch (err) {
        console.error('상세 조회 오류:', err); // 에러 메시지 출력
        res.status(500).json({ error: 'DB 조회 중 오류 발생' });
    }
});

// 게시글 상세 조회 (slug)
app.get('/api/articles/slug/:slug', async function(req, res){
    try {
        const { slug } = req.params;
        const client = new MongoClient(url);
        await client.connect();
        const db = client.db(dbName);
        const result = await db.collection('article').findOne({ slug });
        if (!result) return res.status(404).json({ error: "Not found" });
        res.json(result);
        client.close();
    } catch (err) {
        console.error('상세 조회 오류:', err);
        res.status(500).json({ error: 'DB 조회 중 오류 발생' });
    }
});



app.listen(3001, () => {
  console.log('Server running on http://localhost:3001');
});

