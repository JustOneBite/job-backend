require('dotenv').config()

const express = require('express')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const cors = require('cors')
const connectToDatabase = require('./database')

const testRoute = require('./routes/testRoute')
const studentRoutes = require("./routes/studentRoutes")
const teacherRoutes = require("./routes/teacherRoutes")
const mainStudyRoutes = require("./routes/mainStudyRoutes")



const app = express()
app.use(express.json())

// CORS 설정
app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:4000'], // 프론트엔드 URL
    methods: 'GET,POST', // 허용하는 HTTP 메서드
    allowedHeaders: 'Content-Type', // 허용하는 헤더
    credentials: true, // 세션 쿠키 허용
}))

app.use(session({
    secret: process.env.SESSION_SECRET, // 세션의 암호화 키 (환경 변수에서 가져오기)
    resave: false, // 세션을 항상 저장할지 여부
    saveUninitialized: false, // 초기화되지 않은 세션을 저장할지 여부
    cookie: {
        maxAge: 60 * 60 * 1000, // 쿠키 만료 시간 (1시간)
    },
    store: MongoStore.create({
        mongoUrl: process.env.DB_URL, // MongoDB에 세션 데이터를 저장
        collectionName: 'sessions', // 세션 데이터를 저장할 컬렉션 이름
    }),
}))



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

app.use('/', testRoute)

app.use("/student", studentRoutes)

app.use("/teacher", teacherRoutes)

app.use("/mainStudy", mainStudyRoutes)

module.exports = app
