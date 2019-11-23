import React from 'react'
import {Form} from "react-bootstrap";

const RelationshipType = (props) => {
  return (
    <Form.Group>
      <Form.Label>Relationship Type</Form.Label>
      <Form.Control 
        as="select" 
        value={props.relType} 
        onChange={(ev) => props.setRelType(ev.target.value)}            
        >
        <option>Friend</option>
        <option>Co-worker</option>
        <option>Classmate</option>
        <option>Family</option>
        <option>Significant Other</option>
        <option>Other</option>
      </Form.Control>
    </Form.Group>  
  )
}

export default RelationshipType