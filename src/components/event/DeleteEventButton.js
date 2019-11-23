import React from 'react';
import { Button } from 'react-bootstrap';
import { api } from './../../services/api'

const DeleteEvent = props => {
  
  const handleOnClick = () => api.destroy.deleteEvent(props);

  return (
    <Button onClick={handleOnClick} className="delete-btn" size="sm">Cancel</Button>
  )

}

export default DeleteEvent;