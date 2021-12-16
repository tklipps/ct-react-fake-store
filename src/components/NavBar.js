import React, { Component } from 'react';
import {Navbar, Container, Nav} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import { titleCase } from "../helpers";




export default class NavBar extends Component {
    render() {
        return (
                <Navbar bg="dark" variant="dark" expand="lg" style={{marginBottom:"20px"}}>
                    <Container>
                        <Navbar.Brand as={Link} to="/">Welcome, {titleCase(this.props.user)}!</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            {this.props.token ?
                            <>
                            <Nav.Link as={Link} to="/">Shop</Nav.Link>
                            <Nav.Link as={Link} to="/logout">Logout</Nav.Link>
                            </>
                            :
                            <Nav.Link as={Link} to="/login">Login</Nav.Link>
                            }
                        </Nav>
                        <span className="float-end">
                            <Link to="/cart" style={{color:'white', textDecoration:'none'}}>
                                Cart: ({this.props.getCartItemTotal()})  ${this.props.getCartTotalPrice().toFixed(2)}
                            </Link>
                        </span>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
        )
    }
}