// Server.js
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');



const url = 'mongodb+srv://gaeunpop:1111@cluster0.uqxyg33.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const dbName = 'article';


app.use(cors());
app.use(bodyParser.json());


// 게시글 목록을 JSON으로 반환하는 API
app.get('/', async function(req, res){
    try {
        const client = new MongoClient(url);
        await client.connect();
        const db = client.db(dbName);
        const result = await db.collection('post').find().toArray();
        res.json(result); // JSON으로 반환!
        client.close();
    } catch (err) {
        console.error('MongoDB 조회 오류:', err);
        res.status(500).json({ error: 'DB 조회 중 오류 발생' });
    }
});

app.listen(3001, () => {
  console.log('Server running on http://localhost:3000');
});

useEffect(() => {
  fetch("http://localhost:3000/")
    .then(res => res.json())
    .then(data => setArticles(data));
}, []);