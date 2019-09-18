import React from "react";
import {Form} from 'react-bootstrap';

const Signup = () => {
  return (
    <>  
      <h3>New User Signup</h3>

      <Form>
        <Form.Label>Username</Form.Label>
        <Form.Control type="email" placeholder="Email" />

        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" />

        <Button type="submit">Sign up</Button>
      </Form>
    </>
  )
}

export default Signup;