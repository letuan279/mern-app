import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'
import { useContext, useState } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import AlertMessage from './AlertMessage'


const Register = () => {

    // Context
    const { registerUser } = useContext(AuthContext)

    const [alert, setAlert] = useState(null)

    // Local state
    const [registerForm, setRegisterForm] = useState({
        username: '',
        password: '',
        confirmPassword: ''
    })

    const { username, password, confirmPassword } = registerForm

    const onChange = event => setRegisterForm({ ...registerForm, [event.target.name]: event.target.value })

    const register = async event => {
        event.preventDefault()

        if (password !== confirmPassword) {
            setAlert({
                type: 'warning',
                message: "password and confirm password are not match"
            })
            setTimeout(() => setAlert(null), 3000)
            return
        }

        try {
            const registerData = await registerUser(registerForm)
            if (!registerData.success) {
                setAlert({
                    type: 'warning',
                    message: registerData.message
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
                    <Form.Control value={username} onChange={onChange} type='text' placeholder='Username' name='username' required />
                </Form.Group >

                <Form.Group className='mb-2'>
                    <Form.Control value={password} onChange={onChange} type='password' placeholder='Password' name='password' required />
                </Form.Group>

                <Form.Group className='mb-2'>
                    <Form.Control value={confirmPassword} onChange={onChange} type='password' placeholder='Confirm Password' name='confirmPassword' required />
                </Form.Group>

                <Button onClick={register} variant='success' type='submit'>Register</Button>
            </Form>
            <p>
                Already have an account?
                <Link to='/login' className='ml-4'>
                    <Button variant='info' size='sm'>Login</Button>
                </Link>
            </p>
        </>
    )
};

export default Register;