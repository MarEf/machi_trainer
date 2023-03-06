import { Schema as _Schema, model } from "mysql2"
const Schema = _Schema

const userSchema = new Schema({
    email: {
        type: String
    },
    password: {
        type: String
    }
}, {
    collection: 'users'
})

export default model('User', userSchema)