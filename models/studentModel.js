const mongoose = require("mongoose")
const bcrypt = require("bcrypt")


const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true, // 앞뒤 공백 제거
    },
    birthDate: {
        type: Date, // 날짜 데이터
        required: true,
    },
    sex: {
        type: String,
        enum: ['Male', 'Female', 'Other'], // 성별 제한
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
        unique: true, // 중복 전화번호 금지
        match: [/^\d{10,15}$/, 'Please use a valid phone number'], // 10~15자리 숫자
    },
    parentNumbers: {
        type: [String], // 배열 형태로 부모 전화번호 저장
        validate: [arr => arr.length > 0, 'At least one parent phone number is required'], // 최소 하나 이상
    },
    email: {
        type: String,
        required: true,
        match: [/\S+@\S+\.\S+/, 'Please use a valid email address'], // 이메일 형식
        unique: true,
    },
    parentEmails: {
        type: [String], // 부모 이메일도 배열로 저장
        validate: [arr => arr.every(email => /\S+@\S+\.\S+/.test(email)), 'All parent emails must be valid'], // 각 이메일 검증
    },
    userId: {
        type: String,
        required: true,
        unique: true, // 유저 ID는 고유해야 함
    },
    password: {
        type: String,
        required: true,
        // minlength: 8, // 최소 8자리
    },
    teacherId: {
        type: mongoose.Schema.Types.ObjectId, // 다른 컬렉션의 ObjectId를 참조
        ref: 'teacher', // Teacher 컬렉션 참조
    },
    grade: {
        type: Number,
        min: 1, // 최소 1학년
        max: 12, // 최대 12학년
    },
    level: {
        type: String,
        enum: ['Beginner', 'Intermediate', 'Advanced'], // 단계 설정
    },
    status: {
        type: String,
        enum: ['Active', 'Inactive', 'Graduated'], // 상태 설정
        default: 'Active',
    },
}, {
    timestamps: true, // 생성 및 수정 시간 자동 추가
});

// 비밀번호 해싱
studentSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10)
    }

    next()
})

// 비밀번호 검증
studentSchema.methods.comparePassword = function (password) {
    return bcrypt.compare(password, this.password)
}


module.exports = mongoose.model("Student", studentSchema)