import { Container, Dropdown, DropdownButton, Nav, Navbar } from 'react-bootstrap';

export function NavigationBar(){
    return(
        <Navbar bg="light" data-bs-theme="light" className="mb-3">
            <Container>
                <Navbar.Brand href="/products">Продукты</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link href="/carts">Корзины</Nav.Link>
                    <Nav.Link href="/users"> Пользователи</Nav.Link>
                </Nav>
                <DropdownButton id="dropdown-profile-button" title="Аккаунт">
                    <Dropdown.Item href="/logout">Выйти</Dropdown.Item>
                </DropdownButton>
            </Container>
        </Navbar>
    );
}