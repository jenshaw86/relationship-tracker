import React from 'react';
import { Button } from 'react-bootstrap';
import { deleteEvent } from './../../services/eventsApi'

const DeleteEvent = props => {
  
  const handleOnClick = () => deleteEvent(props);

  return (
    <Button onClick={handleOnClick} className="delete-btn" size="sm">Cancel</Button>
  )

}

export default DeleteEvent;