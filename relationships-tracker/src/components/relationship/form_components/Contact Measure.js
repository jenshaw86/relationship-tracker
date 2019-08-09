import React from 'react'
import {Form} from "react-bootstrap";

const ContactMeasure = () => {
  return (
    <>
      <Form.Group>
        <Form.Control 
          as="select" 
          value={props.measure} 
          onChange={(ev) => props.setMeasure(ev.target.value)}            
          >
          <option>days</option>
          <option>weeks</option>
          <option>months</option>
        </Form.Control>
      </Form.Group>
    </>
  )
}

export default ContactMeasure;