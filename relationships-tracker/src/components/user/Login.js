import React from "react";
import {Form} from 'react-bootstrap';

const Login = () => {
  return (
    <>  
      <h3>Log In</h3>

      <Form>
        <Form.Label>Username</Form.Label>
        <Form.Control type="email" placeholder="Email" />

        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" />

        <Button type="submit">Log in</Button>
      </Form>
    </>
  )
}

export default Login;