import React from 'react';
import {Modal, Button} from "react-bootstrap";
import EventForm from './EventForm';

const EventModal = props => {
  
  const formType = () => props.handleNewEvent ? "New Event" : "Edit Event"

  if (props.relationships.length > 0) {
    return (
      <>
        <Modal show={props.show} onHide={() => props.handleClose()}>
          <Modal.Header closeButton>
            <Modal.Title>{formType()}</Modal.Title>
          </Modal.Header>
          
          <EventForm 
            handleClose={props.handleClose} 
            {...props} 
            />
        </Modal>
      </>
    )
  } else {
    return (
      <>
        <Modal show={props.show} onHide={() => props.handleClose()}>
          <Modal.Body>
            <p>You'll need connections first before you can plan any events!</p>
          </Modal.Body>
            <Button variant="secondary" onClick={() => props.handleClose()}>
              Close
            </Button>
        </Modal>
      </>
    )
  }
}

export default EventModal