const express = require('express')
const router = express.Router()
const { loginTeacher, logoutTeacher, registerTeacher } = require('../controllers/teacherController')

// 로그인 라우트
router.post('/login', loginTeacher)
router.post('/logout', logoutTeacher)
router.post('/register', registerTeacher)
module.exports = router
