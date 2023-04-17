import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useState, useContext, useEffect } from "react";
import { signIn ,logOut, currUser } from "../utilities";
import { UserContext } from "../App";
import { Login } from "./Login";

export default function Navigation() {

  const { user } = useContext(UserContext);
  const { setUser } = useContext(UserContext);

  useEffect(() => {
    const getCurrUser = async () => {
      setUser(await currUser());
    };
    getCurrUser();
  }, []);

  console.log(user)
  console.log({...user}.name)

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="#home">Roadtrip Maker</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto"></Nav>
          {{...user}.name
            ? <button onClick={() => logOut(setUser)}>LOG OUT</button>
            : <Login /> }


        </Navbar.Collapse>
      </Container>
    </Navbar>

  );
}
