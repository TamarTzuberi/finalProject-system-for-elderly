import React, { FunctionComponent } from 'react';
import { Nav, Navbar, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';

export const Header: FunctionComponent = () => {
    return (
        <Navbar>
            <Navbar>
                <Navbar.Brand>
                    <br></br>
                    <br></br>
                    {/* <Link to="/ResearcherPage">Hi</Link> */}
                </Navbar.Brand>
            </Navbar>
            {/* <Nav>
                <LinkContainer to="/FirstComponent">
                    <NavItem>Page 1</NavItem>
                </LinkContainer>
                <LinkContainer to="/SecondComponent">
                    <NavItem>Page 2</NavItem>
                </LinkContainer>
            </Nav> */}
        </Navbar>
    );
}