/*eslint-env node*/

let express = require('express')
let db = require('./config/db.js')
let cors = require('cors')

const app = express()
const PORT = 3001

const corsOptions = {
    methods: ['GET', 'PUT', 'POST', 'DELETE']
}

app.use(cors(corsOptions))
app.use(express.json())

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

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});