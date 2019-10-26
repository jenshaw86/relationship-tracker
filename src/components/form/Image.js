import React from 'react'
import {Form} from "react-bootstrap";

const Image = (props) => {
  return (
    <Form.Group>          
      <Form.Label>Image Url</Form.Label>
      <Form.Control 
        type="text" 
        placeholder="Enter image url" 
        value={props.image} 
        onChange={(ev) => props.setImage(ev.target.value)} />
    </Form.Group>
  )
}

export default Image