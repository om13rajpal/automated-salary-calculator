const dotenv = require("dotenv")

dotenv.config()

const PORT = process.env.PORT || 3000
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/ipsradaur"
const SECRET_KEY = process.env.SECRET_KEY
const EMAIL = process.env.EMAIL
const PASSWORD = process.env.PASSWORD

module.exports = {
    PORT,
    MONGODB_URI,
    SECRET_KEY,
    EMAIL,
    PASSWORD
}