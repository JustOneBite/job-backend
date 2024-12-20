const express = require("express")
const { readWritingData, saveWritingData } = require("../controllers/mainStudyController")

const router = express.Router()

//Writing
router.post("/readWritingData", readWritingData)
router.post("/saveWritingData", saveWritingData)


module.exports = router