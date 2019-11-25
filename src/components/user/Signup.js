import React, {useState} from "react";
import {Container, Button, Form} from 'react-bootstrap';
import {signup} from '../../services/usersApi';

const Signup = props => {
  const [error, setError] = useState(false)
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleChange = ev => {
    ev.persist()
    switch(ev.target.name) {
      case 'first_name':
        setFirstName(ev.target.value);
        break;
      case 'last_name':
        setLastName(ev.target.value);
        break;
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
  
  const handleSubmit = (ev, history) => {
    ev.preventDefault();
    ev.persist();
    
    // push all form data into a single packaged array
    let formData = {}
    for(let i = 0; i < ev.target.length - 1; i++) {
      formData[ev.target[i].name] = (ev.target[i].value)
    }

    // deliver form data to signup
    signup(formData).then(res => {
      // if signup is successful, redirect to login
      if (!res.error) {
        props.history.push('/login');
      // if not, remain on page
      } else {
        setError(true);
        console.log('signup failed');
      }
    })
  }

  return (
    <Container>  
      <h3>New User Signup</h3>

      <Form onSubmit={ev => handleSubmit(ev, props.history)}>
        <Form.Group>
          <Form.Label>First Name</Form.Label>
          <Form.Control type="text" name="first_name" placeholder="First Name" value={firstName} onChange={ev => handleChange(ev)}/>
        </Form.Group>
        <Form.Group>
          <Form.Label>Last Name</Form.Label>
          <Form.Control type="text" name="last_name" placeholder="Last Name" value={lastName} onChange={ev => handleChange(ev)}/>
        </Form.Group>
        <Form.Group>
          <Form.Label>User Email</Form.Label>
          <Form.Control type="email" name="email" placeholder="Email" value={email} onChange={ev => handleChange(ev)}/>
        </Form.Group>
        <Form.Group>
          <Form.Label>User Password</Form.Label>
          <Form.Control type="password" name="password" placeholder="Password" value={password} onChange={ev => handleChange(ev)}/>
        </Form.Group>
        <Button type="submit">Sign up</Button>
      </Form>
    </Container>
  )
}

export default Signup;