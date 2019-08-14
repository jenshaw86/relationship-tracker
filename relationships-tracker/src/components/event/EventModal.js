import React from 'react'
import {Modal} from "react-bootstrap";
import EventForm from './EventForm'

// PROPS: setEvents()

const EventModal = props => {
  
  const formType = () => {
    if (props.handleNewEvent) {
      return "New Event"
    } else {
      return "Edit Event"
    }
  }

  return (
    <>
      <Modal show={props.show} onHide={() => props.handleClose()}>
        <Modal.Header closeButton>
          <Modal.Title>{formType()}</Modal.Title>
        </Modal.Header>
        
        <EventForm handleClose={props.handleClose} relationships={props.relationships} {...props} />
      </Modal>
    </>
  )
}

export default EventModal