import axios from 'axios'
import { useState } from 'react'

const Register = () => {
    const [newUsername, setNewUsername] = useState("")
    const [newEmail, setNewEmail] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const handleUsernameChange = (event) => {
        setNewUsername(event.target.value)
    }

    const handleEmailChange = (event) => {
        setNewEmail(event.target.value)
    }

    const handlePasswordChange = (event) => {
        setNewPassword(event.target.value)
    }

    const handleConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value)
    }

    const submitForm = () => {
        axios.post("http://localhost:3001/api/users/register", {
            username: newUsername,
            email: newEmail,
            password: newPassword
        }).then(function (response) {
            console.log(response)
        }).catch(function (error) {
            console.log(error)
        })
    }

    return (
        <div className='form'>
            <label htmlFor='username'>Username</label>
            <input type='text' name='username' value={newUsername} onChange={handleUsernameChange} />

            <label htmlFor='email'>Email</label>
            <input type='text' name='email' value={newEmail} onChange={handleEmailChange} />

            <label htmlFor='password'>Password</label>
            <input type='password' name='password' value={newPassword} onChange={handlePasswordChange} />

            <label htmlFor='confirm_password'>Confirm password by typing it again</label>
            <input type='password' name='confirm_password' value={confirmPassword} onChange={handleConfirmPasswordChange} />

            <button type='submit' onClick={() => submitForm()}>Create Account</button>
        </div >
    )
}

export default Register