import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

type NavigationProps = {
    isLoggedIn: boolean,
    logUserOut: () => void
}

export default function Navigation({isLoggedIn, logUserOut}: NavigationProps){


    return (
        <>
        <Navbar bg='dark' data-bs-theme='dark'>
            <Container>
                <Navbar.Brand>Quiz</Navbar.Brand>
                <Navbar.Toggle aria-controls='nav-collapse' />
                <Nav className='me-auto'>
                        {isLoggedIn ? (
                            <>
                                <Nav.Link as={Link} to='/questions'>Questions</Nav.Link>
                                <Nav.Link as={Link} to='/' onClick={() => logUserOut()}>Log Out</Nav.Link>
                            </>
                        ) : (
                            <>
                                <Nav.Link as={Link} to='/signup'>Sign Up</Nav.Link>
                                <Nav.Link as={Link} to='/login'>Log In</Nav.Link>
                            </>
                        )}
                    </Nav>
            </Container>
        </Navbar>

        </>
    )
}
