const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const Student = require("../models/studentModel")


require('dotenv').config();

exports.loginStudent = async (req, res) => {
    const { userId, password, email } = req.body

    try 
    {
        const student = await Student.findOne({ userId })
        if (!student) {
            return res.status(404).json({ message: "User not found" })
        }

        const isMatch = await student.comparePassword(password)
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" })
        }

        // JWT 생성
        const token = jwt.sign(
            { id: student._id, userId: student.userId, email: student.email },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        )

        res.status(200).json({ token })
    } 
    catch (error) 
    {
        res.status(500).json({ message: "Server error" })
    }
}



exports.registerStudent = async (req, res) => {
    try {
        const { name, birthDate, sex, phoneNumber, parentNumbers, email, parentEmails, userId, password, teacherId, grade, level, status } = req.body;

        // 필수 값 확인
        if (!name || !email || !userId || !password) {
            return res.status(400).json({ message: "필수 정보를 입력해주세요." });
        }

        // 중복 확인
        const existingStudent = await Student.findOne({ userId });
        if (existingStudent) {
            return res.status(400).json({ message: "이미 등록된 사용자입니다." });
        }

        // 비밀번호 해시 처리
        const hashedPassword = await bcrypt.hash(password, 10);

        // 학생 데이터 생성
        const newStudent = new Student({
            name,
            birthDate,
            sex,
            phoneNumber,
            parentNumbers,
            email,
            parentEmails,
            userId,
            password: hashedPassword,
            teacherId,
            grade,
            level,
            status,
        });

        // 데이터베이스에 저장
        await newStudent.save();

        res.status(201).json({ message: "학생 등록이 완료되었습니다."});
    } catch (error) {
        console.error("학생 등록 중 오류:", error);
        res.status(500).json({ message: "학생 등록 중 서버 오류가 발생했습니다." });
    }
};
