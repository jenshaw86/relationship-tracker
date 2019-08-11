import React from 'react'
import {Modal} from "react-bootstrap";
import NewEventForm from './NewEventForm'

const EventModal = props => {
  
  return (
    <>
      <Modal show={props.show} onHide={() => props.handleClose()}>
        <Modal.Header closeButton>
          <Modal.Title>New Event</Modal.Title>
        </Modal.Header>
        
        <NewEventForm handleClose={props.handleClose} />
      </Modal>
    </>
  )
}

export default EventModal