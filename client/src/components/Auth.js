import { Outlet } from "react-router-dom"
import { AuthContext } from "../contexts/AuthContext"
import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import Spinner from 'react-bootstrap/Spinner'

const Auth = () => {

    const { authState: { authLoading, isAuthenticated } } = useContext(AuthContext)
    const navigate = useNavigate()
    let bodyAuthForm

    if (authLoading) {
        bodyAuthForm = <Spinner animation="border" variant="info" />
    } else if (isAuthenticated) {
        navigate('/home', { replace: true })
    } else {
        bodyAuthForm = <Outlet />
    }

    return (
        <div className="auth-page">
            <h1>Course</h1>
            <div className="auth-form">
                {bodyAuthForm}
            </div>
        </div>
    )
};

export default Auth;
