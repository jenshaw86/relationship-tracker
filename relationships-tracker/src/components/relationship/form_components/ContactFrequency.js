import React from 'react'
import {Form} from "react-bootstrap";

const ContactFrequency = props => {
  const displayIntervalOptions = () => {
    switch (props.measure) {
      case "days":
      case "weeks":
      case "months":
      default:
    }
  }

  return (
    <>
      <Form.Group>
        <Form.Control 
          as="select" 
          value={props.interval} 
          onChange={(ev) => props.setInterval(ev.target.value)}            
          >
          {}
        </Form.Control>
      </Form.Group>
    </>
  )
}

export default ContactFrequency;