const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const Teacher = require("../models/teacherModel")


require('dotenv').config();

exports.loginTeacher = async (req, res) => {
    try {
        const { userId, password } = req.body; // 요청에서 userId와 password를 가져옴

        // 1. 유저 확인
        const teacher = await Teacher.findOne({ userId })
        if (!teacher) {
            return res.status(400).json({ message: 'Invalid credentials' })
        }

        // 2. 비밀번호 확인
        const isPasswordValid = await bcrypt.compare(password, teacher.password)
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid credentials' })
        }

        // 3. 세션에 로그인 정보 저장
        req.session.userId = teacher.userId
        req.session.teacherId = teacher._id
        req.session.loggedIn = true

        // 4. 성공 응답
        res.status(200).json({ message: 'Login successful' })
    } catch (error) {
        console.error('Login error: ', error)
        res.status(500).json({ message: 'Server error' })
    }
}

exports.logoutTeacher = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ message: 'Failed to log out' })
        }
        res.status(200).json({ message: 'Logout successful' })
    })
}


exports.registerTeacher = async (req, res) => {
    try {
        const { name, birthDate, sex, phoneNumber, email, userId, password } = req.body

        // 필수 입력값 확인
        if (!name || !birthDate || !sex || !phoneNumber || !email || !userId || !password) {
            return res.status(400).json({ message: 'All fields are required.' })
        }

        // 이미 존재하는 사용자 확인
        const existingTeacher = await Teacher.findOne({ $or: [{ email }, { userId }, { phoneNumber }] })
        if (existingTeacher) {
            return res.status(409).json({ message: 'A teacher with the same email, userId, or phone number already exists.' })
        }

        // 비밀번호 암호화
        const hashedPassword = await bcrypt.hash(password, 10)

        // 교사 생성
        const newTeacher = new Teacher({
            name,
            birthDate,
            sex,
            phoneNumber,
            email,
            userId,
            password: hashedPassword, // 암호화된 비밀번호 저장
        })

        await newTeacher.save()

        return res.status(201).json({ message: 'Teacher registered successfully.', teacherId: newTeacher._id })
    } catch (err) {
        console.error('Error registering teacher:', err)
        return res.status(500).json({ message: 'An error occurred while registering the teacher.' })
    }
}
