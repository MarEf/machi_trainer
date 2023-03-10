import PropTypes from 'prop-types'
import Cookies from 'universal-cookie'
import { Navigate } from "react-router-dom"
import { useEffect } from 'react'
const cookies = new Cookies()

const Logout = ({ setLogin }) => {

    useEffect(() => {
        setLogin(false)
        cookies.remove('TOKEN', { path: '/' })
    }, [])

    return (
        <Navigate to="/" />
    )

}

Logout.propTypes = {
    setLogin: PropTypes.func.isRequired
}

export default Logout