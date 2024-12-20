const jwt = require('jsonwebtoken')

const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1] // "Bearer <token>"

    if (!token) {
        return res.status(401).json({ message: "Access Denied. No token provided." })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded // 토큰에 있는 사용자 정보 저장
        next() // 다음 미들웨어로 이동
    } catch (err) {
        return res.status(403).json({ message: "Invalid token." })
    }
}

module.exports = authMiddleware
