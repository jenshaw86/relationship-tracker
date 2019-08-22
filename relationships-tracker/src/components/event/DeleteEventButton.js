import React from 'react';
import { Button } from 'react-bootstrap';

const DeleteEvent = props => {
  
  const handleDelete = () => {
    fetch(`http://localhost:3000/events/${props.event.id}`, {
        method: 'DELETE'
    })
    .then(res => res.json())
    .then(data => {
      console.log("deletion successful")
      props.updateEvents(data)
    })
  }

  return (
    <Button onClick={handleDelete} className="delete-btn">Cancel</Button>
  )

}

export default DeleteEvent;