const express = require('express');
const router = express.Router();
const { testServer } = require('../controllers/testController');

// 유저 관련 라우트
router.get('/test',testServer)
module.exports = router;
