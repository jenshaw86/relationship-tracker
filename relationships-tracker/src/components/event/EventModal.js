import React from 'react'
import {Modal} from "react-bootstrap";
import NewEventForm from './NewEventForm'

const EventModal = props => {
  
  const formType = () => {
    if (props.handleNewEvent) {
      return "New Event"
    } else if (props.handleEditEvent) {
      return "Edit Event"
    }
  }

  return (
    <>
      <Modal show={props.show} onHide={() => props.handleClose()}>
        <Modal.Header closeButton>
          <Modal.Title>{formType()}</Modal.Title>
        </Modal.Header>
        
        <NewEventForm handleClose={props.handleClose} handleNewEvent={props.handleNewEvent} />
      </Modal>
    </>
  )
}

export default EventModal