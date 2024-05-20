import { Container, Nav, Navbar } from 'react-bootstrap';

export function NavigationBar(){
    return(
        <>
           <Navbar bg="light" data-bs-theme="light">
            <Container>
              <Navbar.Brand href="/home">Основная</Navbar.Brand>
              <Nav className="me-auto">
                <Nav.Link href="/register">Регистрация</Nav.Link>
                <Nav.Link href="/auth">Вход</Nav.Link>
              </Nav>
            </Container>
          </Navbar>
        </>
    )
}