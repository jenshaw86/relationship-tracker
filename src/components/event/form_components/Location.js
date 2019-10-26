import React from 'react'
import {Form} from 'react-bootstrap'

const Location = props => {
  return(
    <Form.Group>
      <Form.Label>Location</Form.Label>
      <Form.Control 
        type="text"
        placeholder="Enter event location"
        value={props.location}
        onChange={ev => props.setLocation(ev.target.value)} />
    </Form.Group>
  )
}

export default Location;