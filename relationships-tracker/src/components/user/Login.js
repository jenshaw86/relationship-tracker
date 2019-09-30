import React, {useState} from "react";
import {Container, Button, Form} from 'react-bootstrap';
import {api} from './../../services/api'

const Login = props => {
  // local state for controlled login form input
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // handleChange takes in new input and sets it its respective states
  const handleChange = ev => {
    ev.persist();
    switch(ev.target.name) {
      case 'email':
        setEmail(ev.target.value);
        break;
      case 'password':
        setPassword(ev.target.value);
        break;
      default:
        return null;
    }
  }

  const handleSubmit = (ev) => {
    ev.preventDefault()
    ev.persist();
    
    // collect all the form data into a single packaged object
    let formData = {};
    for(let i = 0; i < ev.target.length - 1; i++) {
      formData[ev.target[i].name] = (ev.target[i].value)
    }
    
    api.auth.login(formData).then(res => { // res contains authorized user and JWT
      if (!res.error) { // if response contains no errors
        // handle login at App.js
        props.handleLogin(res);
        // ! After logging in but before loading account page, set user state
        // after login, redirect user to homepage 
        props.history.push('/')
      } else { // if error found
        // set error state to true
        setError(true);
        console.log("login failed")
      }
    })
  }

  return (
    <Container>  
      <h3>Log In</h3>

      <Form onSubmit={ev => handleSubmit(ev)}>
        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="Email" name="email" value={email} onChange={ev => handleChange(ev)}/>
        </Form.Group>
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" name="password" value={password} onChange={ev => handleChange(ev)}/>
        </Form.Group>
        <Button type="submit">Log in</Button>
      </Form>
    </Container>
  )
}

export default Login;