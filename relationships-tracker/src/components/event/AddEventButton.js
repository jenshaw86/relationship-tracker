import React, {useState} from 'react';
import { Button } from 'react-bootstrap';
import EventModal from './EventModal'

const AddEvent = props => {
    // New Event Modal State
    const [show, setShow] = useState(false);
    // New Event Modal Handlers
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
  return (
    <div>
      <Button variant="info" onClick={handleShow}>New Event</Button>
      <EventModal show={show} handleClose={handleClose} handleNewEvent={props.handleNewEvent} {...props}
      // relationships={props.relationships} relationship={props.relationship}
      />
    </div> 
  )
}

export default AddEvent;