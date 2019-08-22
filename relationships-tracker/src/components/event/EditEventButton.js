import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import EventModal from './EventModal'


const EditEvent = props => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
    <Button className="edit-btn" onClick={handleShow}>Edit</Button>
    <EventModal show={show} handleClose={handleClose} updateEvents={props.updateEvents} event={props.event} relationships={props.relationships} updateRelationships={props.updateRelationships} viewRelationship={props.viewRelationship}
     />
    </>
  )
}

export default EditEvent