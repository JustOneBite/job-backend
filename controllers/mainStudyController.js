const WritingData = require("../models/mainStudyModel")

require('dotenv').config();


exports.readWritingData = async (req, res) => {

    let theme_data = req.body.theme

    console.log("!!!!",theme_data)

    try{
        const writingData = await WritingData.findOne(req.body)

        if (!writingData) {
            // theme에 맞는 데이터를 찾을 수 없으면 오류를 반환합니다.
            return res.status(404).json({ message: "Writing data not found" })
        }
        
        console.log(writingData)
        res.status(200).json({ writingData })
    }
    catch (error) 
    {
        console.log(error)
        res.status(500).json({ message: "Server error" })
    }
}

exports.saveWritingData = async (req, res) => {
    try {
        // 클라이언트에서 전달된 데이터 받기
        const { theme, studentContent} = req.body;

        // 데이터 유효성 검사 (예: 필수 값이 있는지 확인)
        if (!theme) {
            return res.status(400).json({ message: 'Theme is required.' });
        }

        // 기존 데이터 찾기
        const existingWritingData = await WritingData.findOne({ theme });

        // 데이터가 없으면 새로운 데이터 생성하고 저장
        if (!existingWritingData) {
            return res.status(400).json({message: '데이터 잘못찾음 ㅋㅋ'});
        } else {
            // 기존 데이터가 있으면 수정
            existingWritingData.studentContent = studentContent || existingWritingData.studentContent;
            
            if(existingWritingData.submitCnt < 2)
                existingWritingData.submitCnt += 1

            existingWritingData.save()
            

            return res.status(200).json({
                message: 'Writing data updated successfully.',
                data: existingWritingData
            });
        }
    } catch (error) {
        console.error('Error saving writing data:', error);
        return res.status(500).json({ message: 'Failed to save writing data', error: error.message });
    }
};
