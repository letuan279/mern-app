import { Navigate, Outlet } from "react-router-dom"
import { useContext } from "react"
import { AuthContext } from "../contexts/AuthContext"
import Spinner from "react-bootstrap/Spinner"

const RequireAuth = () => {

    const { authState: { authLoading, isAuthenticated } } = useContext(AuthContext)

    if (authLoading) {
        return (
            <div className="d-flex justify-content-center align-items-center">
                <Spinner animation="border" variant="info" />
            </div>
        )
    }

    return (
        isAuthenticated ? <Outlet /> : <Navigate to="/login" />
    )

}

export default RequireAuth
