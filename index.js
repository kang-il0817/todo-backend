const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/todo-db';

// 라우터
const todoRouter = require('./routes/todo');

// 미들웨어
app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://localhost:5173',
    'https://todo-frontend-6gtt.vercel.app'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));
app.use(express.json());

// 기본 라우트
app.get('/', (req, res) => {
  res.json({ message: 'Todo Backend API is running!' });
});

// API 라우트
app.use('/api/todos', todoRouter);

// MongoDB 연결 및 서버 시작
async function startServer() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ 연결 성공!');

    app.listen(PORT, () => {
      console.log(`🚀 서버가 http://localhost:${PORT} 에서 실행 중입니다.`);
    });
  } catch (error) {
    console.error('❌ MongoDB 연결 실패:', error.message);
    process.exit(1);
  }
}

// 연결 이벤트 핸들링
mongoose.connection.on('disconnected', () => {
  console.log('⚠️ MongoDB 연결이 끊어졌습니다.');
});

mongoose.connection.on('error', (err) => {
  console.error('❌ MongoDB 에러:', err);
});

startServer();
