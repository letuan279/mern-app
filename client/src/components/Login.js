import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'
import { useState, useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import AlertMessage from './AlertMessage'

const Login = () => {
    // Context
    const { loginUser } = useContext(AuthContext)

    const [alert, setAlert] = useState(null)

    // Local state
    const [loginForm, setLoginForm] = useState({
        username: '',
        password: ''
    })

    const { username, password } = loginForm

    const onChange = event => setLoginForm({ ...loginForm, [event.target.name]: event.target.value })

    const login = async event => {
        event.preventDefault()

        try {
            const loginData = await loginUser(loginForm)
            if (!loginData.success) {
                setAlert({
                    type: 'warning',
                    message: loginData.message
                })
                setTimeout(() => setAlert(null), 3000)
            }

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <Form className='my-4 d-flex flex-column'>
                <AlertMessage info={alert} />
                <Form.Group className='my-2 '>
                    <Form.Control onChange={onChange} value={username} type='text' placeholder='Username' name='username' required />
                </Form.Group >

                <Form.Group className='mb-2'>
                    <Form.Control onChange={onChange} value={password} type='password' placeholder='Password' name='password' required />
                </Form.Group>

                <Button onClick={login} variant='success' type='submit'>Login</Button>
            </Form>
            <p>
                Don't have an account?
                <Link to='/register' className='ml-4'>
                    <Button variant='info' size='sm'>Register</Button>
                </Link>
            </p>
        </>
    )
};

export default Login;
