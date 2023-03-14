import { useEffect, useState } from 'react'
import axios from 'axios'
import Cookies from "universal-cookie"
import { useParams } from 'react-router-dom'
import Score from './Score'
const cookies = new Cookies()
const token = cookies.get("TOKEN")

const User = () => {
    const [name, setName] = useState("")
    // Temporarily hard coded for testing purposes
    const { id } = useParams()

    useEffect(() => {
        axios
            .get(`http://localhost:3001/api/users/${id}`, {
                headers: {
                    Authorization: token
                }
            })
            .then(response => {
                setName(response.data[0].username)
            })
    }, [id])

    return (
        <div>
            <h2>Welcome, {name}!</h2>
            <p>See below how you have been doing recently. Your history shows your last 20 plays.</p>
            <div className='score'>
                {<Score />}
            </div>
        </div >
    )
}

export default User