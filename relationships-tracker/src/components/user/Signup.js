import React from "react";
import {Container, Button, Form} from 'react-bootstrap';

const Signup = () => {
  return (
    <Container>  
      <h3>New User Signup</h3>

      <Form>
        <Form.Group>
          <Form.Label>Username</Form.Label>
          <Form.Control type="email" placeholder="Email" />
        </Form.Group>
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <Button type="submit">Sign up</Button>
      </Form>
    </Container>
  )
}

export default Signup;