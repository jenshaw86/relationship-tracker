import React from 'react'
import {Form, Col} from "react-bootstrap";

const FirstName = (props) => {
  return (
    <Form.Group as={Col}>          
      <Form.Label>First Name</Form.Label>
      <Form.Control 
        type="text" 
        placeholder="Enter first name" 
        value={props.firstName} 
        onChange={(ev) => props.setFirstName(ev.target.value)} />
    </Form.Group>
  )
}

export default FirstName