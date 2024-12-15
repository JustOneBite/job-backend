require('dotenv').config();

const { MongoClient } = require('mongodb');

const url = process.env.DB_URL; // .env 파일 또는 환경 변수에서 URL 가져오기

// MongoDB 연결 함수
async function connectToDatabase() {
    try {
        const client = await new MongoClient(url).connect();
        console.log('DB 연결 성공');
        return client;
    } catch (error) {
        console.error('DB 연결 실패:', error);
        throw error;
    }
}

module.exports = connectToDatabase;