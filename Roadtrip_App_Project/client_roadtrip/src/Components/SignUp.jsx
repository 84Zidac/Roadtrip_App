import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Stack from "react-bootstrap/Stack";
import { useEffect, useState } from "react";
import { signUp } from "../utilities";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // useEffect(() => {

  //     console.log(name, email, password);

  //   }, [name, email, password]);

  return (
    <Stack gap={2} className="col-md-5 mx-auto">
      <h1>Create An Account</h1>
      <h6>If you already have an account please Login</h6>
      <Form
        onSubmit={(e) => [
          e.preventDefault(),
          signUp(name, email, password),
          setName(""),
          setEmail(""),
          setPassword(""),
        ]}
      >
        <Form.Group
          className="justify-content-md-center"
          controlId="formBasicName"
          md="auto"
        >
          <Form.Label>Name</Form.Label>
          <Form.Control
            md="auto"
            type="name"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Form.Text className="text-muted">Input your name</Form.Text>
        </Form.Group>
        <Form.Group
          className="justify-content-md-center"
          controlId="formBasicEmail"
          md="auto"
        >
          <Form.Label>Email address</Form.Label>
          <Form.Control
            md="auto"
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Form.Text className="text-muted">
            Your email address will be your Login ID.
          </Form.Text>
        </Form.Group>

        <Form.Group
          className="justify-content-md-center"
          controlId="formBasicPassword"
        >
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Form.Text className="text-muted">Create your password</Form.Text>
        </Form.Group>
        <Button variant="primary" type="submit">
          Create Account
        </Button>
      </Form>
    </Stack>
  );
}
