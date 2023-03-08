/*eslint-env node*/

const express = require('express')
const db = require('./config/db.js')
const cors = require('cors')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
// const auth = require('./auth')

const app = express()
const PORT = 3001

const corsOptions = {
    methods: ['GET', 'PUT', 'POST', 'DELETE']
}

app.use(cors(corsOptions))
app.use(express.json())

/* HAND FUNCTIONS */

// Get all hands
app.get('/api/hands', (req, res) => {
    db.query("SELECT * FROM hands", (err, result) => {
        if (err) {
            console.log("An unexpected error has occurred " + err)
        } else {
            res.send(result)
        }
    })
})

// Add new hand
app.post('/api/hands', (req, res) => {
    const hand = JSON.stringify(req.body.hand)
    const wait = JSON.stringify(req.body.wait)

    db.query("INSERT INTO hands (hand, wait) VALUES (?, ?)", [hand, wait], (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send(result)
        }
    })
})

/* USER MANAGEMENT FUNCTIONS */

// Get one user (only username and email)
app.get('/api/users/:id', (req, res) => {
    const id = req.params.id
    db.query = ("SELECT username, email FROM users WHERE id=?", [id], (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send(result)
        }
    })
})

// Account registration
app.post('/api/users/register', (req, res) => {
    // Hash password (never store this stuff in plain text, noob)
    bcrypt.hash(req.body.password, 10)
        .then((hashedPassword) => {
            // Store request parameters as constants for legibility
            const username = req.body.username
            const email = req.body.email
            // Save user to database
            db.query("INSERT INTO users (username, email, password) VALUES (?, ?, ?)", [username, email, hashedPassword], (err, result) => {
                if (err) {
                    // Send an error status if things went south
                    res.status(500).send({
                        message: "Error creating user",
                        err
                    })
                } else {
                    // Send confirmation status if everything went well
                    res.status(201).send({
                        message: "Account created successfully",
                        result
                    })
                }
            })
        })
        .catch((err) => {
            res.status(500).send({
                message: "Failed to hash password",
                err
            })
        })
})

// Login
app.post("/api/users/login", (req, res) => {
    // Set parameters as constants for legibility
    // login = username or password
    const login = req.body.login
    const password = req.body.password

    // Try finding the user with either username or password
    // All error messages are identical for security purposes
    db.query("SELECT * FROM users WHERE username=? OR email=?", [login, login], (err, result) => {
        if (err) {
            res.status(400).send({
                message: "Login credentials were incorrect. Check the email and password and try again later."
            })
        } else {
            // If user is found, compare password given against the user's password hash.
            bcrypt.compare(password, result[0].password)
                .then((passwordCheck) => {
                    if (!passwordCheck) {
                        return res.status(400).send({
                            message: "Login credentials were incorrect. Check the email and password and try again later."
                        })
                    } else {
                        // Create jwt token
                        const token = jwt.sign(
                            {
                                userId: result[0].id,
                                userEmail: result[0].email
                            }, "RANDOM-TOKEN",
                            { expiresIn: "24h" }
                        )

                        // Send response about a successful login and let frontend handle the rest
                        res.status(200).send({
                            message: `Logged in successfully! Welcome ${result[0].username}!`,
                            username: result[0].username,
                            token
                        })
                    }
                })
                .catch(() => {
                    res.status(400).send({
                        message: "Login credentials were incorrect. Check the email and password and try again later."
                    })
                })
        }
    })
})


/* LISTEN TO PORT THE SERVER RUNS ON*/
app.listen(PORT, () => { console.log(`Server listening on port ${PORT}`) });