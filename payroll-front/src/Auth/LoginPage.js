import React, { useState } from "react";
import { Button, Form, Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./loginpage.css";

function LoginPage({onLogin}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showError, setShowError] = useState(false);

  const handleLogin = (event) => {
    event.preventDefault();
    // handle login logic here
    if (email === "admin@gmail.com" && password === "admin@123") {
      // redirect to home page or do something else
      onLogin();
    } else {
      // show error message
      setShowError(true);
    }

  };

  return (
    <div className="Login">
      <Form onSubmit={handleLogin}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
        {showError && (
          <Alert variant="danger" className="mt-3">
            Invalid email or password.
          </Alert>
        )}
      </Form>
    </div>
  );
}

export default LoginPage;
