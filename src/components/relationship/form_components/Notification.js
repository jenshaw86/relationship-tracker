import React from 'react'
import {Form} from "react-bootstrap";

const Notification = props => {
  return (
    <Form.Group>
      <Form.Label>Yes, I'd like to receive reminders to connect</Form.Label>
      <Form.Check 
        type="checkbox" 
        name="notification"
        value="notification" 
        onChange={() => props.setCheckbox(!(props.checkbox))} />
    </Form.Group>
  )
}

export default Notification