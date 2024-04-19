import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

type NavigationProps = {}

export default function Navigation({}: NavigationProps){
    return (
        <>
        <Navbar bg='dark' data-bs-theme='dark'>
            <Container>
                <Navbar.Brand>Quiz</Navbar.Brand>
                <Navbar.Toggle aria-controls='nav-collapse' />
                    <Nav>
                        <Nav.Link as={Link} to='/questions'>Questions</Nav.Link>
                        <Nav.Link as={Link} to='/registration'>Registration</Nav.Link>
                    </Nav>
            </Container>
        </Navbar>

        </>
    )
}