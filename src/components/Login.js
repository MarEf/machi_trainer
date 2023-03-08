import axios from 'axios'
import { useState } from 'react'

const Login = () => {
    const [login, setLogin] = useState("")
    const [password, setPassword] = useState("")


    const handleLoginChange = (event) => {
        setLogin(event.target.value)
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value)
    }


    const submitForm = () => {
        axios.post("http://localhost:3001/api/users/login", {
            login: login,
            password: password
        }).then(function (response) {
            console.log(response)
        }).catch(function (error) {
            console.log(error)
        })
    }

    return (
        <div className='form'>
            <label htmlFor='login-name'>Username or email</label>
            <input type='text' name='login-name' value={login} onChange={handleLoginChange} />

            <label htmlFor='password'>Password</label>
            <input type='password' name='password' value={password} onChange={handlePasswordChange} />

            <button type='submit' onClick={() => submitForm()}>Log in</button>
        </div >
    )
}

export default Login