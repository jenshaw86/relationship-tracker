import React from 'react'
import {Form} from "react-bootstrap";

const Phone = (props) => {
  return (
    <Form.Group>
      <Form.Label>Phone Number</Form.Label>
      <Form.Control 
        type="text" 
        placeholder="Enter phone number" 
        value={props.phone}
        onChange={(ev) => props.setPhone(ev.target.value)}
        />
        <Form.Text>
          Include country code. Example: +1
        </Form.Text>
    </Form.Group>
  )
}

export default Phone