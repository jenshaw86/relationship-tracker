import React from 'react'
import {Form, Col} from "react-bootstrap";

const LastName = (props) => {
  return (
    <Form.Group as={Col}>
      <Form.Label>Last Name</Form.Label>
      <Form.Control 
        type="text" 
        placeholder="Enter last name" 
        value={props.lastName} 
        onChange={(ev) => props.setLastName(ev.target.value)} />            
    </Form.Group>
  )
}

export default LastName