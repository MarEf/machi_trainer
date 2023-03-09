import { Navigate } from "react-router-dom"
import Cookies from "universal-cookie"
const cookies = new Cookies()

// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({ children }) => {
    const token = cookies.get("TOKEN")
    if (token) {
        return children
    } else {
        return <Navigate to="/" />
    }
}

export default ProtectedRoute