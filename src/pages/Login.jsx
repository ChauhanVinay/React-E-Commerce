import React, { useContext, useRef, useState } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../store/AuthContext";

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();

  const [error, setError] = useState("");
  const authCtx = useContext(AuthContext);

  const history = useHistory();

  const submitHandler = async (event) => {
    event.preventDefault();

    const enteredEmail = emailRef.current.value;
    const enteredPassword = passwordRef.current.value;

    const url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCONfqWrXYm2ZF4goNOeAzquBy-lidEx8U";

    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPassword,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error.message || "Authentication Failed");
      }
      authCtx.login(data.idToken, email);
      history.replace("/store");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Container className="py-5" style={{ maxWidth: "450px" }}>
      <Form
        onSubmit={submitHandler}
        className="border rounded p-4 shadow"
      >
        <h2 className="text-center mb-4">Login</h2>

        {error && <Alert variant="danger">{error}</Alert>}

        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            ref={emailRef}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            ref={passwordRef}
            required
          />
        </Form.Group>

        <Button
          type="submit"
          variant="primary"
          className="w-100"
        >
          Login
        </Button>
      </Form>
    </Container>
  );
}