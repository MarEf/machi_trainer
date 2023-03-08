/*eslint-env node*/

const express = require('express')
const db = require('./config/db.js')
const cors = require('cors')
const bcrypt = require('bcrypt')

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


/* LISTEN TO PORT THE SERVER RUNS ON*/
app.listen(PORT, () => { console.log(`Server listening on port ${PORT}`) });