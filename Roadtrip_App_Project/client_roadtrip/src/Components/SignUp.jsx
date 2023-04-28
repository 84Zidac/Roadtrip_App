import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Stack from "react-bootstrap/Stack";
import { useEffect, useState } from "react";
import { signUp, Jokes } from "../utilities";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signupSuccess, setSignupSuccess] = useState(false);
  const [joke, setJoke] = useState(null);

  useEffect(() => {
    Jokes(setJoke);
    console.log(joke);
  }, []);

  return (
    <Container fluid="md">
      <Row>
        <Col></Col>
        <Col>
          <div id="create_account">
            <Stack gap={2} className="col-md-5 mx-auto">
              <h1>Create An Account</h1>
              <h6>If you already have an account please Login</h6>
              <Form
                onSubmit={(e) => [
                  e.preventDefault(),
                  signUp(name, email, password, setSignupSuccess),
                  setName(""),
                  setEmail(""),
                  setPassword(""),
                ]}
              >
                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="formHorizontalName"
                >
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    md="auto"
                    type="name"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <Form.Text className="text-muted">Input your name</Form.Text>
                </Form.Group>
                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="formHorizontalEmail"
                >
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    md="auto"
                    type="email"
                    placeholder="john_doe@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <Form.Text className="text-muted">
                    Your email address will be your Login ID.
                  </Form.Text>
                </Form.Group>

                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="formHorizontalPassword"
                >
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="P@$$w0rD"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <Form.Text className="text-muted">
                    Create your password
                  </Form.Text>
                </Form.Group>
                <br></br>
                <Button variant="primary" type="submit">
                  Create Account
                </Button>
                {signupSuccess && <h3>Account Created</h3>}
              </Form>
            </Stack>
          </div>
        </Col>
        <Col></Col>
      </Row>

      {joke && <h6 id="fact">{[...joke]}</h6>}
    </Container>
    // <div id="create_account">
    //   <Stack gap={2} className="col-md-5 mx-auto">
    //     <h1>Create An Account</h1>
    //     <h6>If you already have an account please Login</h6>
    //     <Form
    //       onSubmit={(e) => [
    //         e.preventDefault(),
    //         signUp(name, email, password),
    //         setName(""),
    //         setEmail(""),
    //         setPassword(""),
    //       ]}
    //     >
    //       <Form.Group
    //         className="justify-content-md-center"
    //         controlId="formBasicName"
    //         md="auto"
    //       >
    //         <Form.Label>Name</Form.Label>
    //         <Form.Control
    //           md="auto"
    //           type="name"
    //           placeholder="Name"
    //           value={name}
    //           onChange={(e) => setName(e.target.value)}
    //         />
    //         <Form.Text className="text-muted">Input your name</Form.Text>
    //       </Form.Group>
    //       <Form.Group
    //         className="justify-content-md-center"
    //         controlId="formBasicEmail"
    //         md="auto"
    //       >
    //         <Form.Label>Email address</Form.Label>
    //         <Form.Control
    //           md="auto"
    //           type="email"
    //           placeholder="Enter email"
    //           value={email}
    //           onChange={(e) => setEmail(e.target.value)}
    //         />
    //         <Form.Text className="text-muted">
    //           Your email address will be your Login ID.
    //         </Form.Text>
    //       </Form.Group>

    //       <Form.Group
    //         className="justify-content-md-center"
    //         controlId="formBasicPassword"
    //       >
    //         <Form.Label>Password</Form.Label>
    //         <Form.Control
    //           type="password"
    //           placeholder="Password"
    //           value={password}
    //           onChange={(e) => setPassword(e.target.value)}
    //         />
    //         <Form.Text className="text-muted">Create your password</Form.Text>
    //       </Form.Group>
    //       <Button variant="primary" type="submit">
    //         Create Account
    //       </Button>
    //     </Form>
    //   </Stack>
    // </div>
  );
}
