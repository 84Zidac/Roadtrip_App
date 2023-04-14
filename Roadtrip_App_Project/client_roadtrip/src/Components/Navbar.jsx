import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState, useContext } from "react";
import { signIn,logOut } from "../utilities";
import { UserContext } from "../App";
import { Login } from "./Login";

export default function Navigation() {

  const { user } = useContext(UserContext);
  const { setUser } = useContext(UserContext);
  console.log({...user}.user)

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="#home">Roadtrip Maker</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto"></Nav>
          {{...user}.user
            ? <button onClick={() => logOut(setUser)}>LOG OUT</button>
            : <Login /> }


        </Navbar.Collapse>
      </Container>
    </Navbar>

  );
}
