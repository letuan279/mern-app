import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import { Link, Outlet } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import { AuthContext } from '../contexts/AuthContext'
import { useContext } from 'react'


const Dashboard = () => {

    const { authState: { user: { username } }, logoutUser } = useContext(AuthContext)

    const onClick = async () => logoutUser()

    return (
        <div className='dashboard-page'>
            <Navbar bg="primary" expand="lg">
                <Container>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link to='home' as={Link}>
                                Home
                            </Nav.Link>
                            <Nav.Link to='course' as={Link}>
                                Course
                            </Nav.Link>
                            <Nav.Link to='about' as={Link}>
                                About
                            </Nav.Link>
                        </Nav>
                        <Nav.Link className='font-weight' disabled>
                            Hello {username}
                        </Nav.Link>
                        <Button onClick={onClick} variant='secondary'>Logout</Button>

                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Outlet />
        </div>
    )
};

export default Dashboard;
