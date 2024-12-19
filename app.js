require('dotenv').config();

const express = require('express')
const cors = require('cors');
const connectToDatabase = require('./database');

const testRoute = require('./routes/testRoute');
const studentRoutes = require("./routes/studentRoutes");

const app = express()
app.use(express.json());  

// CORS 설정
app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:4000'], // 프론트엔드 URL
    methods: 'GET,POST', // 허용하는 HTTP 메서드
    allowedHeaders: 'Content-Type', // 허용하는 헤더
}));

connectToDatabase().then(() => {
      app.listen(process.env.PORT, () => {
          console.log(`http://localhost:${process.env.PORT} 에서 서버 실행중`)
      })
}).catch((err) => {
    console.error('페이지 실행 오류 발생', err)
})



// 루트 경로 설정
app.get('/', (req, res) => {
  res.send('Welcome to JOB Project')
})

app.use('/', testRoute);

app.use("/student", studentRoutes);

module.exports = app;
