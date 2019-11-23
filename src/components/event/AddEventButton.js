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
    <>
      <Button className="alt-primary-btn .new-btn" variant="primary" size="sm" onClick={handleShow}>New Event</Button>
      <EventModal 
        show={show} 
        handleClose={handleClose} 
        handleNewEvent={props.handleNewEvent} 
        {...props}
      />
    </> 
  )
}

export default AddEvent;