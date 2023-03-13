/*eslint-env node*/

const jwt = require("jsonwebtoken")
require('dotenv').config()

module.exports = async (req, res, next) => {
    try {
        // Get token from authorization headers
        const token = await req.headers.authorization
        // Check if the token provided matches the supposed origin
        jwt.verify(
            token,
            process.env.RANDOM_TOKEN
        )
        next()

    } catch (error) {
        res.status(401).json({
            error: new Error("Invalid request!"),
            message: "You must be logged in for that."
        })
    }
}