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
      <Button variant="info" onClick={handleShow}>Add New Event</Button>
      <EventModal show={show} handleClose={handleClose} handleNewEvent={props.handleNewEvent} setEvents={props.setEvents} relationships={props.relationships}/>
    </div> 
  )
}

export default AddEvent;