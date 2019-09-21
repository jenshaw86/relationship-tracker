import React, {Component} from "react";
import {Container, Button, Form} from 'react-bootstrap';

class Signup extends Component {
  constructor() {
    super();
    this.state = {
      error: false,
      fields: {
        email: "",
        password: ""
      }
    }
  }

  handleChange = ev => {
    const newFields = {...this.state.fields, [ev.target.name]: ev.target.value}
    this.setState({fields: newFields})
  }

  handleSubmit = ev => {
    ev.preventDefault()
    console.log("Signed Up!")
  }

  render() {
    const {fields} = this.state;
    return (
      <Container>  
        <h3>New User Signup</h3>
  
        <Form onSubmit={this.handleSubmit}>
          <Form.Group>
            <Form.Label>User Email</Form.Label>
            <Form.Control type="email" name="email" placeholder="Email" value={fields.email} onChange={this.handleChange}/>
          </Form.Group>
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" name="password" placeholder="Password" value={fields.password} onChange={this.handleChange}/>
          </Form.Group>
          <Button type="submit">Sign up</Button>
        </Form>
      </Container>
    )

  }
}

export default Signup;