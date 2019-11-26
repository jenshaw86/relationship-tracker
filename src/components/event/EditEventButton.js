import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import EventModal from './EventModal'


const EditEvent = props => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const relationship = props.relationship ? props.relationship : props.event.relationships[0]
  return (
    <>
    <Button className="edit-btn" size="sm" onClick={handleShow}>Edit</Button>
    <EventModal show={show} handleClose={handleClose} updateEvents={props.updateEvents} event={props.event} relationship={relationship} relationships={props.relationships} updateRelationships={props.updateRelationships} viewRelationship={props.viewRelationship}
     />
    </>
  )
}

export default EditEvent