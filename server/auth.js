/*eslint-env node*/

const jwt = require("jsonwebtoken")
require('dotenv').config()

module.exports = async (req, res, next) => {
    try {
        // Get token from authorization headers
        const token = await req.headers.authorization
        // Check if the token provided matches the supposed origin
        const decodedToken = await jwt.verify(
            token,
            process.env.RANDOM_TOKEN
        )

        // Retrieve user details of the logged in user
        const user = await decodedToken;
        // Pass the user down to the endpoint
        req.user = user
        // Pass down functionality to the endpoint
        next()

    } catch (error) {
        res.status(401).json({
            error: new Error("Invalid request!")
        })
    }
}