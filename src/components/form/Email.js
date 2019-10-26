import React from 'react'
import {Form} from "react-bootstrap";

const Email = (props) => {
  return (
    <Form.Group>
      <Form.Label>Email</Form.Label>
      <Form.Control 
        type="email" 
        placeholder="Enter email" 
        value={props.email} 
        onChange={(ev) => props.setEmail(ev.target.value)}
        />
    </Form.Group>
  )
}

export default Email