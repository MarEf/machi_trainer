import { useEffect, useState } from 'react'
import axios from 'axios'
import Cookies from "universal-cookie"
import { useParams } from 'react-router-dom'
const cookies = new Cookies()
const token = cookies.get("TOKEN")

const User = () => {
    const [name, setName] = useState("")
    const { id } = useParams()

    useEffect(() => {
        console.log(id)
        axios
            .get(`http://localhost:3001/api/users/${id}`, {
                headers: {
                    Authorization: token
                }
            })
            .then(response => {
                setName(response.data.username)
            })
    }, [])

    return (
        <div>
            <h2>Welcome, {name}</h2>
        </div >
    )
}

export default User