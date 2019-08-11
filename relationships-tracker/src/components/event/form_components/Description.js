import React from 'react';
import {Form} from 'react-bootstrap'

const Description = props => {
  return (
    <Form.Group>
      <Form.Label>Description</Form.Label>
      <Form.Control 
        type="text"
        placeholder="Enter event description"
        value={props.description}
        onChange={(ev) => props.setDescription(ev.target.value)}
      />
    </Form.Group>
  )
}

export default Description;