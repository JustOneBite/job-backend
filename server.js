require('dotenv').config();

const express = require('express')
const cors = require('cors');
const connectToDatabase = require('./database.js');
const { MongoClient } = require('mongodb');
const app = express()

// CORS 설정
app.use(cors({
    origin: 'http://localhost:3000', // 프론트엔드 URL
    methods: 'GET,POST', // 허용하는 HTTP 메서드
    allowedHeaders: 'Content-Type', // 허용하는 헤더
}));


// DB 연결 후 서버 실행
connectToDatabase().then((client) => {
    const db = client.db('forum');  // DB 선택
    console.log('DB 연결 성공');
    
    app.listen(process.env.PORT || 8080, () => {
      console.log('http://localhost:8080 에서 서버 실행중');
    });
  }).catch((err) => {
    console.error('DB 연결 실패:', err);
  });


// 루트 경로 설정
app.get('/', (req, res) => {
  res.send('Welcome to JOB Project')
})

// api testing 
app.get('/test',(req,res) => {
  res.status(200).json({'data' : 'Test Success'})
})
