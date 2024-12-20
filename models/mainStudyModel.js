const mongoose = require("mongoose")

const writingSchema = new mongoose.Schema({
    theme: {
        type: String,
        required: true,
        trim: true, // 앞뒤 공백 제거
    },
    wordLimit: {
        type: Number,
        required: true,
        default: 0, 
    },
    submitCnt: {
        type: Number,
        required: true,
        default: 0, 
    },
    studentContent: {
        type: String,
        default:"",
    },
}, {
    timestamps: true, // 생성 및 수정 시간 자동 추가
});



module.exports = mongoose.model("WritingData", writingSchema)