import React from "react";
import {Container, Button, Form} from 'react-bootstrap';

const Login = () => {
  return (
    <Container>  
      <h3>Log In</h3>

      <Form>
        <Form.Group>
          <Form.Label>Username</Form.Label>
          <Form.Control type="email" placeholder="Email" />
        </Form.Group>
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <Button type="submit">Log in</Button>
      </Form>
    </Container>
  )
}

export default Login;