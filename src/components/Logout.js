import PropTypes from 'prop-types'
import Cookies from 'universal-cookie'
import { Navigate } from "react-router-dom"
const cookies = new Cookies()

const Logout = ({ setLogin }) => {

    setLogin(false)
    cookies.remove('TOKEN', { path: '/' });

    return (
        <Navigate to="/" />
    )

}

Logout.propTypes = {
    setLogin: PropTypes.func.isRequired
}

export default Logout