import React, { FunctionComponent } from 'react';
import { Nav, Navbar, NavItem } from 'react-bootstrap';
// import { IndexLinkContainer } from "react-router-bootstrap";
import { Link } from 'react-router-dom';

export const Header: FunctionComponent = () => {
    return (
        <Navbar>
            <Navbar>
                <Navbar.Brand>
                    <Link to="/">dankNotDank</Link>
                </Navbar.Brand>
            </Navbar>
            {/* <Nav>
                <IndexLinkContainer to="/FirstComponent">
                    <NavItem>Page 1</NavItem>
                </IndexLinkContainer>
                <IndexLinkContainer to="/SecondComponent">
                    <NavItem>Page 2</NavItem>
                </IndexLinkContainer>
            </Nav> */}
        </Navbar>
    );
}