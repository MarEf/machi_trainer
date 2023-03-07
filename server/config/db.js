import { createConnection } from 'mysql2'

//TEST DB, REFACTOR FOR PROD!
const db = createConnection({
    host: 'localhost',
    user: 'root',
    password: "",
    database: 'mahjong'
})

export default db