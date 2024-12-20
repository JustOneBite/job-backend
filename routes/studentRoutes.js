const express = require("express")
const { loginStudent, registerStudent } = require("../controllers/studentController")

const router = express.Router()

router.post("/login", loginStudent)
router.post("/register", registerStudent)

// // 인증된 사용자만 접근 가능
// router.get('/profile', authMiddleware, getStudentData);

module.exports = router
