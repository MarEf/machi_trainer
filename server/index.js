/*eslint-env node*/

const express = require('express')
const cors = require('cors')

import db from './config/db'
const app = express()
const PORT = 3001

const corsOptions = {
    methods: ['GET', 'PUT', 'POST', 'DELETE']
}

app.use(cors(corsOptions))
app.use(express.json())

// Get all hands
app.get('/api/get', (req, res) => {
    db.query("SELECT * FROM hands", (err, result) => {
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