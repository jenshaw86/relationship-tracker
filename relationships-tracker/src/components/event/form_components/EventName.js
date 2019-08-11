import React from 'react';
import {Form} from 'react-bootstrap'

// props: 
//  eventName, setEventName

const EventName = props => {
  return (
    <Form.Group>
      <Form.Label>Event Name</Form.Label>
      <Form.Control 
        type="text"
        placeholder="Enter event name"
        value={props.eventName}
        onChange={(ev) => props.setEventName(ev.target.value)}
      />
    </Form.Group>
  )
}

export default EventName;