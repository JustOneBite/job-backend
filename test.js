const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')



async function getData(password){
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword)
}






let incoding_data = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NjNlMDE0Y2Y2NmQ5NjRiM2RhZjdkMCIsInVzZXJJZCI6ImFkbWluIiwiZW1haWwiOiJxa3Nlb3duczkyMDZAZ21haWwuY29tIiwiaWF0IjoxNzM0NjA1NjEyLCJleHAiOjE3MzQ2MDkyMTJ9.5PLbU8Clywnsg-UzSlNlpshxp0QFHLSUse-57FA9oIg"
const decoded = jwt.verify(incoding_data, "RealSecreat")

let password = "1234"
// getData(password)
console.log(decoded)