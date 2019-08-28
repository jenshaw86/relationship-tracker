import React from 'react'
import {Form} from "react-bootstrap";

const ContactFrequency = props => {
  
  const displayIntervals = () => {
    return [...Array(99).keys()].map(val => {
      let day = "day";
      if ((val + 1) !== 1){
        day = "days"
      } 
      
      return <option key={val + 1} value={val+1}>{val + 1} {day}</option>
    })
  }

  return (
    <>
      <Form.Group>
        <Form.Label>How often do you want to connect?</Form.Label>
        <Form.Control 
          as="select" 
          value={props.currentInterval}
          onChange={(ev) => {
            props.setCurrentInterval(ev.target.value)
          }}            
          >
          {displayIntervals()}
        </Form.Control>
      </Form.Group>
    </>
  )
}

export default ContactFrequency;