import React, { useContext, useRef, useState } from "react";
import { Button, Col, Container, Row, Form } from "react-bootstrap";
import AuthContext from "../Components/shared/AuthContext";
import Toast from "react-bootstrap/Toast";

const Signup = () => {
  const first_name = useRef("");
  const last_name = useRef("");
  const phone = useRef("");
  const email = useRef("");
  const password = useRef("");
  const confirm_password = useRef("");
  const { signup } = useContext(AuthContext);
  const [show, setShow] = useState(false);
  const [msg, setMsg] = useState([]);

  const SignupSubmit = async (e) => {
    e.preventDefault();
    let payload = {
      firstName: first_name.current.value,
      lastName: last_name.current.value,
      email: email.current.value,
      phone: phone.current.value,
      password: password.current.value,
      confirmPassword: confirm_password.current.value,
    };
    let resp = await signup(payload);

    if (resp === "User Created Successfully, Kindly Login") {
      e.target.reset();
      setMsg(resp);
      setShow(true);
    }
  };
  return (
    <>
      <Container className="mt-2">
        <Row>
          <Col className="col">
            <legend>Signup Form</legend>
            <form onSubmit={SignupSubmit}>
              <Form.Group className="mb-3" controlId="firstname">
                <Form.Label>First Name</Form.Label>
                <Form.Control type="text" ref={first_name} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="lastname">
                <Form.Label>Last Name</Form.Label>
                <Form.Control type="text" ref={last_name} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" ref={email} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="phone">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control type="tel" ref={phone} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" ref={password} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="confirmpassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control type="password" ref={confirm_password} />
              </Form.Group>
              <Button variant="primary" type="submit">
                Signup
              </Button>
            </form>
          </Col>
          <Col>
            <Toast
              bg="success"
              onClose={() => setShow(false)}
              show={show}
              delay={3000}
              autohide
            >
              <Toast.Header>
                <strong className="me-auto">Success</strong>
              </Toast.Header>
              <Toast.Body>{msg}</Toast.Body>
            </Toast>
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default Signup;
