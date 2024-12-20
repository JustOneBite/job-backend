require('dotenv').config();
const mongoose = require('mongoose');

const url = process.env.DB_URL; // .env 파일 또는 환경 변수에서 URL 가져오기

// MongoDB 연결 함수
async function connectToDatabase() {
    try {
        await mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('DB 연결 성공');
    } catch (error) {
        console.error('DB 연결 실패:', error);
        throw error;
    }
}

module.exports = connectToDatabase;