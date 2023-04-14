import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState, useContext } from "react";
import { signIn } from "../utilities";
import { UserContext } from "../App";



export function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { user } = useContext(UserContext);
    const { setUser } = useContext(UserContext);
    return(
        <Nav>
            <NavDropdown title="Login" id="basic-nav-dropdown">
              <h1>Login</h1>
              <Form
                onSubmit={(e) => [
                  e.preventDefault(),
                  signIn(email, password, setUser),
                  setEmail(""),
                  setPassword(""),
                ]}
              >
                <Form.Group controlId="formBasicEmail" md="auto">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    md="auto"
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>
                <Button variant="primary" type="submit">
                  Login
                </Button>
              </Form>
            </NavDropdown>
          </Nav>
    )
}