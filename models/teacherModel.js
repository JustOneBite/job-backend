const mongoose = require("mongoose")
const bcrypt = require("bcrypt")


const teacherSchema = new mongoose.Schema({
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
    email: {
        type: String,
        required: true,
        match: [/\S+@\S+\.\S+/, 'Please use a valid email address'], // 이메일 형식
        unique: true,
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
    studentNumber: {
        type: Number, // 학생이 속한 숫자
        required: true,
        default: 0, // 기본값 0, 처음에는 학생 수가 0명
    },
    createdCurriNumber: {
        type: Number, // 만든 커리큘럼의 개수
        required: true,
        default: 0, // 기본값 0, 처음에는 커리큘럼 개수가 없음
    },
    membershipId: {
        type: mongoose.Schema.Types.ObjectId, // 다른 컬렉션의 ObjectId를 참조
        ref: 'membership', // Teacher 컬렉션 참조
    },
    levelSets: {
        type: String, // 학생의 현재 수준(예: Beginner, Intermediate, Advanced 등)
        enum: ['Beginner', 'Intermediate', 'Advanced'], // 선택 가능한 수준
        default: 'Beginner', // 기본값 설정
    },
}, {
    timestamps: true, // 생성 및 수정 시간 자동 추가
});




// 비밀번호 해싱
teacherSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10)
    }

    next()
})

// 비밀번호 검증
teacherSchema.methods.comparePassword = function (password) {
    return bcrypt.compare(password, this.password)
}


module.exports = mongoose.model("Teacher", teacherSchema)