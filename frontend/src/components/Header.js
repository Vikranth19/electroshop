import React from 'react'
import { Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
import { DropdownSubmenu, NavDropdownMenu } from 'react-bootstrap-submenu'
import { logout } from '../actions/userActions'
import SearchBox from './SearchBox'

const Header = () => {
    const dispatch = useDispatch()

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const logoutHandler = () => {
        dispatch(logout())
    }

    return (
        <header>
            <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
                <Container>
                    <LinkContainer to="/">
                        <Navbar.Brand>ElectroShop</Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto">
                            <NavDropdownMenu
                                title="Explore categories"
                                id="collasible-nav-dropdown"
                            >
                                <DropdownSubmenu
                                    href="#action/3.7"
                                    title="Integrated circuits"
                                >
                                    <LinkContainer to="/products/microcontrollers">
                                        <NavDropdown.Item>
                                            Microcontrollers
                                        </NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to="/products/IC">
                                        <NavDropdown.Item>IC</NavDropdown.Item>
                                    </LinkContainer>
                                </DropdownSubmenu>

                                <DropdownSubmenu
                                    href="#action/3.7"
                                    title="Mini components"
                                >
                                    <LinkContainer to="/products/transistors">
                                        <NavDropdown.Item>
                                            transistors
                                        </NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to="/products/resistors">
                                        <NavDropdown.Item>
                                            resistors
                                        </NavDropdown.Item>
                                    </LinkContainer>
                                </DropdownSubmenu>

                                <DropdownSubmenu
                                    href="/"
                                    title="Boards and modules"
                                >
                                    <LinkContainer to="/products/sensors">
                                        <NavDropdown.Item>
                                            sensors
                                        </NavDropdown.Item>
                                    </LinkContainer>

                                    <LinkContainer to="/products/DIY">
                                        <NavDropdown.Item>DIY</NavDropdown.Item>
                                    </LinkContainer>
                                </DropdownSubmenu>

                                <DropdownSubmenu
                                    href="/"
                                    title="Tools and accessories"
                                >
                                    <LinkContainer to="/products/e-accessories">
                                        <NavDropdown.Item>
                                            E-accessories
                                        </NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to="/products/programmer">
                                        <NavDropdown.Item>
                                            Programmer
                                        </NavDropdown.Item>
                                    </LinkContainer>
                                </DropdownSubmenu>
                            </NavDropdownMenu>
                        </Nav>
                    </Navbar.Collapse>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Route
                            render={({ history }) => (
                                <SearchBox history={history} />
                            )}
                        />
                        <Nav className="ml-auto">
                            <LinkContainer to="/cart">
                                <Nav.Link>
                                    <i className="fas fa-shopping-cart"></i>{' '}
                                    Cart
                                </Nav.Link>
                            </LinkContainer>
                            {userInfo ? (
                                <NavDropdown
                                    title={userInfo.name}
                                    id="username"
                                >
                                    <LinkContainer to="/profile">
                                        <NavDropdown.Item>
                                            Profile
                                        </NavDropdown.Item>
                                    </LinkContainer>
                                    <NavDropdown.Item onClick={logoutHandler}>
                                        Logout
                                    </NavDropdown.Item>
                                </NavDropdown>
                            ) : (
                                <LinkContainer to="/login">
                                    <Nav.Link>
                                        <i className="fas fa-user"></i>
                                        Sign in
                                    </Nav.Link>
                                </LinkContainer>
                            )}
                            {userInfo && userInfo.isAdmin && (
                                <NavDropdown title="Admin" id="adminmenu">
                                    <LinkContainer to="/admin/userList">
                                        <NavDropdown.Item>
                                            Users
                                        </NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to="/admin/productList">
                                        <NavDropdown.Item>
                                            Products
                                        </NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to="/admin/orderList">
                                        <NavDropdown.Item>
                                            Orders
                                        </NavDropdown.Item>
                                    </LinkContainer>
                                </NavDropdown>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header
