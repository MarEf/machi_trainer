/*eslint-env node*/

const mysql = require('mysql2')

//TEST DB, REFACTOR FOR PROD!
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: "",
    database: 'mahjong'
})


module.exports = db