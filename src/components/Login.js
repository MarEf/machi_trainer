import axios from 'axios'
import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Cookies from 'universal-cookie'

const Login = ({ login, setLogin }) => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const cookies = new Cookies()

    const handleLoginChange = (event) => {
        setUsername(event.target.value)
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value)
    }

    useEffect(() => {
        console.log('login state:', login)
    }, [login]);

    const submitForm = () => {
        axios.post("http://localhost:3001/api/users/login", {
            login: username,
            password: password
        }).then(function (response) {
            // Does not work. State of 'login' does not update or the update does not chain up to App.js
            setLogin(true)
            cookies.set("TOKEN", response.data.token, { path: "/", maxAge: 86400 })
            window.location.href = "/home"
        }).catch(function (error) {
            console.log(error)
        })
    }

    return (
        <div className='form'>
            <label htmlFor='login-name'>Username or email</label>
            <input type='text' name='login-name' value={username} onChange={handleLoginChange} />

            <label htmlFor='password'>Password</label>
            <input type='password' name='password' value={password} onChange={handlePasswordChange} />

            <button type='submit' onClick={submitForm}>Log in</button>
        </div >
    )
}

Login.propTypes = {
    login: PropTypes.bool.isRequired,
    setLogin: PropTypes.func.isRequired
}

export default Login